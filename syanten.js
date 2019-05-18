"use strict"
let syanten = function(h) { //一般形
    let sum = function (v) { //枚数計算
        let s = 0
        for (let i in v) s += v[i]
        return s
    }
    let res = 9 //结果
    let a, b, c, d //a：面子数 b：搭子数 c：孤立牌数 d：副露数
    a = b = c = d = 0
    let search = function (e, f) { //f：字牌flag
        let v = e.concat()
        for (let i in v) { //search面子
            if (!v[i]) {
                continue
            } else if (v[i] == 3) {
                delete v[i], a++
                continue
            } else {
                if (v[i] == 4) {
                    v[i] -= 3, a++
                }
                if (f) continue
                i = parseInt(i)
                if (v[i + 1] && v[i + 2]) {
                    v[i]--, v[i + 1]--, v[i + 2]--, a++
                }
                if (v[i] && v[i + 1] && v[i + 2]) {
                    v[i]--, v[i + 1]--, v[i + 2]--, a++
                }
            }
        }
        for (let i in v) { //search搭子
            if (!v[i]) {
                continue
            } else if (v[i] == 2) {
                delete v[i], b++
                continue
            } else {
                if (f) continue
                i = parseInt(i)
                if (v[i + 1]) {
                    v[i]--, v[i + 1]--, b++
                }
                if (v[i + 2]) {
                    v[i]--, v[i + 2]--, b++
                }
            }
        }
        c += sum(v) //search孤立牌
        return 1
    }
    let calc = function () {
        let r = -1
        while (a < 4 - d) {
            if (b && c) {
                b--, c--, a++, r++
                continue
            }
            if (b && !c) {
                b--, c++, a++, r++
                continue
            }
            if (!b && c) {
                c -= 2, a++, r += 2
            }
        }
        if (c) r++
        res = r < res ? r : res
        a = b = c = 0
    }
    let v = h[0].concat(h[1]).concat(h[2]).concat(h[3])
    let s = sum(v)
    if (s % 3 != 2) return -2
    d = (14 - s) / 3
    for (let i in v) {
        if (!v[i]) continue
        let t = []
        t[0] = h[0].concat(), t[1] = h[1].concat(), t[2] = h[2].concat(), t[3] = h[3].concat()
        t[Math.floor(i / 9)][i % 9] -= v[i] >= 2 ? 2 : v[i]
        search(t[0]) && search(t[1]) && search(t[2]) && search(t[3], 1) && calc()
    }
    return res
}

let syanten7 = function(h) { //七対子形
    let v = h[0].concat(h[1]).concat(h[2]).concat(h[3])
    let s = 0
    for (let i in v) {
        if (v[i] >= 2) s++
    }
    return 7 - s - 1
}

let syanten13 = function(h) { //国士形
    let v = [h[0][0], h[0][8], h[1][0], h[1][8], h[2][0], h[2][8]].concat(h[3])
    let s = 0
    let t = 0
    for (let i in v) {
        if (v[i]) s++
        if (v[i] > 1) t = 1
    }
    
    return 14 - s - t - 1
}

module.exports = {
    syanten: syanten,
    syanten7: syanten7,
    syanten13: syanten13
}
