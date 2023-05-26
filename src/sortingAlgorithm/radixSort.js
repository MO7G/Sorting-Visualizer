const countingSort = (arr, size, place, animation) => {

    let output = new Array(size + 1).fill(0);
    let max = Math.max(...arr);
    let freq = new Array(max + 1).fill(0);

    // Calculate count of elements
    for (let i = 0; i < size; i++) {
        const num = Math.floor(arr[i] / place) % 10;
        freq[num]++;
    }

    // Calculate cummulative count
    for (let i = 1; i < 10; i++) {
        freq[i] += freq[i - 1];
    }

    // Place the elements in sorted order
    for (let i = size - 1; i >= 0; i--) {
        const num = Math.floor(arr[i] / place) % 10;
        output[freq[num] - 1] = arr[i];
        animation.push([num, false, i, "set"]);
        animation.push([num, false, i, "unset"]);
        animation.push([freq[num] - 1, false, i, "set"]);
        animation.push([freq[num] - 1, false, i, "unset"]);
        animation.push([freq[num] - 1, true, arr[i]]);
        freq[num]--;
    }

    //Copy the output array
    for (let i = 0; i < size; i++) {
        arr[i] = output[i];
    }
}

export const radixSort = (arr) => {
    let animation = [];
    let size = arr.length
    //Get the max element
    let max = Math.max(...arr);
    //Sort the array using counting sort
    for (let i = 1; parseInt(max / i) > 0; i *= 10) {
        countingSort(arr, size, i, animation);
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
    console.log(arr);
    const temp = arr.slice();
    temp.sort((a, b) => a - b);
    radixSort(arr);
    const t1 = JSON.stringify(arr);
    const t2 = JSON.stringify(temp);
    console.log(arr);
    if (t1 === t2) {
        console.log(true);
    } else {
        console.log(false);
    }
}

const doTesting = () => {
    for (let i = 0; i < 3; i++) {
        const arr = [];
        for (let i = 0; i < 30; i++) {
            arr[i] = randomNumber(0, 1000);
        }
        testing(arr);
    }
}




