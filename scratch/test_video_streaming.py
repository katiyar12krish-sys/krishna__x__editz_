import urllib.request

urls = [
    'http://localhost:3000/assets/work_company.mp4',
    'http://localhost:3000/assets/work_birthday.mp4',
    'http://localhost:3000/assets/work_gym.mp4',
    'http://localhost:3000/assets/work_charity.mp4'
]
for u in urls:
    req = urllib.request.Request(u)
    req.add_header('Range', 'bytes=0-1024')
    try:
        with urllib.request.urlopen(req) as resp:
            fname = u.split('/')[-1]
            print(f"{fname}: status={resp.status}, Content-Range={resp.headers.get('Content-Range')}, Type={resp.headers.get('Content-Type')}")
    except Exception as e:
        print(f"Error {u}: {e}")
