---
title: "重複しない2つのインデックスを順番に取り出す"
weight: 100
num: 4
hash: "6ceccf9a"
tags: ["array"]
---

## 書き方例 1

```typescript
const n = 10;

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    console.log(i, j);
  }
}
```

i < j が常に成り立つ。

ループ回数は、初項が 1 、末項が n - 1 の[等差数列の和](/1491a012)で、 $\frac{n (n - 1)}{2} $ 回。

## 書き方例 2

```typescript
const n = 10;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (i >= j) continue;
    console.log(i, j);
  }
}
```

`continue` で弾いたあとは、 i < j が常に成り立つ。

ループ回数は、 $n^2$ 回。

## 書き方例 3

```typescript
for (const a of v) {
  for (const b of v) {
    if (a === b) continue;
    console.log(a, b);
  }
}
```

要素を直接取り出して、 a と b が同じなら`continue` で弾く例。

ただし、 (a, b) のあとに (b, a) がでてくるような[順列](/be4f0af7)形式となる。

ループ回数は、 n が v のサイズだとすると $n^2$ 回。
