
const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result = Math.floor(Math.random() * (max - min) + min);
    return result;
}
const testing = (arr) => {
    const temp = arr.slice();
    temp.sort((a, b) => a - b);
    let bubble = bubbleSort(arr);
    const t1 = JSON.stringify(bubble);
    const t2 = JSON.stringify(temp);

    if (t1 === t2) {
        console.log(true);
    } else {
        console.log(false);
    }
}
const doTesting = () => {
    for (let i = 0; i < 100; i++) {
        const arr = [];
        for (let i = 0; i < 50; i++) {
            arr[i] = randomNumber(-23, 100);
        }
        testing(arr);
    }
}