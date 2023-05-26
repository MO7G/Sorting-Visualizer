export const bubbleSort = (arr) => {

    let animation = [];
    let isSwapped = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < (arr.length - i - 1); j++) {
            animation.push([j, false, j + 1, "set"]);
            animation.push([j, false, j + 1, "unset"]);
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                animation.push([j, true, arr[j + 1]]);
                arr[j] = arr[j + 1];
                animation.push([j + 1, true, temp]);
                arr[j + 1] = temp;
                isSwapped = true;
            }
        }
        if (!isSwapped)
            break;
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







