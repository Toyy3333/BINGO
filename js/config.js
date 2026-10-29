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

    DRAW: [

        "sounds/draw1.mp3",

        "sounds/draw2.mp3",

        "sounds/draw3.mp3",

        "sounds/draw4.mp3",

        "sounds/draw5.mp3",

        "sounds/draw6.mp3",

        "sounds/draw7.mp3",

        "sounds/draw8.mp3",

        "sounds/draw9.mp3",

        "sounds/draw10.mp3",

        "sounds/draw11.mp3",

    ],

    WIN: [

        "sounds/win1.mp3",

        "sounds/win2.mp3",

        "sounds/win3.mp3",

        "sounds/win4.mp3",

        "sounds/win5.mp3",

        "sounds/win6.mp3",

        "sounds/win7.mp3",

        "sounds/win8.mp3",

    ],

    BGM: "sounds/bgm.mp3"

};

/*
 アプリ情報
*/

const APP_INFO = {

    NAME: "BINGO ROYAL",

    VERSION: "1.0.0"

};