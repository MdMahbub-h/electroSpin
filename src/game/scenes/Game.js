import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.createAnims();
    this.createBg();
    this.createBtns();

    this.currentElectro = this.add
      .sprite(this.width / 2, this.height * 0.66, "electro1")
      .setAlpha(0)
      .setOrigin(0.5, 1)
      .setScale(1);
    // .play("greenElectro");

    this.prizeSprite = this.add
      .sprite(this.width * -0.11, this.height / 2, "backupPower")
      .setVisible(false);
    this.prizeTween = null;

    this.lightEffects();

    this.isPlaying = false;
  }

  lightEffects() {
    this.lightBg = this.add
      .image(this.width / 2, this.height / 2, "blink")
      .setAlpha(0.05)
      .setDepth(5);
    this.lightOverlay = this.add
      .rectangle(
        this.width / 2,
        this.height / 2,
        this.width,
        this.height,
        0xffffff,
      )
      .setAlpha(0)
      .setOrigin(0.5, 0.5)
      .setDepth(5);
    this.time.addEvent({
      delay: 30000,
      callback: () => {
        for (let i = 0; i < 3; i++) {
          this.time.delayedCall(i * 200, () => {
            this.tweens.add({
              targets: [this.lightOverlay],
              alpha: 0.1,
              duration: 100,
              yoyo: true,
              ease: "Linear",
            });
          });
        }
      },
      loop: true,
    });
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        for (let i = 0; i < 3; i++) {
          this.time.delayedCall(i * 200, () => {
            this.tweens.add({
              targets: [this.lightBg],
              alpha: 0.15,
              duration: 100,
              yoyo: true,
              ease: "Linear",
            });
          });
        }
      },
      loop: true,
    });
  }

  createAnims() {
    let frameRate = 6;

    this.anims.create({
      key: "bgAnim",
      frames: [{ key: "bg1" }, { key: "bg2" }, { key: "bg3" }],
      frameRate: 2,
      repeat: -1,
    });
    this.anims.create({
      key: "bgUpperAnim",
      frames: [{ key: "bg11" }, { key: "bg21" }, { key: "bg31" }],
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
    this.anims.create({
      key: "redElectro",
      frames: [{ key: "redElectro1" }, { key: "redElectro2" }],
      frameRate: frameRate,
      repeat: -1,
    });
    this.anims.create({
      key: "blueElectro",
      frames: [{ key: "blueElectro1" }, { key: "blueElectro2" }],
      frameRate: frameRate,
      repeat: -1,
    });
    this.anims.create({
      key: "greenElectro",
      frames: [{ key: "greenElectro1" }, { key: "greenElectro2" }],
      frameRate: frameRate,
      repeat: -1,
    });
  }

  createBg() {
    const bg = this.add
      .sprite(this.width / 2, this.height / 2, "bg1")
      .play("bgAnim");
    bg.setDisplaySize(this.width, this.height);
    const bgUpper = this.add
      .sprite(this.width / 2, this.height / 2, "bg11")
      .setDepth(2)
      .play("bgUpperAnim");
    bgUpper.setDisplaySize(this.width, this.height);
  }
  createBtns() {
    this.redBtnH = 760;
    this.blueBtnH = 768;
    this.greenBtnH = 767;
    this.redBtnImg = this.add.sprite(this.width / 2, this.redBtnH, "redBtn");
    this.blueBtnImg = this.add.sprite(this.width / 2, this.blueBtnH, "blueBtn");
    this.greenBtnImg = this.add.sprite(
      this.width / 2,
      this.greenBtnH,
      "greenBtn",
    );

    this.redBtn = this.physics.add
      .sprite(this.width * 0.2, this.redBtnH + 330, "redBtn")
      .setScale(0.15, 0.06)
      .setDepth(-1)
      .setInteractive();
    this.blueBtn = this.physics.add
      .sprite(this.width * 0.5, this.blueBtnH + 320, "redBtn")
      .setScale(0.15, 0.06)
      .setDepth(-1)
      .setInteractive();
    this.greenBtn = this.physics.add
      .sprite(this.width * 0.8, this.greenBtnH + 320, "redBtn")
      .setScale(0.15, 0.06)
      .setDepth(-1)
      .setInteractive();

    this.redBtn.on("pointerover", () => this.input.setDefaultCursor("pointer"));
    this.redBtn.on("pointerout", () => this.input.setDefaultCursor("default"));
    this.blueBtn.on("pointerover", () =>
      this.input.setDefaultCursor("pointer"),
    );
    this.blueBtn.on("pointerout", () => this.input.setDefaultCursor("default"));
    this.greenBtn.on("pointerover", () =>
      this.input.setDefaultCursor("pointer"),
    );
    this.greenBtn.on("pointerout", () =>
      this.input.setDefaultCursor("default"),
    );

    this.redBtn.on("pointerdown", () => {
      if (!this.isPlaying) {
        this.tweens.add({
          targets: this.redBtnImg,
          y: this.redBtnH + 10,
          duration: 100,
          yoyo: false,
          onComplete: () => this.startGame(1),
        });
      }
    });
    this.blueBtn.on("pointerdown", () => {
      if (!this.isPlaying) {
        this.tweens.add({
          targets: this.blueBtnImg,
          y: this.blueBtnH + 10,
          duration: 100,
          yoyo: false,
          onComplete: () => this.startGame(2),
        });
      }
    });
    this.greenBtn.on("pointerdown", () => {
      if (!this.isPlaying) {
        this.tweens.add({
          targets: this.greenBtnImg,
          y: this.greenBtnH + 10,
          duration: 100,
          yoyo: false,
          onComplete: () => this.startGame(3),
        });
      }
    });
  }

  startGame(s) {
    if (this.isPlaying) return;

    this.isPlaying = true;
    const colors = [1, 2, 3];
    let anims = ["red", "blue", "green"];
    const color = colors[s - 1];
    const anim = anims[s - 1];
    this.currentElectro.setScale(1, 0.3);
    this.currentElectro.setAlpha(0.5);
    this.anims.play(anim + "Electro", this.currentElectro);
    this.tweens.add({
      targets: this.currentElectro,
      scaleY: 0.6,
      alpha: 1,
      duration: 200,
      ease: "Linear",
    });
    this.tweens.add({
      targets: this.currentElectro,
      scaleY: 1,
      alpha: 1,
      duration: 2000,
      ease: "Linear",
    });
    this.time.delayedCall(2000, () => this.resolveGame(color));
  }

  resolveGame(color) {
    const outcomes = ["noWin", "win500", "backupPower"];
    const outcome = Phaser.Utils.Array.GetRandom(outcomes);
    this.prizeSprite.setTexture(outcome).setVisible(true);
    this.prizeTween = this.tweens.add({
      targets: this.prizeSprite,
      alpha: 0,
      duration: 300,
      yoyo: true,
      repeat: -1,
    });
    if (outcome === "noWin") {
      this.noWin(color);
    } else if (outcome === "win500") {
      this.win500(color);
    } else {
      this.backupPower(color);
    }
  }

  noWin(a) {
    if (a == 1) {
      this.prizeSprite.setX(this.width * 0.52);
    } else if (a == 2) {
      this.prizeSprite.setX(this.width * 0.82);
    } else if (a == 3) {
      this.prizeSprite.setX(this.width * 1.115);
    }
    this.currentElectro.setAlpha(0);
    this.time.delayedCall(2000, () => {
      this.tweens.add({
        targets: this.currentElectro,
        scaleY: 0.1,
        alpha: 0,
        duration: 10,
        ease: "Linear",
        onComplete: () => {
          this.time.delayedCall(2000, () => {
            this.resetGame(a);
          });
        },
      });
    });
  }
  win500(a) {
    if (a == 1) {
      this.prizeSprite.setX(this.width * 0.205);
    } else if (a == 2) {
      this.prizeSprite.setX(this.width * 0.5);
    } else if (a == 3) {
      this.prizeSprite.setX(this.width * 0.8);
    }
    this.currentElectro.setAlpha(1);

    this.time.delayedCall(2500, () => {
      this.tweens.add({
        targets: this.currentElectro,
        scaleY: 0.1,
        alpha: 0,
        duration: 300,
        ease: "Linear",
        onComplete: () => {
          this.time.delayedCall(2000, () => {
            this.resetGame(a);
          });
        },
      });
    });
  }
  backupPower(a) {
    if (a == 1) {
      this.prizeSprite.setX(this.width * -0.11);
    } else if (a == 2) {
      this.prizeSprite.setX(this.width * 0.19);
    } else if (a == 3) {
      this.prizeSprite.setX(this.width * 0.485);
    }
    this.currentElectro.setAlpha(1);
    this.time.delayedCall(2500, () => {
      this.tweens.add({
        targets: this.currentElectro,
        scaleY: 0.1,
        alpha: 0,
        duration: 300,
        ease: "Linear",
        onComplete: () => {
          this.time.delayedCall(2000, () => {
            this.resetGame(a);
          });
        },
      });
    });
  }

  resetGame(a) {
    if (this.prizeTween) {
      this.prizeTween.stop();
      this.prizeTween = null;
    }
    this.prizeSprite.setVisible(false).setAlpha(1);
    this.isPlaying = false;
    this.currentElectro.setAlpha(0).setScale(0.5);

    if (a == 1) {
      this.tweens.add({
        targets: this.redBtnImg,
        y: this.redBtnH - 10,
        duration: 100,
        yoyo: false,
      });
    }
    if (a == 2) {
      this.tweens.add({
        targets: this.blueBtnImg,
        y: this.blueBtnH - 10,
        duration: 100,
        yoyo: false,
      });
    }
    if (a == 3) {
      this.tweens.add({
        targets: this.greenBtnImg,
        y: this.greenBtnH - 10,
        duration: 100,
        yoyo: false,
      });
    }
  }
}
