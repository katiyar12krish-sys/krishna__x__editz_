import json

with open(r'C:\Users\Acer\.gemini\antigravity-ide\brain\48c0cc4c-fb95-4575-b76a-64a898342b10\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i in [789, 793, 794, 795, 820]:
            try:
                obj = json.loads(line)
                print(f"=== STEP {i} ({obj.get('type')}) ===")
                print(obj.get('content'))
            except:
                pass
