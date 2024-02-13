/**
 * 数组累加和
 * 1, 2, 3 ==>
 * 1, 3, 6
 * @param array
 */
export function accumulate(array: any[]): any[] {
    if (array.length === 0) {
        return [];
    }
    if (array.length === 1) {
        return [array[0]];
    }
    const res = [array[0]];

    for (let i = 1; i < array.length; i++) {
        res.push(res[i - 1] + array[i]);
    }
    return res;
}