export class AssetManager {
  static parseKey(key: string) {
    const [atlas, frame] = key.split('.');
    return { atlas, frame };
  }

  static addImage(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string
  ): Phaser.GameObjects.Image {
    const { atlas, frame } = this.parseKey(key);

    return scene.add.image(x, y, atlas, frame);
  }
}
