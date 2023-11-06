import {customBoolean, is_set} from "./isType";
import {TRY_ORIENTATION_LOCK} from "../features/game/constants/localStorageKeys";

/**
 * 画面が縦向きかどうかを返す
 *
 * @returns {boolean} 画面が縦向きかどうか
 */
export function isLandscape(): boolean {
    const angle = window.orientation ?? window.screen.orientation.angle;

    if (angle === 90 || angle === 90 * -1) {
        return true;
    }

    return false;
}

/**
 * 画面を横向きにする
 * 画面を横向きにできなかったらアラートを出す
 *
 * @returns {boolean} 画面を横向きにできたかどうか
 */
export function setLandscape(): boolean {
    const msg = "画面を横向きにして遊んでください";

    // すでに横向きなら何もしない
    if (isLandscape() || customBoolean(localStorage.getItem(TRY_ORIENTATION_LOCK))) {
        return true;
    }

    // 画面を横向きにする
    try {
        // 複数回呼ばれるのを防ぐためにフラグを立てる
        localStorage.setItem(TRY_ORIENTATION_LOCK, "true");

        // 画面を横向きにする
        (window.screen.orientation as any).lock("landscape").catch(() => {
            // IOSでないかつ画面を横向きにできなかったらアラートを出し画面をリロードする
            alert(msg);
            window.location.reload();
        });

        return true;
    } catch (e) {
        // 画面を横向きにできなかったらアラートを出す
        alert(msg);
        return false;
    }
}