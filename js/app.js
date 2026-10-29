/*
 メイン処理
*/

let settings = null;

let history = [];

let numbers = [];

let isDrawing = false;

/*
 初期化
*/

document.addEventListener(
    "DOMContentLoaded",
    init
);

function init() {

    settings = loadSettings();

    history = loadHistory();

    initializeSettingsForm();

    rebuildNumberPool();

    createNumberBoard();

    // renderHistory();

    renderRemainCount();

    initializeDrawer();

    initializeButtons();

}

/*
 設定画面初期化
*/

function initializeSettingsForm() {

    document.getElementById(
        "maxNumber"
    ).value =
        settings.maxNumber;

    document.getElementById(
        "soundEnabled"
    ).checked =
        settings.soundEnabled;

    document.getElementById(
        "bgmEnabled"
    ).checked =
        settings.bgmEnabled;

    document.getElementById(
        "confettiEnabled"
    ).checked =
        settings.confettiEnabled;

    document.getElementById(
        "flashEnabled"
    ).checked =
        settings.flashEnabled;

    document.getElementById(
        "voiceEnabled"
    ).checked =
        settings.voiceEnabled;

    document.getElementById(
        "vibrationEnabled"
    ).checked =
        settings.vibrationEnabled;

}

/*
 番号プール再構築
*/

function rebuildNumberPool() {

    numbers = [];

    for (
        let i = 1;
        i <= settings.maxNumber;
        i++
    ) {

        if (!history.includes(i)) {

            numbers.push(i);

        }

    }

}

/*
 番号盤作成
*/

function createNumberBoard() {

    const board =
        document.getElementById(
            "numberBoard"
        );

    board.innerHTML = "";

    for (
        let i = 1;
        i <= settings.maxNumber;
        i++
    ) {

        const cell =
            document.createElement(
                "div"
            );

        cell.className =
            "numberCell";

        cell.id =
            `num-${i}`;

        cell.textContent =
            String(i)
                .padStart(2, "0");

        board.appendChild(cell);

    }

    history.forEach(
        highlightNumber
    );

}

/*
 履歴描画
*/

// function renderHistory() {

//     const historyArea =
//         document.getElementById(
//             "history"
//         );

//     historyArea.innerHTML = "";

//     history.forEach(number => {

//         const item =
//             document.createElement(
//                 "div"
//             );

//         item.className =
//             "historyItem";

//         item.textContent =
//             String(number)
//                 .padStart(2, "0");

//         historyArea.appendChild(
//             item
//         );

//     });

// }

/*
 残数表示
*/

function renderRemainCount() {

    document.getElementById(
        "remainCount"
    ).textContent =
        settings.maxNumber -
        history.length;

}

/*
 番号ハイライト
*/

function highlightNumber(
    number
) {

    const target =
        document.getElementById(
            `num-${number}`
        );

    if (!target) return;

    target.classList.add(
        "called"
    );

}

/*
 ハイライト解除
*/

function unHighlightNumber(
    number
) {

    const target =
        document.getElementById(
            `num-${number}`
        );

    if (!target) return;

    target.classList.remove(
        "called"
    );

}

/*
 抽選
*/

function drawNumber() {

    if (isDrawing) return;

    if (numbers.length === 0) {

        alert(
            "全ての番号が抽選済みです。"
        );

        return;

    }

    isDrawing = true;

    playDrawSound();

    const display =
        document.getElementById(
            "ballDisplay"
        );

    const interval =
        setInterval(() => {

            const randomNumber =
                Math.floor(
                    Math.random() *
                    settings.maxNumber
                ) + 1;

            display.textContent =
                String(
                    randomNumber
                ).padStart(2, "0");

        }, settings.animationInterval);

    setTimeout(() => {

        clearInterval(interval);

        const index =
            Math.floor(
                Math.random() *
                numbers.length
            );

        const selectedNumber =
            numbers.splice(
                index,
                1
            )[0];

        finishDraw(
            selectedNumber
        );

        isDrawing = false;

    }, settings.drawDuration);

}

/*
 抽選終了
*/

function finishDraw(number) {

    document.getElementById(
        "ballDisplay"
    ).textContent =
        String(number)
            .padStart(2, "0");

    history.push(number);

    saveHistory(history);

    highlightNumber(number);

    // renderHistory();

    renderRemainCount();

    runWinEffects(number);

}

/*
 Undo
*/

function undoLastNumber() {

    if (isDrawing) return;

    if (
        history.length === 0
    ) {

        alert(
            "戻せる番号がありません。"
        );

        return;

    }

    const lastNumber =
        history.pop();

    numbers.push(lastNumber);

    numbers.sort(
        (a, b) => a - b
    );

    saveHistory(history);

    unHighlightNumber(
        lastNumber
    );

    // renderHistory();

    renderRemainCount();

    document.getElementById(
        "ballDisplay"
    ).textContent =
        "00";

}

/*
 リセット
*/

function resetGame() {

    const result =
        confirm(
            "抽選履歴をリセットしますか？"
        );

    if (!result) {

        return;

    }

    history = [];

    clearHistory();

    rebuildNumberPool();

    createNumberBoard();

    // renderHistory();

    renderRemainCount();

    document.getElementById(
        "ballDisplay"
    ).textContent = "00";

}

/*
 設定保存
*/

function saveCurrentSettings() {

    const maxNumber =
        Number(
            document
                .getElementById(
                    "maxNumber"
                )
                .value
        );

    if (
        Number.isNaN(maxNumber)
        || maxNumber < 1
    ) {

        alert(
            "最大番号を確認してください。"
        );

        return;

    }

    settings = {

        ...settings,

        maxNumber,

        soundEnabled:
            document.getElementById(
                "soundEnabled"
            ).checked,

        bgmEnabled:
            document.getElementById(
                "bgmEnabled"
            ).checked,

        confettiEnabled:
            document.getElementById(
                "confettiEnabled"
            ).checked,

        flashEnabled:
            document.getElementById(
                "flashEnabled"
            ).checked,

        voiceEnabled:
            document.getElementById(
                "voiceEnabled"
            ).checked,

        vibrationEnabled:
            document.getElementById(
                "vibrationEnabled"
            ).checked

    };

    saveSettings(settings);

    applyBgmSetting();

    showToast(
        "設定を保存しました"
    );

}

/*
 ドロワー制御
*/

function initializeDrawer() {

    const drawer =
        document.getElementById(
            "settingsDrawer"
        );

    const overlay =
        document.getElementById(
            "drawerOverlay"
        );

    document
        .getElementById(
            "menuButton"
        )
        .addEventListener(
            "click",
            () => {

                drawer.classList.add(
                    "open"
                );

                overlay.classList.add(
                    "show"
                );

            }
        );

    function closeDrawer() {

        drawer.classList.remove(
            "open"
        );

        overlay.classList.remove(
            "show"
        );

    }

    document
        .getElementById(
            "closeDrawer"
        )
        .addEventListener(
            "click",
            closeDrawer
        );

    overlay.addEventListener(
        "click",
        closeDrawer
    );

}

/*
 ボタンイベント
*/

function initializeButtons() {

    document
        .getElementById(
            "drawBtn"
        )
        .addEventListener(
            "click",
            () => {

                if (
                    settings.bgmEnabled
                ) {

                    startBgm();

                }

                drawNumber();

            }
        );

    document
        .getElementById(
            "undoBtn"
        )
        .addEventListener(
            "click",
            undoLastNumber
        );

    document
        .getElementById(
            "resetBtn"
        )
        .addEventListener(
            "click",
            resetGame
        );

    document
        .getElementById(
            "fullscreenBtn"
        )
        .addEventListener(
            "click",
            enterFullscreen
        );

    document
        .getElementById(
            "saveSettings"
        )
        .addEventListener(
            "click",
            saveCurrentSettings
        );

}