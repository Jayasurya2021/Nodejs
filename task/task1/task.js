console.log("test")

let arry = [2, 4, 5, 2, 6, 24, 53, 34, 3]
let arr2 = []
let group = []

for (let i = 0; i <= arry.length - 1; i++) {
    arr2.push(arry[i])
    if (arr2.length === 2) {
        group.push(arr2)
        arr2 = []
    }
}
group.push(arr2)

console.log(group)