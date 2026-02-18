import { Scene } from "phaser";

export class Preload extends Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath("assets");

    // Load all assets
    this.load.image("a", "a.png");
    this.load.image("b", "b.png");
    this.load.image("b_copy", "b - Copy.png");
    this.load.image("bg1", "bg1.png");
    this.load.image("bg2", "bg2.png");
    this.load.image("bg3", "bg3.png");
    this.load.image("electro1", "electro1.png");
    this.load.image("electro2", "electro2.png");
    this.load.image("chatgpt1", "ChatGPT Image Feb 17, 2026, 03_23_59 AM.png");
    this.load.image("chatgpt2", "ChatGPT Image Feb 19, 2026, 02_02_39 AM.png");
    this.load.image(
      "chatgpt3",
      "ChatGPT Image Feb 19, 2026, 02_12_44 AM - Copy.png",
    );

    // Loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
  }

  create() {
    this.scene.start("Game");
  }
}
