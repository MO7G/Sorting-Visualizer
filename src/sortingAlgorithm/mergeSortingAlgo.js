
const animate = [];


let counter = 0;
const merge = (array, start, middleIndex, end, auxArray, animate) => {
    let i, j, cnt;
    i = cnt = start;
    j = middleIndex + 1;
    while (i <= middleIndex && j <= end) {
        animate.push([j, false, j, "set"]);
        animate.push([i, false, j, "unset"]);
        if (auxArray[i] <= auxArray[j]) {

            animate.push([cnt, true, auxArray[i]]);
            array[cnt] = auxArray[i];
            i++;
            cnt++;
        } else {
            animate.push([cnt, true, auxArray[j]]);
            array[cnt] = auxArray[j];
            j++;
            cnt++;
        }
    }

    while (i <= middleIndex) {
        animate.push([i, false, i, "set"]);
        animate.push([i, false, i, "unset"]);
        animate.push([cnt, true, auxArray[i]]);
        array[cnt] = auxArray[i];
        i++;
        cnt++;
    }
    while (j <= end) {
        animate.push([j, false, j, "set"]);
        animate.push([j, false, j, "unset"]);
        animate.push([cnt, true, auxArray[j]]);
        array[cnt] = auxArray[j];
        j++;
        cnt++;
    }
}

export const mergeSortMain = (array, start, end, auxArray, animate) => {
    if (start === end) return;
    const middleIndex = Math.floor((start + end) / 2);
    mergeSortMain(auxArray, start, middleIndex, array, animate);
    mergeSortMain(auxArray, middleIndex + 1, end, array, animate);

    merge(array, start, middleIndex, end, auxArray, animate);
}

export const mergeSort = (array) => {
    const animate = [];
    if (array.length < 1) return array;
    // slice take another versoin of the same array a  copy 
    const auxArray = array.slice();
    mergeSortMain(array, 0, array.length - 1, auxArray, animate);
    return animate;

}



