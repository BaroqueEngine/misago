---
title: "穴掘り法"
weight: 40
num: 124
hash: "e6b3ccd5"
tags: ["map"]
---

## 実行例

![](./static/images/e6b3ccd5/0.png)
[実行結果を見る](./static/play/e6b3ccd5/index.html)

## ソースコード

### TypeScript

[app.ts](./static/code/e6b3ccd5/app.ts)

## 解説/アルゴリズム

![](./static/images/e6b3ccd5/1.png)
サイズが奇数 × 奇数の二次元配列を用意します。  
配列をすべて壁で埋めます。

![](./static/images/e6b3ccd5/2.png)
ランダムな偶数位置の XY 座標を選び、そこを通路にします。

![](./static/images/e6b3ccd5/3.png)
上下左右いずれかの方向の 2 マス先が壁ならそこまで通路して掘り進めます。

![](./static/images/e6b3ccd5/4.png)
掘り進めた先で同じように上記処理をさせ、この処理ができなくなるまで繰り返します。

![](./static/images/e6b3ccd5/5.png)
2 マス前の位置まで戻り、別の方向の 2 マス先が掘れるなら、その方向を掘り進めます。

![](./static/images/e6b3ccd5/6.png)
上記処理を繰り返すことで迷路が完成します。
