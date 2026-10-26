/*
 演出・効果音制御
*/

let bgmAudio = null;

/*
 効果音再生
*/

function playSound(path) {

    if (!settings.soundEnabled) {
        return;
    }

    try {

        const sound =
            new Audio(path);

        sound.volume = 0.8;

        sound.play();

    } catch (error) {

        console.error(
            "効果音再生エラー",
            error
        );

    }
}

/*
 抽選音
*/

function playDrawSound() {

    playSound(
        SOUND_FILES.DRAW
    );

}

/*
 当選音
*/

function playWinSound() {

    playSound(
        SOUND_FILES.WIN
    );

}

/*
 BGM開始
*/

function startBgm() {

    if (!settings.bgmEnabled) {
        return;
    }

    try {

        if (!bgmAudio) {

            bgmAudio =
                new Audio(
                    SOUND_FILES.BGM
                );

            bgmAudio.loop = true;

            bgmAudio.volume = 0.3;
        }

        bgmAudio.play();

    } catch (error) {

        console.error(
            "BGM再生エラー",
            error
        );

    }
}

/*
 BGM停止
*/

function stopBgm() {

    if (!bgmAudio) {
        return;
    }

    try {

        bgmAudio.pause();

        bgmAudio.currentTime = 0;

    } catch (error) {

        console.error(
            "BGM停止エラー",
            error
        );

    }
}

/*
 BGM設定反映
*/

function applyBgmSetting() {

    if (settings.bgmEnabled) {

        startBgm();

    } else {

        stopBgm();

    }
}

/*
 紙吹雪
*/

function runConfetti() {

    if (!settings.confettiEnabled) {
        return;
    }

    if (typeof confetti !== "function") {
        return;
    }

    confetti({

        particleCount: 350,

        spread: 180,

        origin: {

            y: 0.6

        }

    });

}

/*
 フラッシュ演出
*/

function flashScreen() {

    if (!settings.flashEnabled) {
        return;
    }

    document.body.classList.add(
        "flash"
    );

    setTimeout(() => {

        document.body.classList.remove(
            "flash"
        );

    }, 800);

}

/*
 振動
*/

function vibrateDevice() {

    if (!settings.vibrationEnabled) {
        return;
    }

    if (
        typeof navigator.vibrate
        !== "function"
    ) {
        return;
    }

    navigator.vibrate([
        150,
        80,
        150
    ]);

}

/*
 読み上げ
*/

function speakNumber(number) {

    if (!settings.voiceEnabled) {
        return;
    }

    if (
        !window.speechSynthesis
    ) {
        return;
    }

    try {

        const speech =
            new SpeechSynthesisUtterance(
                `${number} 番`
            );

        speech.lang = "ja-JP";

        speech.rate = 0.95;

        speech.pitch = 1.1;

        speech.volume = 1;

        window
            .speechSynthesis
            .cancel();

        window
            .speechSynthesis
            .speak(speech);

    } catch (error) {

        console.error(
            "読み上げエラー",
            error
        );

    }
}

/*
 フルスクリーン
*/

function enterFullscreen() {

    const target =
        document.documentElement;

    if (
        target.requestFullscreen
    ) {

        target.requestFullscreen();

    }

}

/*
 大当たり演出
*/

function runWinEffects(number) {

    playWinSound();

    flashScreen();

    runConfetti();

    vibrateDevice();

    speakNumber(number);

}

/*
 設定保存成功通知
*/

function showToast(message) {

    const toast =
        document.createElement("div");

    toast.textContent =
        message;

    toast.style.position =
        "fixed";

    toast.style.bottom =
        "20px";

    toast.style.right =
        "20px";

    toast.style.padding =
        "12px 18px";

    toast.style.borderRadius =
        "10px";

    toast.style.background =
        "#222";

    toast.style.color =
        "#fff";

    toast.style.zIndex =
        "9999";

    toast.style.boxShadow =
        "0 0 15px rgba(255,255,255,.3)";

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.remove();

    }, 2500);

}