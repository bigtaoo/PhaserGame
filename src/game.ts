import Phaser from 'phaser';
import playerImg from './assets/1.png';
import bgImg from './assets/background.png';
import bgMusicFile from './assets/music.ogg';

// Loading Scene
class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload(): void {
        // Load assets
        this.load.image('player', playerImg);
        this.load.image('background', bgImg);
        this.load.audio('bgMusic', bgMusicFile);

        // Loading text
        const loadingText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading...', {
            font: '24px Arial',
            color: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value: number) => {
            loadingText.setText(`Loading: ${Math.round(value * 100)}%`);
        });
    }

    create(): void {
        // Go to GameScene after loading
        this.scene.start('GameScene');
    }
}

// Main Game Scene
class GameScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;
    private bgMusic!: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: 'GameScene' });
    }

    create(): void {
        // Background
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .setDisplaySize(this.scale.width, this.scale.height);

        // Player sprite
        this.player = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'player');

        // Background music
        this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
        this.bgMusic.play();

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

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [LoadingScene, GameScene],
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: { default: 'arcade', arcade: { debug: false } },
};

// Start game
new Phaser.Game(config);
