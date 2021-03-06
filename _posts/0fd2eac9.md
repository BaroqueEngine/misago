---
title: "床関数"
weight: 320
num: 288
hash: "0fd2eac9"
tags: ["math"]
---

## 概要

実数 x を渡すと、その数以下の最大の整数を返す関数を`床関数`と呼ぶ。

数直線でいうと、実数 x の左側にある一番近い整数値となる。

値を切り捨てるので、`切り捨て関数`とも呼ばれる。

## コード例

```typescript
Math.floor(3.2); // 3
Math.floor(3); // 3
Math.floor(-3); // -3
Math.floor(-3.2); // -4
```

正の数に適用すると整数部分の値がそのまま返る。

負の数に適用する場合、整数ならそのまま整数が、小数点以下の値が付いている場合は一つ小さい整数の値が返る。

## 関連記事

- [天井関数](/286b997e)
- [ROUND 関数](/6425003d)
