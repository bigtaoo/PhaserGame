import bgImg from './assets/background.png';
import bgMusicFile from './assets/music.ogg';
import numbersJson from './assets/numbers.json'
import numberPng from './assets/numbers.png';
import { isWeChat } from './platforms';

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload(): void {
        if (isWeChat())
        {
            // Wechat minigame
            this.load.setBaseURL('');
            this.load.atlas('numbers', 'assets/numbers.png', 'assets/numbers.json');
            this.load.image('background', 'assets/background.png');
            this.load.audio('')
        }
        else
        {
            // Web
            this.load.atlas('numbers', numberPng, numbersJson);
            this.load.image('background', bgImg);
            this.load.audio('music', bgMusicFile);
        }

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const progressBar = this.add.graphics();

        this.load.on('progress', (value: number) => {
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(width/4, height/2, (width/2) * value, 50);
        });

        this.load.on('complete', () => {
        console.log('All assets loaded!');
        // this.scene.start('GameScene');
        });
    }

    create(): void {
        this.scene.start('GameScene');
    }
}
