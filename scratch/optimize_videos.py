import subprocess, imageio_ffmpeg, os, time

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

tasks = [
    ('assets/work_birthday.mp4', 'assets/work_birthday_opt.mp4', 'scale=-2:1920', '22'),
    ('assets/work_charity.mp4', 'assets/work_charity_opt.mp4', 'scale=-2:1920', '23'),
    ('assets/work_gym.mp4', 'assets/work_gym_opt.mp4', 'scale=-2:1920', '23')
]

for src, dst, scale, crf in tasks:
    print(f"Optimizing {src} (original: {os.path.getsize(src)/(1024*1024):.1f} MB)...")
    t0 = time.time()
    cmd = [
        ffmpeg, '-y', '-i', src,
        '-vf', scale,
        '-c:v', 'libx264', '-crf', crf, '-preset', 'veryfast',
        '-c:a', 'aac', '-b:a', '160k',
        '-movflags', '+faststart',
        dst
    ]
    subprocess.run(cmd, check=True)
    new_mb = os.path.getsize(dst) / (1024*1024)
    print(f"Finished {dst} in {time.time() - t0:.1f}s. New size: {new_mb:.1f} MB")
    # Replace original with optimized
    os.replace(dst, src)
    print(f"Replaced {src} with {new_mb:.1f} MB version!\n")

print("ALL VIDEOS OPTIMIZED FOR GITHUB & WEB STREAMING!")
