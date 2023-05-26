let getMax = (a) => {
    let n = a.length;
    let max = a[0];
    for (let i = 1; i < n; i++) {
        if (a[i] > max)
            max = a[i];
    }
    return max; //maximum element from the array  
}


export const countSort = (arr) => {
    let animation = [];
    let n = arr.length;
    let output = Array.from({ length: n }, (_, i) => 0);
    let max = getMax(arr);
    let count = [max + 1]; //create count array with size [max+1]  


    for (let i = 0; i <= max; ++i) {
        count[i] = 0; // Initialize count array with all zeros  
    }

    for (let i = 0; i < n; i++) // Store the count of each element  
    {
        count[arr[i]]++;
    }

    for (let i = 1; i <= max; i++)
        count[i] += count[i - 1]; //find cumulative frequency  

    /* This loop will find the index of each element of the original array in count array, and 
     place the elements in output array*/

    for (let i = n - 1; i >= 0; i--) {


        animation.push([i, false, arr[i], "set"]);
        animation.push([i, false, arr[i] - 1, "unset"]);
        animation.push([i, false, count[arr[i]] - 1, "set"]);
        animation.push([i, false, count[arr[i]] - 1, "unset"]);

        output[count[arr[i]] - 1] = arr[i];
        animation.push([count[arr[i]] - 1, true, arr[i]]);
        count[arr[i]]--;

    };

    return animation;
}







