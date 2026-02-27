import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.createAll();
  }

  createAll() {
    this.createAnims();
    this.createBg();
    this.createBtns();
    this.createPrizeSprites();
    this.youWinSprite = this.add
      .sprite(this.width / 2, this.height / 2, "youWin")
      .setVisible(false)
      .setDepth(10);
    // this.winAnimation();

    this.currentElectro = this.add
      .sprite(this.width / 2, this.height * 0.66, "electro1")
      .setAlpha(0)
      .setOrigin(0.5, 1)
      .setScale(1);
    // .play("greenElectro");

    this.lightEffects();

    this.isPlaying = false;
    this.buttonRedPressed = false;
    this.buttonBluePressed = false;
    this.buttonGreenPressed = false;
    this.prize1 = 0;
    this.prize2 = 0;
    this.prize3 = 0;
  }

  createPrizeSprites() {
    this.prizeSprite1 = this.add
      .sprite(this.width * -0.11, this.height / 2, "backupPower")
      .setVisible(false);
    this.prizeSprite2 = this.add
      .sprite(this.width * -0.11, this.height / 2, "backupPower")
      .setVisible(false);
    this.prizeSprite3 = this.add
      .sprite(this.width * -0.11, this.height / 2, "backupPower")
      .setVisible(false);
    this.prizeTween = null;
  }

  createCoins() {
    this.coinSprites = [];
    for (let i = 0; i < 30; i++) {
      let coin = this.add
        .sprite(Phaser.Math.Between(0, this.width), -150, "coins")
        .setScale(0.2)
        .setDepth(6);
      this.coinSprites.push(coin);
    }
  }

  lightEffects() {
    this.lightBg = this.add
      .image(this.width / 2, this.height / 2, "blink")
      .setAlpha(0.1)
      .setDepth(5);
    this.lightBg2 = this.add
      .image(this.width / 2, this.height / 2, "blink")
      .setAlpha(0)
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
    this.bg = this.add
      .sprite(this.width / 2, this.height / 2, "bg1")
      .play("bgAnim");
    this.bg.setDisplaySize(this.width, this.height);
    this.bgUpper = this.add
      .sprite(this.width / 2, this.height / 2, "bg11")
      .setDepth(2)
      .play("bgUpperAnim");
    this.bgUpper.setDisplaySize(this.width, this.height);
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
      if (!this.isPlaying && !this.buttonRedPressed) {
        this.buttonRedPressed = true;
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
      if (!this.isPlaying && !this.buttonBluePressed) {
        this.buttonBluePressed = true;
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
      if (!this.isPlaying && !this.buttonGreenPressed) {
        this.buttonGreenPressed = true;
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
    let colors = [1, 2, 3];
    let anims = ["red", "blue", "green"];
    let color = colors[s - 1];
    let anim = anims[s - 1];
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
    let outcomes = ["noWin", "win500", "backupPower"];
    let outcome = Phaser.Utils.Array.GetRandom(outcomes);

    // Access dynamic sprite properly
    let sprite = this[`prizeSprite${color}`];

    sprite.setTexture(outcome).setVisible(true);

    this.prizeTween = this.tweens.add({
      targets: sprite, // use the correct sprite
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
      this.prizeSprite1.setX(this.width * 0.52);
    } else if (a == 2) {
      this.prizeSprite2.setX(this.width * 0.82);
    } else if (a == 3) {
      this.prizeSprite3.setX(this.width * 1.115);
    }
    this.currentElectro.setAlpha(0);
    this.time.delayedCall(2200, () => {
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
    this.lightBg2.setAlpha(0.2);
    if (a == 1) {
      this.prizeSprite1.setX(this.width * 0.205);
      this.prize1 = 1;
    } else if (a == 2) {
      this.prizeSprite2.setX(this.width * 0.5);
      this.prize2 = 1;
    } else if (a == 3) {
      this.prizeSprite3.setX(this.width * 0.8);
      this.prize3 = 1;
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
            this.lightBg2.setAlpha(0.1);
          });
        },
      });
    });
  }
  backupPower(a) {
    this.lightBg2.setAlpha(0.2);

    if (a == 1) {
      this.prizeSprite1.setX(this.width * -0.11);
    } else if (a == 2) {
      this.prizeSprite2.setX(this.width * 0.19);
    } else if (a == 3) {
      this.prizeSprite3.setX(this.width * 0.485);
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
          this.time.delayedCall(2010, () => {
            if (a == 1) {
              this.tweens.add({
                targets: this.redBtnImg,
                y: this.redBtnH,
                duration: 100,
                yoyo: false,
                onComplete: () => {
                  this.buttonRedPressed = false;

                  this.prizeSprite1.destroy();
                  this.prizeSprite1 = this.add
                    .sprite(this.width * -0.11, this.height / 2, "backupPower")
                    .setVisible(false);
                },
              });
            }
            if (a == 2) {
              this.tweens.add({
                targets: this.blueBtnImg,
                y: this.blueBtnH,
                duration: 100,
                yoyo: false,
                onComplete: () => {
                  this.buttonBluePressed = false;
                  this.prizeSprite2.destroy();
                  this.prizeSprite2 = this.add
                    .sprite(this.width * -0.11, this.height / 2, "backupPower")
                    .setVisible(false);
                },
              });
            }
            if (a == 3) {
              this.tweens.add({
                targets: this.greenBtnImg,
                y: this.greenBtnH,
                duration: 100,
                yoyo: false,
                onComplete: () => {
                  this.buttonGreenPressed = false;
                  this.prizeSprite3.destroy();
                  this.prizeSprite3 = this.add
                    .sprite(this.width * -0.11, this.height / 2, "backupPower")
                    .setVisible(false);
                },
              });
            }

            let sprite = this[`prizeSprite${a}`];
            this.resetGame(a);
          });
        },
      });
    });
  }

  resetGame(a) {
    this.time.delayedCall(600, () => {
      if (
        this.buttonRedPressed &&
        this.buttonBluePressed &&
        this.buttonGreenPressed
      ) {
        this.time.delayedCall(1200, () => {
          if (this.prizeTween) {
            this.prizeTween.stop();
            this.prizeTween = null;
          }
          this.time.delayedCall(1000, () => {
            if (this.prize1 && this.prize2 && this.prize3) {
              this.winAnimation();
            } else {
              this.time.delayedCall(1000, () => {
                this.resetPlay();
              });
            }
          });
        });
      } else {
        if (this.prizeTween) {
          this.prizeTween.stop();
          this.prizeTween = null;
        }
        this.lightBg2.setAlpha(0);
        this.isPlaying = false;
        this.currentElectro.setAlpha(0).setScale(0.5);
      }
    });
  }

  winAnimation() {
    this.winBg = this.add
      .rectangle(
        this.width / 2,
        this.height / 2,
        this.width * 1.2,
        this.height * 1.2,
        "#ffffff",
      )
      .setDepth(5)
      .setAlpha(0);
    this.lightBg3 = this.add
      .image(this.width / 2, this.height / 2, "blink")
      .setAlpha(0)
      .setDepth(7);
    this.createCoins();
    this.youWinSprite.setVisible(true);
    this.youWinSprite.setAlpha(0);
    this.youWinSprite.setScale(0.5);

    this.tweens.add({
      targets: [this.youWinSprite, this.winBg],
      alpha: 1,
      scale: 0.9,
      duration: 500,
    });

    this.tweens.add({
      targets: this.lightBg3,
      alpha: 0.9,
      duration: 500,
    });

    // Shaking effect

    this.tweens.add({
      targets: this.youWinSprite,
      y: this.height / 2 + 5,
      duration: 500,
      scale: { from: 0.9, to: 0.88 },
      yoyo: true,
      repeat: -1,
      ease: "Linear",
    });

    // Animate coins falling
    this.coinSprites.forEach((coin, index) => {
      this.tweens.add({
        targets: coin,
        y: this.height + 150,
        x: coin.x + Phaser.Math.Between(-500, 500), // horizontal spread
        duration: 3000,
        scale: { from: 0.3, to: 0.5 },
        delay: index * 100,
        ease: "Linear",
        onComplete: () => {
          coin.destroy();
        },
      });
    });

    this.time.delayedCall(5000, () => {
      this.lightBg3.setVisible(false);
      this.tweens.killTweensOf(this.youWinSprite);
      this.tweens.add({
        targets: [this.youWinSprite, this.winBg],
        alpha: 0,
        duration: 300,
        onComplete: () => {
          this.lightBg3.setVisible(false);
          this.tweens.killTweensOf(this.youWinSprite);
          this.resetPlay();
          this.youWinSprite.setVisible(false);
        },
      });
    });
  }

  resetPlay() {
    this.isPlaying = false;
    this.buttonRedPressed = false;
    this.buttonBluePressed = false;
    this.buttonGreenPressed = false;
    this.tweens.add({
      targets: this.redBtnImg,
      y: this.redBtnH - 10,
      duration: 100,
      yoyo: false,
    });
    this.tweens.add({
      targets: this.blueBtnImg,
      y: this.blueBtnH - 10,
      duration: 100,
      yoyo: false,
    });
    this.tweens.add({
      targets: this.greenBtnImg,
      y: this.greenBtnH - 10,
      duration: 100,
      yoyo: false,
    });
    this.prize1 = 0;
    this.prize2 = 0;
    this.prize3 = 0;
    this.prizeSprite1.destroy();
    this.prizeSprite2.destroy();
    this.prizeSprite3.destroy();
    this.prizeTween = null;
    this.createPrizeSprites();
  }
}
