/*
 * Copyright (C) https://github.com/takayama-lily/syanten
 */
'use strict'
const sum = (arr)=>{
    let s = 0
    for (let i = 0; i < arr.length; i++)
        s += arr[i]
    return s
}
const syanten = (haiArr)=>{
    let res = 9
    let mentsu, tatsu, alone, furo
    mentsu = tatsu = alone = furo = 0
    const search = (arr, isJihai = false)=>{
        let tmp1 = [0, 0, 0]
        let tmp2 = [0, 0, 0]
        {
            let arr1 = [...arr]
            let tmpMentsu = 0
            let tmpTatsu = 0
            let tmpAlone = 0
            for (let i = 0; i < 9; i++) {
                if (arr1[i] === 0 || arr1[i] === undefined)
                    continue
                if (arr1[i] >= 3)
                    arr1[i] -= 3, tmpMentsu++
                if (arr1[i] > 0) {
                    if (isJihai) continue
                    if (arr1[i + 1] > 0 && arr1[i + 2] > 0) {
                        arr1[i]--, arr1[i + 1]--, arr1[i + 2]--, tmpMentsu++
                    }
                    if (arr1[i] > 0 && arr1[i + 1] > 0 && arr1[i + 2] > 0) {
                        arr1[i]--, arr1[i + 1]--, arr1[i + 2]--, tmpMentsu++
                    }
                }
            }
            for (let i = 0; i < 9; i++) {
                if (arr1[i] === 0 || arr1[i] === undefined) {
                    continue
                } else if (arr1[i] === 2) {
                    arr1[i] -= 2, tmpTatsu++
                    continue
                } else {
                    if (isJihai) continue
                    if (arr1[i + 1] > 0) {
                        arr1[i]--, arr1[i + 1]--, tmpTatsu++
                    }
                    if (arr1[i + 2] > 0) {
                        arr1[i]--, arr1[i + 2]--, tmpTatsu++
                    }
                }
            }
            tmpAlone += sum(arr1)
            tmp1 = [tmpMentsu, tmpTatsu, tmpAlone]
        } {
            let arr2 = [...arr]
            let tmpMentsu = 0
            let tmpTatsu = 0
            let tmpAlone = 0
            for (let i = 0; i < 9; i++) {
                if (arr2[i] === 0 || arr2[i] === undefined)
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
                    arr2[i] -= 2, tmpTatsu++
                if (isJihai)
                    continue
                if (arr2[i] > 0 && arr2[i + 1] > 0 && arr2[i + 2] > 0)
                    arr2[i]--, arr2[i + 1]--, arr2[i + 2]--, tmpMentsu++
                if (arr2[i] > 0 && arr2[i + 1] > 0)
                    arr2[i]--, arr2[i + 1]--, tmpTatsu++
                if (arr2[i] > 0 && arr2[i + 2] > 0)
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
        if (alone > 0) tmpRes++
        res = tmpRes < res ? tmpRes : res
        mentsu = tatsu = alone = 0
    }
    haiArr = [[...haiArr[0]], [...haiArr[1]], [...haiArr[2]], [...haiArr[3]]]
    let arr = [...haiArr[0], ...haiArr[1], ...haiArr[2], ...haiArr[3]]
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
    for (let i = 0; i < 34; i++) {
        if (arr[i] === 0)
            continue
        let t = []
        t[0] = [...haiArr[0]], t[1] = [...haiArr[1]], t[2] = [...haiArr[2]], t[3] = [...haiArr[3]]
        t[Math.floor(i / 9)][i % 9] -= arr[i] >= 2 ? 2 : arr[i]
        search(t[0]) && search(t[1]) && search(t[2]) && search(t[3], true) && calc()
    }
    return res
}
const syanten7 = (haiArr)=>{
    let cnt = sum(haiArr[0]) + sum(haiArr[1]) + sum(haiArr[2]) + sum(haiArr[3])
    if (cnt < 13 || cnt > 14)
        return -2
    let v = [...haiArr[0], ...haiArr[1], ...haiArr[2], ...haiArr[3]]
    let s = 0, t = 0
    for (let i = 0; i < 34; i++) {
        if (v[i] >= 2) s++
        if (v[i] === 1) t++
    }
    if (s + t >= 7)
        return 6 - s
    else
        return 6 - s + (7 - s - t)
}
const syanten13 = (haiArr)=>{
    let cnt = sum(haiArr[0]) + sum(haiArr[1]) + sum(haiArr[2]) + sum(haiArr[3])
    if (cnt < 13 || cnt > 14)
        return -2
    let v = [haiArr[0][0], haiArr[0][8], haiArr[1][0], haiArr[1][8], haiArr[2][0], haiArr[2][8], ...haiArr[3]]
    let s = 0, t = 0
    for (let i = 0; i < 13; i++) {
        if (v[i]) s++
        if (v[i] > 1) t = 1
    }
    return 13 - s - t 
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
const hairi = (haiArr, is7or13 = false)=>{
    let syantenCalc = !is7or13 ? syanten : (haiArr)=>{
        return Math.min(syanten7(haiArr), syanten13(haiArr))
    }
    let sht = syantenCalc(haiArr)
    let res = {now: sht}
    if (sht < 0)
        return res
    let self = []
    const calcHairi = ()=>{
        let map = {}
        for (let i = 0; i < 4; i++) {
            for (let ii = 0; ii < 9; ii++) {
                if (haiArr[i][ii] === undefined)
                    continue
                if (i === self[0] && ii === self[1])
                    continue
                if (!is7or13 && i == 3 && haiArr[i][ii] === 0)
                    continue
                if (!is7or13 && i < 3 && (haiArr[i][ii] === 0 && !haiArr[i][ii-1] === 0 && !haiArr[i][ii-2] === 0 && !haiArr[i][ii+1] === 0 && !haiArr[i][ii+1] === 0))
                    continue
                haiArr[i][ii]++
                if (syantenCalc(haiArr) < sht) {
                    map[ii+1+MPSZ[i]] = 5 - haiArr[i][ii]
                }
                haiArr[i][ii]--
            }
        }
        return map
    }
    if ((sum(haiArr[0]) + sum(haiArr[1]) + sum(haiArr[2]) + sum(haiArr[3])) % 3 === 1) {
        res.wait = calcHairi()
        return res
    }
    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < 9; ii++) {
            if (haiArr[i][ii] === 0 || haiArr[i][ii] === undefined)
                continue
            haiArr[i][ii]--
            if (syantenCalc(haiArr) === sht) {
                self = [i, ii]
                res[ii+1+MPSZ[i]] = calcHairi()
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
