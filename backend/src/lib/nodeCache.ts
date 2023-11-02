import NodeCache from "node-cache";

// 30分間キャッシュを保持する
export const nodeCache = new NodeCache({ stdTTL: 60 * 30 });
