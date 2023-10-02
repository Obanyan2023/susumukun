/**
 * 値が存在するかどうかを判定する
 *
 * @param {undefined} value 存在するかどうかの判定を行う値
 * @returns {boolean} 存在するかどうか
 */
export function is_set<T>(value: unknown): value is T {
    return value !== undefined && value !== null;
}

/**
 * 値がstring型かどうかを判定する
 *
 * @param {unknown} value string型かどうかの判定を行う値
 * @returns {boolean} string型かどうか
 */
export function is_string(value: unknown): value is string {
    return typeof value === "string";
}

/**
 * 値がnumber型かどうかを判定する
 *
 * @param {unknown} value number型かどうかの判定を行う値
 * @returns {boolean} number型かどうか
 */
export function is_number(value: unknown): value is number {
    return typeof value === "number";
}
