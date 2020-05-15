# syanten

麻雀シャンテン向聴数牌理計算  
Japanese riichi mahjong hand shanten calculation

**Install with npm:**

```
$ npm i syanten
```

**Example:**

```js
const sht = require("syanten")
//手牌可能数: 14,13, 11,10, 8,7, 5,4, 2,1
let h = [
    [4, 1, 1, 1, 1, 1, 1, 1, 3], //萬子
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //筒子
    [0, 0, 0, 0, 0, 0, 0, 0, 0], //索子
    [0, 0, 0, 0, 0, 0, 0]        //字牌
]
console.log(sht.syanten(h))     //一般形
console.log(sht.syanten7(h))    //七対子形
console.log(sht.syanten13(h))   //国士形
console.log(sht(h))             //全部形最小値
```

**Output:**

```
-2  牌数不正
-1  和了形
0   聴牌形
1~  向聴数
```

# 一般型牌理計算

```js
const sht = require("syanten")
let h = [
    [3, 3, 3, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0]
]
console.log(sht.hairi(h))
```

**Output:**

```js
//手牌14,11,8,5,2枚の場合
{
  now: 1, //現在向聴数
  '1m': {},
  '2m': {},
  '3m': {},
  '1p': {},
  '1z': { '1p': 2, '2z': 3, '3z': 3 }, //打1z 待1p二枚 2z三枚 3z三枚
  '2z': { '1p': 2, '1z': 3, '3z': 3 }, //打2z 待1p二枚 1z三枚 3z三枚
  '3z': { '1p': 2, '1z': 3, '2z': 3 }  //打3z 待1p二枚 1z三枚 2z三枚
}
```
"m,p,s,z" means "萬子,筒子,索子,字牌"  
"1z-7z" means "東南西北白發中"

**手牌13,10,7,4,1枚の場合**

```js
const sht = require("syanten")
let h = [
    [3, 3, 3, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0]
]
console.log(sht.hairi(h))
```

**Output:**

```js
//手牌13,10,7,4,1枚の場合
{
  now: 2, //現在向聴数
  wait: {'1p': 3, '2p': 4, '3p': 4, '1z': 3, '2z': 3, '3z': 3 } //待1p三枚 2p四枚 3p四枚 1z三枚 2z三枚 3z三枚
}
```

**七対&国士牌理**

```js
sht.hairi(h, true)
```
