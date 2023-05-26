

const doQuickSort = (number, first, last, animation) => {
    let i, j, pivot, temp;
    if (first < last) {
        pivot = first;
        i = first;
        j = last;
        while (i < j) {
            while (number[i] <= number[pivot] && i < last) {
                animation.push([i, false, pivot, "set"]);
                animation.push([i, false, pivot, "unset"]);
                animation.push([i, false, last, "set"]);
                animation.push([i, false, last, "unset"]);
                i++;
            }
            while (number[j] > number[pivot]) {
                animation.push([j, false, pivot, "set"]);
                animation.push([j, false, pivot, "unset"]);

                j--;
            }
            if (i < j) {
                temp = number[i];
                animation.push([i, true, number[j]]);
                number[i] = number[j];
                number[j] = temp;
                animation.push([j, true, temp]);
            }
        }
        temp = number[pivot];
        animation.push([pivot, true, number[j]]);
        number[pivot] = number[j];
        number[j] = temp;
        animation.push([j, true, temp]);
        doQuickSort(number, first, j - 1, animation);
        doQuickSort(number, j + 1, last, animation);
    }
}

export const quickSort = (array, low, high) => {
    let animation = [];
    let arr = array.slice();
    doQuickSort(arr, low, high, animation);
    console.log(arr);
    return animation;
}
