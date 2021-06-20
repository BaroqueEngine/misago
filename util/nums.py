import glob, re

data = list()
files = glob.glob("../_posts/*.md")
for file_name in files:
  with open(file_name, "r", encoding="UTF-8") as f:
    text = f.read()
    result = re.search(r"num: (\d+)", text)
    if result is None:
      continue
    data.append(int(result.group(1)))

print(sorted(data))
