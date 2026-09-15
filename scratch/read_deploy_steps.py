import json, sys

with open(r'C:\Users\Acer\.gemini\antigravity-ide\brain\48c0cc4c-fb95-4575-b76a-64a898342b10\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if 788 <= i <= 790:
            obj = json.loads(line)
            if obj.get('source') == 'MODEL' and obj.get('type') == 'PLANNER_RESPONSE':
                text = obj.get('content', '')
                if text:
                    sys.stdout.buffer.write(f"=== STEP {i} ===\n".encode('utf-8'))
                    sys.stdout.buffer.write(text.encode('utf-8'))
                    sys.stdout.buffer.write(b"\n")
