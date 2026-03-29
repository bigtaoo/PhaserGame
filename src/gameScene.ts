import Phaser from 'phaser';
import { AssetKeys } from './assetKeys';
import { AssetManager } from './assetManager';
import { isWeChat } from './platforms';

export class GameScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Image;
    private bgMusic!: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: 'GameScene' });
    }

    create(): void {
        // Background
        this.add.image(this.scale.width / 2, this.scale.height / 2, AssetKeys.background)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Player sprite
        this.player = AssetManager.addImage(this, this.scale.width / 2, this.scale.height / 2, AssetKeys.num2);

        // Background music
        if (isWeChat())
        {
            const bgm = wx.createInnerAudioContext();
            bgm.src = 'assets/audio/bgm.ogg';
            bgm.loop = true;
            bgm.volume = 0.5;
        }
        else
        {
            this.bgMusic = this.sound.add(AssetKeys.music, { loop: true, volume: 0.2 });
            // this.bgMusic.play();
        }    

        // Click/tap input
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.player.x = pointer.x;
            this.player.y = pointer.y;
        });

        // Responsive handling
        this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
            this.cameras.resize(gameSize.width, gameSize.height);
            this.player.setPosition(gameSize.width / 2, gameSize.height / 2);
        });
    }
}
