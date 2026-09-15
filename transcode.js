const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

if (!ffmpegPath) {
  console.error('❌ Error: ffmpeg-static binary not found. Run: npm install ffmpeg-static --save-dev');
  process.exit(1);
}

const ASSETS_DIR = path.join(__dirname, 'assets');
const STREAMS_DIR = path.join(ASSETS_DIR, 'streams');

// Ensure output directories exist
if (!fs.existsSync(STREAMS_DIR)) {
  fs.mkdirSync(STREAMS_DIR, { recursive: true });
}

// Helper to run ffmpeg command as a Promise
function runFfmpeg(args, desc = 'Encoding') {
  return new Promise((resolve, reject) => {
    console.log(`\n⏳ [FFmpeg] ${desc}...`);
    const proc = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });

    let stderr = '';
    proc.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
      // Print progress line
      const lines = chunk.toString().split('\r');
      for (const line of lines) {
        if (line.includes('fps=') || line.includes('time=')) {
          process.stdout.write(`\r   ⚡ ${line.trim().substring(0, 80)}`);
        }
      }
    });

    proc.on('close', (code) => {
      process.stdout.write('\n');
      if (code === 0) {
        resolve();
      } else {
        console.error(`❌ FFmpeg failed with exit code ${code}`);
        reject(new Error(`FFmpeg exited with ${code}: ${stderr.slice(-500)}`));
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Transcode single video into HLS streams (1080p, 720p, master.m3u8) + web-optimized 1080p MP4
 */
async function transcodeVideo(inputPath) {
  const filename = path.basename(inputPath);
  const videoId = path.parse(filename).name;
  const outDir = path.join(STREAMS_DIR, videoId);

  const masterPath = path.join(outDir, 'master.m3u8');
  if (fs.existsSync(masterPath)) {
    console.log(`\n⏭️  Skipping ${filename} - master.m3u8 already exists.`);
    return;
  }

  console.log(`\n======================================================`);
  console.log(`🎬 Processing: ${filename} (ID: ${videoId})`);
  console.log(`📁 Destination: ${outDir}`);
  console.log(`======================================================`);

  const p1080Dir = path.join(outDir, '1080p');
  const p720Dir = path.join(outDir, '720p');
  const p4kDir = path.join(outDir, '4k');

  fs.mkdirSync(p1080Dir, { recursive: true });
  fs.mkdirSync(p720Dir, { recursive: true });
  fs.mkdirSync(p4kDir, { recursive: true });

  // 1. Generate 1080p HLS stream (Max 1920 width / 1080 height, preserving aspect ratio, H.264 Baseline/High yuv420p)
  const args1080 = [
    '-y',
    '-i', inputPath,
    '-vf', 'scale=w=\'min(1920,iw)\':h=\'min(1080,ih)\':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2',
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-level', '4.1',
    '-pix_fmt', 'yuv420p',
    '-preset', 'veryfast',
    '-crf', '22',
    '-maxrate', '5000k',
    '-bufsize', '10000k',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ac', '2',
    '-ar', '44100',
    '-f', 'hls',
    '-hls_time', '4',
    '-hls_playlist_type', 'vod',
    '-hls_segment_filename', path.join(p1080Dir, 'segment_%03d.ts'),
    path.join(p1080Dir, 'index.m3u8')
  ];

  // 2. Generate 720p HLS stream (Max 1280 width / 720 height, preserving aspect ratio)
  const args720 = [
    '-y',
    '-i', inputPath,
    '-vf', 'scale=w=\'min(1280,iw)\':h=\'min(720,ih)\':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2',
    '-c:v', 'libx264',
    '-profile:v', 'main',
    '-level', '3.1',
    '-pix_fmt', 'yuv420p',
    '-preset', 'veryfast',
    '-crf', '24',
    '-maxrate', '2500k',
    '-bufsize', '5000k',
    '-c:a', 'aac',
    '-b:a', '96k',
    '-ac', '2',
    '-ar', '44100',
    '-f', 'hls',
    '-hls_time', '4',
    '-hls_playlist_type', 'vod',
    '-hls_segment_filename', path.join(p720Dir, 'segment_%03d.ts'),
    path.join(p720Dir, 'index.m3u8')
  ];

  // 3. Generate 4K HLS stream (Pass-through or re-encode to high profile 4K HLS if original is high res)
  const args4k = [
    '-y',
    '-i', inputPath,
    '-vf', 'scale=w=\'min(3840,iw)\':h=\'min(2160,ih)\':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2',
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-level', '5.1',
    '-pix_fmt', 'yuv420p',
    '-preset', 'veryfast',
    '-crf', '20',
    '-maxrate', '12000k',
    '-bufsize', '24000k',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-ac', '2',
    '-ar', '44100',
    '-f', 'hls',
    '-hls_time', '4',
    '-hls_playlist_type', 'vod',
    '-hls_segment_filename', path.join(p4kDir, 'segment_%03d.ts'),
    path.join(p4kDir, 'index.m3u8')
  ];

  // Run encodings
  await runFfmpeg(args1080, `Creating 1080p (Full HD) universal stream for ${filename}`);
  await runFfmpeg(args720, `Creating 720p (HD) budget/mobile stream for ${filename}`);
  await runFfmpeg(args4k, `Creating 4K (2160p) master stream for ${filename}`);

  // 4. Create Master Playlist (master.m3u8) connecting all resolutions (YouTube style)
  const masterContent = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-STREAM-INF:BANDWIDTH=14000000,RESOLUTION=3840x2160,NAME="4K (2160p)"
4k/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=5500000,RESOLUTION=1920x1080,NAME="1080p (Full HD)"
1080p/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2600000,RESOLUTION=1280x720,NAME="720p (HD)"
720p/index.m3u8
`;
  fs.writeFileSync(masterPath, masterContent, 'utf8');

  // 5. Also generate a universal web-optimized 1080p standalone MP4 in assets/ for direct fallback
  const fallbackMp4Path = path.join(ASSETS_DIR, `${videoId}_1080p.mp4`);
  if (!fs.existsSync(fallbackMp4Path)) {
    console.log(`\n⏳ [Fallback] Creating standalone web-optimized 1080p MP4: ${videoId}_1080p.mp4...`);
    const argsFallback = [
      '-y',
      '-i', inputPath,
      '-vf', 'scale=w=\'min(1920,iw)\':h=\'min(1080,ih)\':force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2',
      '-c:v', 'libx264',
      '-profile:v', 'main',
      '-level', '4.0',
      '-pix_fmt', 'yuv420p',
      '-preset', 'veryfast',
      '-crf', '23',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      fallbackMp4Path
    ];
    await runFfmpeg(argsFallback, `Generating universal fallback MP4`);
  }

  console.log(`\n✅ Finished transcoding ${filename}!`);
  console.log(`   🔗 Master HLS Stream: assets/streams/${videoId}/master.m3u8`);
  console.log(`   🔗 Direct 1080p Fallback: assets/${videoId}_1080p.mp4`);
}

async function main() {
  const args = process.argv.slice(2);
  const targetFile = args[0];

  if (targetFile && targetFile !== '--all') {
    const fullPath = path.isAbsolute(targetFile) ? targetFile : path.join(process.cwd(), targetFile);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`);
      process.exit(1);
    }
    await transcodeVideo(fullPath);
  } else {
    // Process all work_*.mp4 videos in assets
    const files = fs.readdirSync(ASSETS_DIR).filter(f => f.startsWith('work_') && f.endsWith('.mp4') && !f.includes('_1080p'));
    console.log(`Found ${files.length} project videos to transcode:`);
    files.forEach(f => console.log(` - ${f}`));

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      console.log(`\n[${i + 1}/${files.length}] Starting ${f}...`);
      await transcodeVideo(path.join(ASSETS_DIR, f));
    }
  }

  console.log('\n🎉 ALL TRANSCODING COMPLETED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('\n❌ Fatal error in transcoding:', err);
  process.exit(1);
});
