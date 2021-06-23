---
title: "ソート済み配列の探索"
weight: 90
num: 517
hash: "5ff22aed"
tags: ["array"]
---

## 一致

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
  vector<int> v = {2, 2, 5, 5, 9};
  cout << binary_search(v.begin(), v.end(), 1) << endl;  // 0
  cout << binary_search(v.begin(), v.end(), 2) << endl;  // 1
  cout << binary_search(v.begin(), v.end(), 3) << endl;  // 0
  cout << binary_search(v.begin(), v.end(), 4) << endl;  // 0
  cout << binary_search(v.begin(), v.end(), 5) << endl;  // 1
}
```

昇順でソート済みの配列に対して二分探索を行い、検索する値が存在するかを確かめる。

## 未満～以上の間

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
  vector<int> v = {2, 2, 5, 5, 9};
  cout << lower_bound(v.begin(), v.end(), 1) - v.begin() << endl;  // 0
  cout << lower_bound(v.begin(), v.end(), 2) - v.begin() << endl;  // 0
  cout << lower_bound(v.begin(), v.end(), 3) - v.begin() << endl;  // 2
  cout << lower_bound(v.begin(), v.end(), 4) - v.begin() << endl;  // 2
  cout << lower_bound(v.begin(), v.end(), 5) - v.begin() << endl;  // 2
  cout << lower_bound(v.begin(), v.end(), 6) - v.begin() << endl;  // 4
}
```

```text
# 1
| 2 2 5 5 9

# 2
| 2 2 5 5 9

# 3
2 2 | 5 5 9

# 4
2 2 | 5 5 9

# 5
2 2 | 5 5 9

# 6
2 2 5 5 | 9
```

昇順でソート済みの配列に対して二分探索を行い、検索する値未満の数が左側に、以上の数が右側にくる位置をイテレータとして返す。

## 以下～より大きいの間

```cpp
#include <bits/stdc++.h>

using namespace std;

int main() {
  vector<int> v = {2, 2, 5, 5, 9};
  cout << upper_bound(v.begin(), v.end(), 1) - v.begin() << endl;  // 0
  cout << upper_bound(v.begin(), v.end(), 2) - v.begin() << endl;  // 2
  cout << upper_bound(v.begin(), v.end(), 3) - v.begin() << endl;  // 2
  cout << upper_bound(v.begin(), v.end(), 4) - v.begin() << endl;  // 2
  cout << upper_bound(v.begin(), v.end(), 5) - v.begin() << endl;  // 4
  cout << upper_bound(v.begin(), v.end(), 6) - v.begin() << endl;  // 4
}
```

```text
# 1
| 2 2 5 5 9

# 2
2 2 | 5 5 9

# 3
2 2 | 5 5 9

# 4
2 2 | 5 5 9

# 5
2 2 5 5 | 9

# 6
2 2 5 5 | 9
```

昇順でソート済みの配列に対して二分探索を行い、検索する値以下の数が左側に、より大きい数が右側にくる位置をイテレータとして返す。
