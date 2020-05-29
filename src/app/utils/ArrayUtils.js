export default class ArrayUtils {

    static splitBy(count, array) {
        let arr = [[]];
        let k   = 0;
        for (let i = 0; i < array.length; i++) {
            if (i % count === 0) {
                arr.push([]);
                k++;
            }
            arr[k].push(array[i]);
        }
        return arr;
    }

}
