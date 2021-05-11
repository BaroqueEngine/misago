---
title: "逃避行動"
weight: 30
num: 249
hash: "ad3dfe3d"
tags: ["steering"]
---

## 実行例

![](./static/images/ad3dfe3d/0.png)
[実行結果を見る](./static/play/ad3dfe3d/0/index.html)

![](./static/images/ad3dfe3d/1.png)
[実行結果を見る](./static/play/ad3dfe3d/1/index.html)

## ソースコード

### 基本

#### TypeScript

[vehicle.ts](./static/code/ad3dfe3d/0/vehicle.ts) / [app.ts](./static/code/ad3dfe3d/0/app.ts)

### 100 匹 ver

#### TypeScript

[vehicle.ts](./static/code/ad3dfe3d/1/vehicle.ts) / [app.ts](./static/code/ad3dfe3d/1/app.ts)

## 解説/アルゴリズム

```typescript
export function flee(v: Vehicle, target: p5.Vector) {
  const desiredVelocity = p5.Vector.sub(target, v.position);
  desiredVelocity.limit(v.maxSpeed);
  const force = p5.Vector.sub(desiredVelocity, v.velocity);
  v.acceleration.sub(force);
}
```

逃避行動(flee)は、引数で渡した位置からなるべく離れようとする行動です。
