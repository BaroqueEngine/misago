---
title: "SVGパス"
weight: 20
num: 345
hash: "aadacec3"
tags: ["svg"]
---

## 二次ベジェ曲線

<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="0" y1="300" x2="250" y2="0" stroke="#777" stroke-width="1" />
  <line x1="250" y1="0" x2="500" y2="300" stroke="#777" stroke-width="1" />
  <path d="M0 300 Q 250 0 500 300" fill="none" stroke="#1c8b94" stroke-width="5" />
</svg>

```svg
<!-- 補助線 -->
<line x1="0" y1="300" x2="250" y2="0" stroke="#777" stroke-width="1" />
<line x1="250" y1="0" x2="500" y2="300" stroke="#777" stroke-width="1" />

<!-- 二次ベジェ曲線 -->
<path d="M0 300 Q 250 0 500 300" fill="none" stroke="#1c8b94" stroke-width="5" />
```

`M(oveTo)`で始点に移動し、`Q(uadraticCurveTo) 制御点x 制御点y 終点x 終点y`で[二次ベジェ曲線](/946c9cf0)を描きます。

## 三次ベジェ曲線

<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="0" y1="300" x2="200" y2="10" stroke="#777" stroke-width="1" />
  <line x1="200" y1="10" x2="400" y2="10" stroke="#777" stroke-width="1" />
  <line x1="400" y1="10" x2="600" y2="300" stroke="#777" stroke-width="1" />
  <path d="M0 300 C200 10 400 10 600 300" fill="none" stroke="#1c8b94" stroke-width="5" />
</svg>

```svg
<!-- 補助線 -->
<line x1="0" y1="300" x2="200" y2="10" stroke="#777" stroke-width="1" />
<line x1="200" y1="10" x2="400" y2="10" stroke="#777" stroke-width="1" />
<line x1="400" y1="10" x2="600" y2="300" stroke="#777" stroke-width="1" />

<!-- 三次ベジェ曲線 -->
<path d="M0 300 C200 10 400 10 600 300" fill="none" stroke="#1c8b94" stroke-width="5" />
```

`M(oveTo)`で始点に移動し、`C(urveTo) 制御点1x 制御点1y 制御点2x 制御点2y 終点x 終点y`で[三次ベジェ曲線](/946c9cf0)を描きます。
