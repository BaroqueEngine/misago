---
title: "値の交換"
weight: 390
num: 508
hash: "dc6d3cff"
tags: ["math"]
---

## コード例

### C++

```cpp
int a = 3, b = 99;
swap(a, b);
cout << a << " " << b << endl;  // 99 3

vector<int> v = {111, 222, 333};
swap(v[0], v[2]);

for (auto x : v) {
  cout << x << endl;  // 333 222 111
}
```

### TypeScript

```typescript
let a = 3;
let b = 99;
[a, b] = [b, a];
console.log(a, b); // 99 3

const v = [111, 222, 333];
[v[0], v[2]] = [v[2], v[0]];
console.log(v); // [333, 222, 111]
```
