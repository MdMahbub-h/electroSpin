import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    const WIDTH = this.cameras.main.width;
    const HEIGHT = this.cameras.main.height;

    // Create background animation
    this.anims.create({
      key: "background",
      frames: [{ key: "bg1" }, { key: "bg2" }, { key: "bg3" }],
      frameRate: 2,
      repeat: -1,
    });

    // Create electronics animation
    this.anims.create({
      key: "electronics",
      frames: [{ key: "electro1" }, { key: "electro2" }],
      frameRate: 4,
      repeat: -1,
    });

    // Add animated background
    const bg = this.add.sprite(WIDTH / 2, HEIGHT / 2, "bg1").play("background");
    bg.setDisplaySize(WIDTH, HEIGHT);

    // Add animated electronics
    const electro = this.add
      .sprite(WIDTH / 2, HEIGHT / 2, "electro1")
      .play("electronics");
    // electro.setScale(0.5);

    // Add text
  }
}
