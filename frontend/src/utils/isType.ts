/**
 * 値が存在するかどうかを判定する
 *
 * @param {undefined} value 存在するかどうかの判定を行う値
 * @returns {boolean} 存在するかどうか
 */
export function is_set<T>(value: unknown): value is T {
  return value !== undefined && value !== null;
}