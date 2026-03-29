// 1️⃣ Must be at very top
import '@iro/wechat-adapter';

// 2️⃣ FULL GLOBAL PATCH BEFORE PHASER
const g = global as any;

// ======= Window =======
if (!g.window) g.window = {};
const w = g.window;

// ontouchstart must exist for HTML5Audio
w.ontouchstart = null;

// ======= GlobalThis =======
if (typeof globalThis !== 'undefined') {
    (globalThis as any).window = w;
}

// ======= Document =======
if (!w.document) w.document = {};
const d = w.document;

// body and documentElement
if (!d.body) d.body = { appendChild: () => {} };
if (!d.documentElement) d.documentElement = { style: {} };

// createElement for Phaser canvas
if (!d.createElement) {
    d.createElement = (tag?: string) => ({
        style: {},
        getContext: () => null,
        width: 0,
        height: 0,
    });
}

// addEventListener stub
if (!d.addEventListener) d.addEventListener = () => {};

// ======= Navigator =======
if (!w.navigator) w.navigator = {};
w.navigator.userAgent = 'WeChatGame';
w.navigator.maxTouchPoints = 1;

// ======= HTMLElement =======
if (!w.HTMLElement) w.HTMLElement = function () {} as any;

// ======= requestAnimationFrame =======
if (!w.requestAnimationFrame) w.requestAnimationFrame = (cb: Function) => setTimeout(cb, 16);
if (!w.cancelAnimationFrame) w.cancelAnimationFrame = (id: number) => clearTimeout(id);

// ======= localStorage =======
if (!w.localStorage) {
    w.localStorage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
    };
}

// ======= Now import Phaser =======
import Phaser from 'phaser';
import { LoadingScene } from './loadingScene';
import { GameScene } from './gameScene';

// ======= WeChat System Info =======
const sys = wx.getSystemInfoSync();

// Patch requestFullscreen / exitFullscreen to avoid Phaser errors
const canvas = wx.createCanvas();
if (!canvas.requestFullscreen) canvas.requestFullscreen = () => {};
if (!canvas.exitFullscreen) canvas.exitFullscreen = () => {};
if (!canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen = () => {};
if (!canvas.mozRequestFullScreen) canvas.mozRequestFullScreen = () => {};
if (!canvas.msRequestFullscreen) canvas.msRequestFullscreen = () => {};

// ======= Create Phaser Game =======
new Phaser.Game({
    type: Phaser.CANVAS,
    canvas: canvas,
    width: sys.windowWidth,
    height: sys.windowHeight,
    scene: [LoadingScene, GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    input: { touch: true },
});
