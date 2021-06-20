import sys, glob, re

if len(sys.argv) != 3:
  exit()

tag = sys.argv[1]
k = int(sys.argv[2])

data = list()

files = glob.glob("../_posts/*.md")
for file_name in files:
  with open(file_name, "r", encoding="UTF-8") as f:
    text = f.read()
    result = re.search("tags: \[\"" + tag + "\"\]", text)
    if result is None:
      continue
    result = re.search("weight: (\d+)", text)
    if result is None:
      continue
    weight = int(result.group(1))
    data.append({ "weight": weight, "file_name": file_name, "text": text })

data = sorted(data, key=lambda x:x["weight"])
for i in range(len(data)):
  item = data[i]
  new_weight = i * k
  new_text = re.sub("weight: " + str(item["weight"]), "weight: " + str(new_weight), item["text"])
  with open(item["file_name"], "w", encoding="UTF-8") as f:
    f.write(new_text)
