with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

checks = [
    'assets/work_company.mp4',
    'assets/work_birthday.mp4',
    'assets/work_gym.mp4',
    'assets/work_charity.mp4',
    'Apex Corporate Brand Showcase',
    'Neon Vibe — Cinematic Birthday Celebration',
    'Relentless Beast — Gym Motivation Edit',
    'Compassion in Motion — Feeding the Needy & Rescuing Stray Lives',
    'handleSingleVideoPlayback',
    'id="works-section"',
    'id="sec-projects"'
]

all_passed = True
for c in checks:
    found = c in html
    print(f'Checking [{c}]: {"FOUND" if found else "NOT FOUND"}')
    if not found:
        all_passed = False

print("\nResult:", "ALL CHECKS PASSED!" if all_passed else "FAILED")
