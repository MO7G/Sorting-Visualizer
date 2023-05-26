let Animation = [];
function swap(items, leftIndex, rightIndex) {
    Animation.push([leftIndex, true, items[rightIndex]]);
    Animation.push([rightIndex, true, items[leftIndex]]);
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var index = Math.floor((right + left) / 2)
    var pivot = items[index], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            Animation.push([i, false, index, "set"]);
            Animation.push([i, false, index, "unset"]);
            i++;
        }
        while (items[j] > pivot) {
            Animation.push([j, false, index, "set"]);
            Animation.push([j, false, index, "unset"]);
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

const quickSortHelper = (items, left, right) => {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSortHelper(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSortHelper(items, index, right);
        }
    }
}

export const quickSort = (arr, left, right) => {
    Animation = []
    quickSortHelper(arr, left, right);
    return Animation;
}












