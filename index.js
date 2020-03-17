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
    let arr1 = haiArr[0].concat(haiArr[1]).concat(haiArr[2]).concat(haiArr[3])
    let s = sum(arr1)
    if (s > 14 || s % 3 === 0)
        return -2
    furo = (14 - s) / 3
    if (s % 3 === 1) {
        for (let i in haiArr[3]) {
            if (haiArr[3][i] < 4) {
                haiArr[3][i]++
                break
            }
        }
    }
    for (let i in arr1) {
        if (!arr1[i])
            continue
        let t = []
        t[0] = haiArr[0].concat(), t[1] = haiArr[1].concat(), t[2] = haiArr[2].concat(), t[3] = haiArr[3].concat()
        t[Math.floor(i / 9)][i % 9] -= arr1[i] >= 2 ? 2 : arr1[i]
        search(t[0]) && search(t[1]) && search(t[2]) && search(t[3], true) && calc()
    }
    if (res === -1 && s % 3 === 1)
        res = 0
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
module.exports = (haiArr)=>{
    return Math.min(syanten(haiArr), syanten7(haiArr), syanten13(haiArr))
}
module.exports.syanten = syanten
module.exports.syanten7 = syanten7
module.exports.syanten13 = syanten13
