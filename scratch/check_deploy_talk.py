import json

with open(r'C:\Users\Acer\.gemini\antigravity\brain\cc4d80f8-2262-45b7-8b19-c83c83812f84\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if 628 <= i <= 645:
            try:
                obj = json.loads(line)
                c = obj.get('content', '')
                if c:
                    print(f"[{i}] {obj.get('source')}: {c[:140]}")
            except:
                pass
