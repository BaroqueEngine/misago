---
title: "追求行動"
weight: 20
num: 248
hash: "f720babe"
tags: ["steering"]
---

## 実行例

![](./static/images/f720babe/0.png)
[実行結果を見る](./static/play/f720babe/index.html)

## ソースコード

### TypeScript

[vehicle.ts](./static/code/f720babe/vehicle.ts) / [app.ts](./static/code/f720babe/app.ts)

## 解説/アルゴリズム

```typescript
export function seek(v: Vehicle, target: p5.Vector): void {
  const desiredVelocity = p5.Vector.sub(target, v.position);
  desiredVelocity.limit(v.maxSpeed);
  const force = p5.Vector.sub(desiredVelocity, v.velocity);
  v.acceleration.add(force);
}
```

この追求行動(seek)では、引数に渡した位置に向けて、現在位置から 1 フレームで移動できるだけ移動しようという行動となる。

```typescript
desiredVelocity.limit(v.maxSpeed);
```

現在位置(position)から目標位置(target)までのベクトルを求める。

```typescript
desiredVelocity.limit(v.maxSpeed);
```

1 フレームで移動できる距離を求めるため、maxSpeed でベクトルの制限を行う。

```typescript
const force = p5.Vector.sub(desiredVelocity, v.velocity);
v.acceleration.add(force);
```

上で求めた速度と今現在の速度の差分を求め、加速度に加える。
