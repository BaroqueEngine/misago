import glob, re, subprocess, sys

if len(sys.argv) != 2:
  exit()

def get_nums():
  data = list()
  files = glob.glob("../_posts/*.md")
  for file_name in files:
    with open(file_name, "r", encoding="UTF-8") as f:
      text = f.read()
      result = re.search(r"num: (\d+)", text)
      if result is None:
        continue
      data.append(int(result.group(1)))
  data = sorted(data)
  return data

def get_num():
  nums = get_nums()
  n = len(nums)
  for i in range(n):
    if i != nums[i]:
      return i
  return n

def get_hash(salt, n):
  return subprocess.check_output("python slug.py %s %s" % (salt, str(n)))

salt = sys.argv[1]
n = get_num()
hash = get_hash(salt, n).decode().rstrip("\r\n")

text = '''---
title: ""
weight: 999
num: {n}
hash: "{hash}"
tags: [""]
---
'''.format(n=n, hash=hash)

with open("../_posts/%s.md" % (hash), "w", encoding="UTF-8") as f:
  f.write(text)