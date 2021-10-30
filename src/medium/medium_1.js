import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    // let sum = array.reduce(
    //     ( previousValue, currentValue ) => previousValue + currentValue,
    //     0
    // )
    // 
    // /*    
    let sum = 0;
    array.forEach(element => {
        sum += element;
    });
    // */
    return sum;
}

/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.3
 */
export function getMedian(array) {
    let indexOfMedian = (array.length)/2;
    array.sort(function(a, b) {
        return a - b;
    });
    return array[indexOfMedian];
    /*
    [14,8,5,7,7,5,2,7,5,3,47,9]
    let count = 0;
    array.forEach(element => {
        sum += element;
        count++;
    });
    if (count != 0) {
        return sum/count;
    }
    */
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let answer = {};
    answer['length'] = array.length;
    answer['sum'] = getSum(array);
    let mean = getSum(array) / array.length;
    answer['mean'] = mean;
    answer['median'] = getMedian(array);
    answer['min'] = Math.min(...array);
    answer['max'] = Math.max(...array);
    let vari = variance(array, mean);
    answer['variance'] = vari;
    answer['standard_deviation'] = Math.sqrt(vari);
    return answer;
}

