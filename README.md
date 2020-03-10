# syanten
麻雀シャンテン向聴数計算

**向聴数計算**

Install with npm:
```
$ npm i syanten
```

Example:
```js
const sht = require("syanten")
let h = [
    [4, 1, 1, 1, 1, 1, 1, 1, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]
console.log(sht.syanten(h))   //一般形
console.log(sht.syanten7(h))  //七対子形
console.log(sht.syanten13(h)) //国士形
// -2  牌数不正
// -1  和了形
// 0   聴牌形
// 1~  向聴数
```
