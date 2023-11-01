/**
 * 値が存在するかどうかを判定する
 *
 * @param {undefined} value 存在するかどうかの判定を行う値
 * @returns {boolean} 存在するかどうか
 */
export function is_set<T>(value: unknown): value is T {
  return value !== undefined && value !== null;
}

export function is_string(value: unknown): value is string {
    return typeof value === "string";
}

export function customBoolean(value: unknown): boolean {
  if (is_string(value)) {
    return value === "true";
  }

  return false;
}