import { nodeCache } from "../../lib/nodeCache";

/**
 * @returns {string} キャッシュに保存されているアクセス日時
 */
export const getMethod = (): string => {
    return nodeCache.get("access") ?? "Data not found";
};

/**
 * キャッシュにアクセス日時を保存
 *
 * @returns {void}
 */
export const postMethod = (): void => {
    nodeCache.set("access", new Date().toLocaleString("ja-JP"));
};
