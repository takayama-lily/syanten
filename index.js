/*
 * Copyright (C) https://github.com/takayama-lily/syanten
 */
'use strict'
const sum = (arr)=>{
    let s = 0
    for (let i in arr) s += arr[i]
    return s
}
const syanten = (haiArr)=>{
    let res = 9
    let mentsu, tatsu, alone, furo
    mentsu = tatsu = alone = furo = 0
    const search = (arr, isJihai)=>{
        let arr2 = arr.concat()
        let tmp1 = [0, 0, 0]
        let tmp2 = [0, 0, 0]
        {
            let arr1 = arr.concat()
            let tmpMentsu = 0
            let tmpTatsu = 0
            let tmpAlone = 0
            for (let i in arr1) {
                i = parseInt(i)
                if (!arr1[i]) {
                    continue
                } else if (arr1[i] == 3) {
                    arr1[i] -= 3, tmpMentsu++
                    continue
                } else {
                    if (arr1[i] == 4) {
                        arr1[i] -= 3, tmpMentsu++
                    }
                    if (isJihai) continue
                    if (arr1[i + 1] && arr1[i + 2]) {
                        arr1[i]--, arr1[i + 1]--, arr1[i + 2]--, tmpMentsu++
                    }
                    if (arr1[i] && arr1[i + 1] && arr1[i + 2]) {
                        arr1[i]--, arr1[i + 1]--, arr1[i + 2]--, tmpMentsu++
                    }
                }
            }
            for (let i in arr1) {
                i = parseInt(i)
                if (!arr1[i]) {
                    continue
                } else if (arr1[i] == 2) {
                    arr1[i] -= 2, tmpTatsu++
                    continue
                } else {
                    if (isJihai) continue
                    if (arr1[i + 1]) {
                        arr1[i]--, arr1[i + 1]--, tmpTatsu++
                    }
                    if (arr1[i + 2]) {
                        arr1[i]--, arr1[i + 2]--, tmpTatsu++
                    }
                }
            }
            tmpAlone += sum(arr1)
            tmp1 = [tmpMentsu, tmpTatsu, tmpAlone]
        } {
            let arr2 = arr.concat()
            let tmpMentsu = 0
            let tmpTatsu = 0
            let tmpAlone = 0
            for (let i in arr2) {
                i = parseInt(i)
                if (!arr2[i])
                    continue
                if (!isJihai) {
                    if (arr2[i] >= 2 && arr2[i + 1] >= 2 && arr2[i + 2] >= 2)
                        arr2[i] -= 2, arr2[i + 1] -= 2, arr2[i + 2] -= 2, tmpMentsu += 2
                    if (arr2[i] >= 2 && arr2[i + 1] >= 2 && arr2[i + 2] >= 2)
                        arr2[i] -= 2, arr2[i + 1] -= 2, arr2[i + 2] -= 2, tmpMentsu += 2
                }
                if (arr2[i] === 3 || arr2[i] === 4)
                    arr2[i] -= 3, tmpMentsu++
                if (arr2[i] === 2)
                    arr2[i] -=2, tmpTatsu++
                if (isJihai)
                    continue
                if (arr2[i] && arr2[i + 1] && arr2[i + 2])
                    arr2[i]--, arr2[i + 1]--, arr2[i + 2]--, tmpMentsu++
                if (arr2[i] && arr2[i + 1])
                    arr2[i]--, arr2[i + 1]--, tmpTatsu++
                if (arr2[i] && arr2[i + 2])
                    arr2[i]--, arr2[i + 2]--, tmpTatsu++
            }
            tmpAlone += sum(arr2)
            tmp2 = [tmpMentsu, tmpTatsu, tmpAlone]
        }
        let tmp = tmp1 >= tmp2 ? tmp1 : tmp2
        mentsu += tmp[0], tatsu += tmp[1], alone += tmp[2]
        return true
    }
    const calc = ()=>{
        let tmpRes = -1
        while (mentsu < 4 - furo) {
            if (tatsu && alone) {
                tatsu--, alone--, mentsu++, tmpRes++
                continue
            }
            if (tatsu && !alone) {
                tatsu--, alone++, mentsu++, tmpRes++
                continue
            }
            if (!tatsu && alone) {
                alone -= 2, mentsu++, tmpRes += 2
            }
        }
        if (alone) tmpRes++
        res = tmpRes < res ? tmpRes : res
        mentsu = tatsu = alone = 0
    }
    haiArr = JSON.parse(JSON.stringify(haiArr))
    let arr = haiArr[0].concat(haiArr[1]).concat(haiArr[2]).concat(haiArr[3])
    let s = sum(arr)
    if (s > 14 || s % 3 === 0)
        return -2
    furo = Math.round((14 - s) / 3)
    if (s % 3 === 1) {
        for (let i = 33;;i--) {
            if (!arr[i]) {
                arr[i]++
                haiArr[Math.floor(i / 9)][i % 9]++
                break
            }
        }
    }
    for (let i in arr) {
        if (!arr[i])
            continue
        let t = []
        t[0] = haiArr[0].concat(), t[1] = haiArr[1].concat(), t[2] = haiArr[2].concat(), t[3] = haiArr[3].concat()
        t[Math.floor(i / 9)][i % 9] -= arr[i] >= 2 ? 2 : arr[i]
        search(t[0]) && search(t[1]) && search(t[2]) && search(t[3], true) && calc()
    }
    return res
}
const syanten7 = (haiArr)=>{
    let v = haiArr[0].concat(haiArr[1]).concat(haiArr[2]).concat(haiArr[3])
    if (sum(v) < 13 || sum(v) > 14)
        return -2
    let s = 0
    for (let i in v)
        if (v[i] >= 2)
            s++
    return 7 - s - 1
}
const syanten13 = (haiArr)=>{
    let v = haiArr[0].concat(haiArr[1]).concat(haiArr[2]).concat(haiArr[3])
    if (sum(v) < 13 || sum(v) > 14)
        return -2
    v = [haiArr[0][0], haiArr[0][8], haiArr[1][0], haiArr[1][8], haiArr[2][0], haiArr[2][8]].concat(haiArr[3])
    let s = 0
    let t = 0
    for (let i in v) {
        if (v[i]) s++
        if (v[i] > 1)
            t = 1
    }
    return 14 - s - t - 1
}
const syantenAll = (haiArr)=>{
    let s7 = syanten7(haiArr)
    let s13 = syanten13(haiArr)
    if (s7 === -2 || s13 === -2)
        return syanten(haiArr)
    else
        return Math.min(syanten(haiArr), s7, s13)
}

const MPSZ = ['m', 'p', 's', 'z']
const hairi = (haiArr, has7or13 = true)=>{
    let syantenCalc = has7or13 ? syantenAll : syanten
    let sht = syantenCalc(haiArr)
    let res = {now: sht}
    if (sht < 0)
        return res
    if (sum(haiArr[0].concat(haiArr[1]).concat(haiArr[2]).concat(haiArr[3])) % 3 === 1) {
        res.wait = {}
        for (let i in haiArr) {
            for (let ii in haiArr[i]) {
                haiArr[i][ii]++
                if (syantenCalc(haiArr) < sht) {
                    let kk = parseInt(ii)+1+MPSZ[i]
                    let v = 5 - haiArr[i][ii]
                    res.wait[kk] = v
                }
                haiArr[i][ii]--
            }
        }
        return res
    }
    for (let i in haiArr) {
        for (let ii in haiArr[i]) {
            if (!haiArr[i][ii])
                continue
            haiArr[i][ii]--
            if (syantenCalc(haiArr) > sht) {
                haiArr[i][ii]++
                continue
            }
            let k = parseInt(ii)+1+MPSZ[i]
            res[k] = {}
            for (let iii in haiArr) {
                for (let iiii in haiArr[iii]) {
                    if (i === iii && ii === iiii)
                        continue
                    haiArr[iii][iiii]++
                    if (syantenCalc(haiArr) < sht) {
                        let kk = parseInt(iiii)+1+MPSZ[iii]
                        let v = 5 - haiArr[iii][iiii]
                        res[k][kk] = v
                    }
                    haiArr[iii][iiii]--
                }
            }
            haiArr[i][ii]++
        }
    }
    return res
}

module.exports = syantenAll
module.exports.syanten = syanten
module.exports.syanten7 = syanten7
module.exports.syanten13 = syanten13
module.exports.hairi = hairi
