// function createPhoneNumber(numbers) {
//     //   const numStr = String(numbers)
//     //   console.log(numStr)
//     const [first, second, third, fourth, fifth, sixth, ...others] = numbers

//     const firstThree = `(${first}${second}${third})`
//     // console.log(first, second, third, firstThree)
//     const secondThree = `${fourth}${fifth}${sixth}-`
//     const phoneStr = `${firstThree} ${secondThree}${others.join('')}`
//     return phoneStr
// }
console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]))

function createPhoneNumber(numbers) {
    return numbers.reduce((p, c) => p.replace('x', c), "(xxx) xxx-xxxx");
}

function likes(names) {
    let length = names.length
    switch (length) {
        case 0:
            return "no one like this"
        case 1:
            return `${names[0]} likes this`
        case 2:
            return `${names[0]} and ${names[1]} like this`
        case 3:
            return `${names[0]}, ${names[1]} and ${names[2]} like this`
        default:
            return `${names[0]}, ${names[1]} and ${length - 2} others like this`
    }
}
function descendingOrder(n) {
    const numStr = String(n)
    const splitArr = numStr.split("").sort((a, b) => b - a)
    return parseInt(splitArr.join(""), 10)
}
console.log(descendingOrder(1021))

function getCount(str) {

    const vowels = ['a', 'e', 'i', 'o', 'u']
    let newStr = [...str]
    let vowelArr = newStr.filter(c => vowels.includes(c))
    return vowelArr.length
}

console.log(getCount("abracadabra"))

function toCamelCase(str) {
    const dash = ["-", "_"]
    let isCapitalizeNext = false
    let strArr = [...str]
    let strJoin = strArr.map((c, k) => {
        if (dash.includes(c)) {
            isCapitalizeNext = true
            return ""
        }
        if (isCapitalizeNext) {
            isCapitalizeNext = false
            return c.toUpperCase()
        }

        return c
    }).join("")
    console.log(strJoin)

}
toCamelCase("The-Stealth-Warrior")
toCamelCase("the_stealth_warrior")

function findOdd(A) {
    let count = A.reduce((acc, cur) => {
        acc[cur] = (acc[cur] || 0) + 1
        return acc
    }, {})

    for (const [key, value] of Object.entries(count)) {
        if (value % 2 != 0) {
            return parseInt(key)
        }
    }
}
findOdd([7])

function reduceDirection(arr) {
    const opposite = { "NORTH": "SOUTH", "SOUTH": "NORTH", "EAST": "WEST", "WEST": "EAST" }
    return arr.reduce((acc, cur) => {
        if (acc.length > 0 && acc[acc.length - 1] === opposite[cur]) {
            acc.pop()
        } else {
            acc.push(cur)
        }
        return acc
    }, [])

}

reduceDirection(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"])
reduceDirection(["NORTH", "WEST", "SOUTH", "EAST"])


function inArr(a1, a2) {
    let newArr = []
    a1.map(substr => {
        if (a2.some(word => word.match(substr))) {
            newArr.push(substr)
        }
    })
    return newArr.sort()
}

console.log(inArr(["arp", "live", "strong"], ["lively", "alive", "harp", "sharp", "armstrong"]))
console.log(inArr(["xyz", "live", "strong"], ["lively", "alive", "harp", "sharp", "armstrong"]))
console.log(inArr(['ion', 'oint', 'pini', 'by'], ['neither', 'most', 'what', 'a', 'would', 'ruby-doc.', 'updated', 'browse', 'I', 'known', 'Ruby', 'using', 'perfect', 'out', 'questions', 'you', 'I', 'input', 'your', 'does', 'have']))


function hashTag(str) {
    if (str.length > 140 || str.trim().length == 0) return false
    return ['#',...str.trim().split(" ")].map(word=> {
        console.log(word.charAt(0).toUpperCase()+word.slice(1))
        return word.charAt(0).toUpperCase()+word.slice(1)}).join("")
}
console.log(hashTag("    hello    world    "))

//example: "    hello    world    " => #HelloWorld
//example:" Hello my son" => #HelloMySon
// example:"Try use it" => #TryUseIt