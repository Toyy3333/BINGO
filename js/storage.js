/*
 LocalStorage管理
*/

/*
 設定保存
*/

function saveSettings(settings) {

    try {

        localStorage.setItem(
            STORAGE_KEYS.SETTINGS,
            JSON.stringify(settings)
        );

        return true;

    } catch (error) {

        console.error(
            "設定保存エラー",
            error
        );

        return false;
    }
}

/*
 設定読込
*/

function loadSettings() {

    try {

        const savedData =
            localStorage.getItem(
                STORAGE_KEYS.SETTINGS
            );

        if (!savedData) {

            return {
                ...DEFAULT_SETTINGS
            };

        }

        const parsedSettings =
            JSON.parse(savedData);

        return {

            ...DEFAULT_SETTINGS,

            ...parsedSettings

        };

    } catch (error) {

        console.error(
            "設定読込エラー",
            error
        );

        return {
            ...DEFAULT_SETTINGS
        };
    }
}

/*
 履歴保存
*/

function saveHistory(history) {

    try {

        localStorage.setItem(
            STORAGE_KEYS.HISTORY,
            JSON.stringify(history)
        );

        return true;

    } catch (error) {

        console.error(
            "履歴保存エラー",
            error
        );

        return false;
    }
}

/*
 履歴読込
*/

function loadHistory() {

    try {

        const savedHistory =
            localStorage.getItem(
                STORAGE_KEYS.HISTORY
            );

        if (!savedHistory) {
            return [];
        }

        const parsedHistory =
            JSON.parse(savedHistory);

        if (!Array.isArray(parsedHistory)) {
            return [];
        }

        return parsedHistory;

    } catch (error) {

        console.error(
            "履歴読込エラー",
            error
        );

        return [];
    }
}

/*
 履歴削除
*/

function clearHistory() {

    try {

        localStorage.removeItem(
            STORAGE_KEYS.HISTORY
        );

        return true;

    } catch (error) {

        console.error(
            "履歴削除エラー",
            error
        );

        return false;
    }
}

/*
 全データ削除
*/

function clearAllData() {

    try {

        localStorage.removeItem(
            STORAGE_KEYS.HISTORY
        );

        localStorage.removeItem(
            STORAGE_KEYS.SETTINGS
        );

        return true;

    } catch (error) {

        console.error(
            "全データ削除エラー",
            error
        );

        return false;
    }
}

/*
 設定リセット
*/

function resetSettings() {

    saveSettings(
        DEFAULT_SETTINGS
    );

    return {
        ...DEFAULT_SETTINGS
    };
}

/*
 デバッグ用
*/

function getStorageInfo() {

    return {

        settings:
            loadSettings(),

        history:
            loadHistory(),

        historyCount:
            loadHistory().length

    };

}