import json

with open(r'C:\Users\Acer\.gemini\antigravity-ide\brain\48c0cc4c-fb95-4575-b76a-64a898342b10\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        try:
            obj = json.loads(line)
            if obj.get('type') == 'USER_INPUT':
                content = str(obj.get('content', ''))
                print(f"[{i}] User: {content[:200]}")
        except:
            pass
