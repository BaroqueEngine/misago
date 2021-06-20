---
title: "数値同士がほぼ同じ値か調べる"
weight: 80
num: 126
hash: "5da8e1ef"
tags: ["math"]
---

## 概要

`==`や`===`のような比較演算子を使用して、2 つの数値が同じ値かどうかを調べる際、同じ値だと思っていても、誤差によって true が返らない場合があります。  
このようなケースに対応するため、多少ずれている場合でも、同じ値だと見なす関数を作ります。

## コード例

```typescript
function approxEq(a: number, b: number, e: number): boolean {
  return Math.abs(a - b) < e;
}
```

```typescript
// false
console.log(0.1 + 0.1 + 0.1 === 0.3);
// true
console.log(approxEq(0.1 + 0.1 + 0.1, 0.3, 0.001));
```

a と b が比較する 2 つの値で、その[差の絶対値](/b98d6da4)が e 未満なら、同じ値だと見なして true を返します。

## 内部で利用しているアルゴリズム

[2 点間の直線距離](/b98d6da4)
