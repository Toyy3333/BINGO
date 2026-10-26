/*
 設定ファイル
*/

const DEFAULT_SETTINGS = {

    /*
     抽選設定
    */

    // 最大番号（設定画面から変更可能）
    maxNumber: 99,

    // 抽選演出時間(ms)
    drawDuration: 3000,

    // 抽選アニメーション更新間隔(ms)
    animationInterval: 80,

    /*
     サウンド設定
    */

    soundEnabled: true,

    bgmEnabled: true,

    voiceEnabled: true,

    /*
     演出設定
    */

    confettiEnabled: true,

    flashEnabled: true,

    vibrationEnabled: true,

    /*
     表示設定
    */

    fullscreenEnabled: false

};

/*
 LocalStorageキー
*/

const STORAGE_KEYS = {

    SETTINGS: "BINGO_SETTINGS",

    HISTORY: "BINGO_HISTORY"

};

/*
 サウンドファイル
*/

const SOUND_FILES = {

    DRAW: "sounds/draw.mp3",

    WIN: "sounds/win.mp3",

    BGM: "sounds/bgm.mp3"

};

/*
 アプリ情報
*/

const APP_INFO = {

    NAME: "BINGO ROYAL",

    VERSION: "1.0.0"

};