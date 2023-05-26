let animate = [];
const heapify = (arr, n, i) => {
    let largest = i;
    let left = (2 * i) + 1;
    let right = (2 * i) + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
        animate.push([largest, false, "set"]);
        animate.push([left, false, "set"]);
        animate.push([largest, false, "unset"]);
        animate.push([left, false, "unset"]);
    }


    if (right < n && arr[right] > arr[largest]) {
        // animate.push([right, false, n, "set"]);
        // animate.push([right, false, n, "unset"]);
        animate.push([right, false, largest, "set"])
        animate.push([right, false, largest, "unset"])
        largest = right;
    }


    if (largest != i) {
        swap(arr, i, largest, animate);
        heapify(arr, n, largest);
    }

}
export const heapSort = (arr) => {
    animate = [];
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
    return animate;
}

const swap = (arr, i, j) => {
    // animate.push([i, false, "set"]);
    // animate.push([j, false, "set"]);
    // animate.push([i, false, "unset"]);
    // animate.push([j, false, "unset"]);
    let temp = arr[j];
    arr[j] = arr[i];
    animate.push([j, true, arr[i]]);
    arr[i] = temp;
    animate.push([i, true, temp]);
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
    console.log(arr);
    heapSort(arr);
    console.log(arr);
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
