import { GameScene } from './gameScene';
import { LoadingScene } from './loadingScene';

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
