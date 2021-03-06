---
title: "速さと速度"
weight: 10
num: 181
hash: "da0dbd56"
tags: ["physics"]
---

## 解説/アルゴリズム

### 速さ

`[速さ] = [移動距離] ÷ [経過時間]`

`速さ`は移動距離を経過時間で割ることで算出できる。

- 100m を 10 秒で走ったときの速さは `100m / 10秒 = 10m/秒`
- 30km を 2 時間で走ったときの速さは `30km / 2時間 = 15km/時間`

つまり単位時間あたりに移動する平均の距離のことを速さと呼ぶ。

これはアニメーションでも同様で、例えばオブジェクトを動かすコードで考えてみる。

```typescript
function update(): void {
  object.x += ???; // 5秒間で100px動かすにはどういう値を入れればいいのか？
}
```

オブジェクトが 5 秒間で 100px 動くにはどういう速さを設定すればいいのか？

移動距離を経過時間で割ることで速さが求まるので、 `100px / 5秒 = 20px/秒`。

つまり、1 秒に 20px 動かせば、5 秒で 100px 動く、という計算になる。

次は実際に 5 秒で 100px 動かすコードをどう書くのかを考えてみる。

60FPS で動作する環境の場合、1 秒間に約 60 回、更新用の関数が呼ばれる。

今は 5 秒間の範囲で考えているので `5 * 60 = 300`。つまり 5 秒間で更新の関数が呼ばれる回数は約 300 回となる。

更新の関数が 1 回呼ばれることを 1 フレームと言い直すと、300 フレームかけて 100px 動かす、ということになるので、速さを求める式の移動距離に 100px、経過時間を 300 フレームとして割り当てると下記の計算式となる。

`100px / 300フレーム = 約0.333px/フレーム`

1 フレームあたりに約 0.333px 動かせば 5 秒で約 100px 移動することがわかる。

```typescript
// 60FPSの環境で、objectのx位置を5秒かけて約100px動かす速さを設定する場合

const speed = 100 / 300;

function update(): void {
  object.x += speed;
}
```

実際にコードで書き直したもの。

100 が移動距離、300 が経過時間、100/300 の計算結果が速さになる。

### 変位

物体がある地点から別の地点まで移動した変化の量を`変位`と呼ぶ。

ある地点にボールが置かれているとして、そこからボールが西に 10m 移動した場合の変位は -10m、東に 10m 移動した場合の変位は +10m になる。

距離の場合、西に 10m ずれようが東に 10m ずれようが、ボールが移動した距離は 10m になるが、変位はずれた方向を情報として含む。つまり値に符号が存在する。

### 速度

`[速度] = [変位] ÷ [経過時間]`

`速度` は変位を経過時間で割ることで算出できる。

- 西に向かって 100m の距離を 10 秒で走ったときの速度は `-100m / 10秒 = -10m/秒`
- 西に向かって 30km の距離を 2 時間で走ったときの速度は `-30km / 2時間 = -15km/時間`

```typescript
const speed = -100 / 300;

function update(): void {
  object.x += speed;
}
```

符号が付いている変位を経過時間で割っているので、計算結果の速度も符号が付く。
