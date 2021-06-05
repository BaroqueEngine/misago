---
title: "経路数"
weight: 60
num: 513
hash: "a9ffab32"
tags: ["map"]
---

## コード例

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;

vector<vector<ll>> comb;
void init_nCk(int n) {
  n++;
  comb.resize(n, vector<ll>(n, 0));
  comb[0][0] = 1;
  for (int i = 1; i < n; i++) {
    comb[i][0] = 1;
    comb[i][i] = 1;
    for (int j = 1; j < n - 1; j++) {
      comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]);
    }
  }
}
ll nCk(int n, int k) { return comb[n][k]; }

int main() {
  int h = 10;
  int w = 5;

  init_nCk(h + w);

  // 715
  cout << nCk(h + w - 2, h - 1) << endl;
  cout << nCk(h + w - 2, w - 1) << endl;
}
```

縦 h 横 w の 2D マップで、左上から右下まで到達するのに、右か下にしか移動できない場合の経路組み合わせ数です。

縦に移動できる回数が h - 1、横に移動できる回数が w - 1 なので、総移動回数は h + w - 2。  
その中から横か縦の移動する回数の組み合わせを求めると、$ _{h + w - 2} C _{h - 1} $ あるいは $ _{h + w - 2} C _{w - 1} $ になります。
