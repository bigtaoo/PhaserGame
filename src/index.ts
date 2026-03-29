import { isWeChat  } from './platforms';
import { GameScene } from './gameScene';
import { LoadingScene } from './loadingScene';

if (isWeChat())
{
    // Wechat minigame
    if (typeof window === 'undefined') global.window = {} as any;
    if (typeof navigator === 'undefined') global.navigator = {} as any;

    const systemInfo = wx.getSystemInfoSync();
    const width = systemInfo.windowWidth;
    const height = systemInfo.windowHeight;

    // Phaser config
    const config = {
        type: Phaser.CANVAS,
        width: width,
        height: height,
        canvas: wx.createCanvas(),
        scene: [LoadingScene, GameScene],
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    };

    const game = new Phaser.Game(config);
}
else
{
    // Web
    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        scene: [LoadingScene, GameScene],
        backgroundColor: '#87CEEB',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        // physics: { default: 'arcade', arcade: { debug: false } },
    };

    new Phaser.Game(config);
}
