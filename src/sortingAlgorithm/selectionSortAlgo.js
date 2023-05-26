export const selectionSort = (arr) => {
    let animation = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            animation.push([j, false, minIndex, "set"]);
            animation.push([j, false, minIndex, "unset"]);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex != i) {

            let temp = arr[minIndex];
            animation.push([minIndex, true, arr[i]]);
            arr[minIndex] = arr[i];

            animation.push([i, true, temp]);
            arr[i] = temp;
        }
    }
    return animation;
}

const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result = Math.floor(Math.random() * (max - min) + min);
    return result;
}


const testing = (arr) => {
    const temp = arr.slice();
    temp.sort((a, b) => a - b);
    selectionSort(arr);
    const t1 = JSON.stringify(arr);
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


//doTesting();


