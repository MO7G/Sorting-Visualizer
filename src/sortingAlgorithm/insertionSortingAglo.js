export const insertionSort = (mainArr) => {

    const arr = mainArr;
    const temp = [];
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        let curr = arr[i];
        temp.push([i, false, j, "set"]);
        temp.push([i, false, j, "unset"]);
        while ((j !== -1) && (curr < arr[j])) {
            //temp.push([i, false, j])
            arr[j + 1] = arr[j];
            temp.push([j + 1, false, j, "set"]);
            temp.push([j + 1, false, j, "unset"]);
            temp.push([j + 1, true, arr[j]])
            j--;
        }
        arr[j + 1] = curr;
        temp.push([j + 1, false, j + 1, "set"]);
        temp.push([j + 1, false, j + 1, "unset"]);
        temp.push([j + 1, true, curr]);
    }
    return temp;
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
    insertionSort(arr);
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
