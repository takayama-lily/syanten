# syanten

麻雀シャンテン向聴数計算  
Japanese riichi mahjong shanten calculation

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
