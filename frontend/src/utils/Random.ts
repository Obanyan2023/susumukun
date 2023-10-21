/**
 * 配列の中身をランダムに取り出す
 *
 * @param {Array<T>} array - ランダムに中身を取り出したい配列
 * @returns {T} ランダムに取り出した配列の中身
 */
export function getAryRand<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}
