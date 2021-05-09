---
title: "配列の回転"
weight: 50
num: 20
hash: "bf2fbce8"
tags: ["array"]
---

## 概要

```text
[1, 2, 3, 4, 5, 6, 7, 8, 9]

1 2 3    7 4 1
4 5 6 => 8 5 2
7 8 9    9 6 3

[7, 4, 1, 8, 5, 2, 9, 6, 3]
```

一次元配列を二次元の形とみなして回転をさせ、値を入れ替えた新たな一次元配列を返します。

## コード例

### 右回転

```typescript
function rotateRight<T>(a: T[], size: number): T[] {
  const d: T[] = [];
  for (let i = 0; i < size * size; i++) {
    const x = i % size;
    const y = Math.floor(i / size);
    const tx = size - 1 - y;
    const ty = x;
    const di = ty * size + tx;
    d[di] = a[i];
  }
  return d;
}

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const b = rotateRight(a, 3);
console.log(b);

// (y, x) => (y, x)
// (0, 0) => (0, 2)
// (0, 1) => (1, 2)
// (0, 2) => (2, 2)
// (1, 0) => (0, 1)
// (1, 1) => (1, 1)
// (1, 2) => (2, 1)
// (2, 0) => (0, 0)
// (2, 1) => (1, 0)
// (2, 2) => (2, 0)

/*
1 2 3    7 4 1
4 5 6 => 8 5 2
7 8 9    9 6 3
*/
```

### 左回転

```typescript
function rotateLeft<T>(a: T[], size: number): T[] {
  const d: T[] = [];
  for (let i = 0; i < size * size; i++) {
    const x = i % size;
    const y = Math.floor(i / size);
    const tx = y;
    const ty = size - 1 - x;
    const di = ty * size + tx;
    d[di] = a[i];
  }
  return d;
}

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const b = rotateLeft(a, 3);
console.log(b);

// (y, x) => (y, x)
// (0, 0) => (2, 0)
// (0, 1) => (1, 0)
// (0, 2) => (0, 0)
// (1, 0) => (2, 1)
// (1, 1) => (1, 1)
// (1, 2) => (0, 1)
// (2, 0) => (2, 2)
// (2, 1) => (1, 2)
// (2, 2) => (0, 2)

/*
1 2 3    3 6 9
4 5 6 => 2 5 8
7 8 9    1 4 7
*/
```

## ソースコード

[app.ts](./static/code/bf2fbce8/app.ts)

## 内部で利用しているアルゴリズム

[床関数](/0fd2eac9/)
