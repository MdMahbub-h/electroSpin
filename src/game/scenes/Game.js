import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.winText = "WIN";
    this.amount = "£500";
    this.noWinText = "NO\nWIN";
    this.backupPowerText = "BACKUP\nPOWER";
    this.freeReplay = "FREE\nREPLAY";
    this.loseText = "NO WIN\nTRY AGAIN";

    this.allPrizePositionY = this.height * 0.33;
    this.redPrizePositionX = this.width * 0.2;
    this.bluePrizePositionX = this.width * 0.5;
    this.greenPrizePositionX = this.width * 0.8;

    this.createAll();
    // this.winAnimation();
  }

  createAll() {
    this.createAnims();
    this.createBg();
    this.createBtns();
    this.createPrizeSprites();

    this.isBackupPower = false;

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
      .sprite(this.width * -0.11, this.height / 2, "")
      .setVisible(false);
    this.prizeSprite2 = this.add
      .sprite(this.width * -0.11, this.height / 2, "")
      .setVisible(false);
    this.prizeSprite3 = this.add
      .sprite(this.width * -0.11, this.height / 2, "")
      .setVisible(false);
    this.prizeTween = null;
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
    let outcomes = [this.winText, this.noWinText, this.backupPowerText];
    let results = [1, 2, 3];
    let outcome = Phaser.Utils.Array.GetRandom(results);

    console.log(outcome);
    // Access dynamic sprite properly
    let sprite = this[`prizeSprite${color}`];

    // Only set text if it's a text object (not a sprite)
    if (sprite.setText) {
      sprite.setText(outcomes[outcome]);
    }

    // Only add tween if it's a sprite (not yet replaced with container)
    if (sprite.setAlpha) {
      this.prizeTween = this.tweens.add({
        targets: sprite,
        alpha: 0,
        duration: 300,
        yoyo: true,
        repeat: -1,
      });
    }
    if (outcome === 2) {
      this.noWin(color);
    } else if (outcome === 1) {
      this.win500(color);
    } else {
      this.backupPower(color);
    }
  }
  win500(a) {
    this.lightBg2.setAlpha(0.2);

    let posX;

    if (a == 1) {
      posX = this.redPrizePositionX;
      this.prize1 = 1;
    } else if (a == 2) {
      posX = this.bluePrizePositionX;
      this.prize2 = 1;
    } else if (a == 3) {
      posX = this.greenPrizePositionX;
      this.prize3 = 1;
    }

    // Destroy old sprite if exists
    let oldSprite = this[`prizeSprite${a}`];
    if (oldSprite) oldSprite.destroy();

    // Create WIN £500 text instead of sprite
    this[`prizeSprite${a}`] = this.createWin500Text(posX);

    this.currentElectro.setAlpha(1);

    this.time.delayedCall(2500, () => {
      this.tweens.add({
        targets: this.currentElectro,
        scaleY: 0.1,
        alpha: 0,
        duration: 300,
        ease: "Linear",
        onComplete: () => {
          this.isPlaying = false;
          this.time.delayedCall(2000, () => {
            this.resetGame(a);
            this.lightBg2.setAlpha(0.1);
          });
        },
      });
    });
  }
  noWin(a) {
    this.lightBg2.setAlpha(0.1);

    let posX;

    if (a === 1) posX = this.redPrizePositionX;
    else if (a === 2) posX = this.bluePrizePositionX;
    else if (a === 3) posX = this.greenPrizePositionX;

    // Destroy old prize object
    if (this[`prizeSprite${a}`]) {
      this[`prizeSprite${a}`].destroy();
    }

    // Create NO WIN text
    this[`prizeSprite${a}`] = this.createNoWinText(posX);

    this.currentElectro.setAlpha(0);

    this.time.delayedCall(2200, () => {
      this.resetGame(a);
    });
  }
  backupPower(a) {
    this.lightBg2.setAlpha(0.2);
    this.isBackupPower = true;
    let posX;

    if (a === 1) {
      posX = this.redPrizePositionX;
    } else if (a === 2) {
      posX = this.bluePrizePositionX;
    } else if (a === 3) {
      posX = this.greenPrizePositionX;
    }

    // Destroy old prize object
    if (this[`prizeSprite${a}`]) {
      this[`prizeSprite${a}`].destroy();
    }

    // Create BACKUP POWER text
    this[`prizeSprite${a}`] = this.createBackupPowerText(posX);

    this.currentElectro.setAlpha(1);

    // Change BACKUP POWER to FREE REPLAY after 2 seconds
    this.time.delayedCall(2000, () => {
      if (this[`prizeSprite${a}`]) {
        this[`prizeSprite${a}`].destroy();
      }
      this[`prizeSprite${a}`] = this.createFreeReplayText(posX);
    });

    this.time.delayedCall(2500, () => {
      this.tweens.add({
        targets: this.currentElectro,
        scaleY: 0.1,
        alpha: 0,
        duration: 300,
        ease: "Linear",
        onComplete: () => {
          // Reset button position only (no sprite recreation needed anymore)
          if (a === 1) {
            this.buttonRedPressed = false;
            this.tweens.add({
              targets: this.redBtnImg,
              y: this.redBtnH,
              duration: 100,
              yoyo: false,
            });
          }
          if (a === 2) {
            this.buttonBluePressed = false;
            this.tweens.add({
              targets: this.blueBtnImg,
              y: this.blueBtnH,
              duration: 100,
              yoyo: false,
            });
          }
          if (a === 3) {
            this.buttonGreenPressed = false;
            this.tweens.add({
              targets: this.greenBtnImg,
              y: this.greenBtnH,
              duration: 100,
              yoyo: false,
            });
          }

          this[`prizeSprite${a}`].destroy();
          this.resetGame(a);
        },
      });
    });
  }
  resetGame(a) {
    this.time.delayedCall(600, () => {
      if (
        this.buttonRedPressed &&
        this.buttonBluePressed &&
        this.buttonGreenPressed &&
        !this.isBackupPower
      ) {
        this.time.delayedCall(1200, () => {
          if (this.prizeTween) {
            this.prizeTween.stop();
            this.prizeTween = null;
          }
          this.time.delayedCall(100, () => {
            if (this.prize1 && this.prize2 && this.prize3) {
              this.winAnimation();
            } else {
              this.loseAnimation();
            }
          });
        });
      } else {
        this.isBackupPower = false;
        this.lightBg2.setAlpha(0);
        this.isPlaying = false;
        this.currentElectro.setAlpha(0).setScale(0.5);
      }
    });
  }
  createWin500Text(x) {
    const container = this.add.container(x, this.allPrizePositionY).setDepth(6);

    const winText = this.add
      .text(0, -60, this.winText, {
        fontFamily: "Arial Black",
        fontSize: "45px",
        color: "#ffd700",
        stroke: "#ff8c00",
        strokeThickness: 8,
        align: "center",
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5);

    const amountText = this.add
      .text(0, 10, this.amount, {
        fontFamily: "Arial Black",
        fontSize: "70px",
        color: "#ffb700",
        stroke: "rgba(194, 94, 0, 0.71)",
        strokeThickness: 10,
        align: "center",
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5);
    const winShine = winText.postFX.addShine(0.5, 0.2, 5);
    const amountShine = amountText.postFX.addShine(0.5, 0.2, 5);
    winText.setShadow(0, 0, "#ff1e00", 20, true, true);
    amountText.setShadow(0, 0, "#ff1e00", 30, true, true);

    container.add([winText, amountText]);

    // Pulse animation
    this.tweens.add({
      targets: container,
      scale: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.tweens.add({
      targets: container,
      angle: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    return container;
  }

  createNoWinText(x) {
    const container = this.add
      .container(x, this.allPrizePositionY - 20)
      .setDepth(6);

    const noWinText = this.add
      .text(0, 0, this.noWinText, {
        fontFamily: "Arial Black",
        fontSize: "60px",
        color: "#ff4444",
        stroke: "#8b0000",
        strokeThickness: 8,
        align: "center",
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5);

    const noWinShine = noWinText.postFX.addShine(0.5, 0.2, 5);
    noWinText.setShadow(0, 0, "#7d0000", 30, true, true);

    container.add([noWinText]);

    // Pulse animation
    this.tweens.add({
      targets: container,
      scale: 1.05,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    return container;
  }

  createBackupPowerText(x) {
    const container = this.add
      .container(x, this.allPrizePositionY - 30)
      .setDepth(6);

    const backupText = this.add
      .text(0, -20, "BACKUP", {
        fontFamily: "Arial Black",
        fontSize: "40px",
        color: "#00bfff",
        stroke: "#006400",
        strokeThickness: 6,
        align: "center",
        padding: {
          left: 15,
          right: 15,
          top: 8,
          bottom: 8,
        },
      })
      .setOrigin(0.5);

    const powerText = this.add
      .text(0, 30, "POWER", {
        fontFamily: "Arial Black",
        fontSize: "50px",
        color: "#00ffff",
        stroke: "#008b8b",
        strokeThickness: 8,
        align: "center",
        padding: {
          left: 15,
          right: 15,
          top: 8,
          bottom: 8,
        },
      })
      .setOrigin(0.5);

    const backupShine = backupText.postFX.addShine(0.5, 0.2, 5);
    const powerShine = powerText.postFX.addShine(0.5, 0.2, 5);
    backupText.setShadow(0, 0, "#1e00e4", 25, true, true);
    powerText.setShadow(0, 0, "#000dff", 30, true, true);

    container.add([backupText, powerText]);

    // Pulse animation
    this.tweens.add({
      targets: container,
      scale: 1.1,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.tweens.add({
      targets: container,
      angle: 1.5,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    return container;
  }

  createFreeReplayText(x) {
    const container = this.add
      .container(x, this.allPrizePositionY - 30)
      .setDepth(6);

    const freeText = this.add
      .text(0, -20, "FREE", {
        fontFamily: "Arial Black",
        fontSize: "40px",
        color: "#00ff00",
        stroke: "#006400",
        strokeThickness: 6,
        align: "center",
        padding: {
          left: 15,
          right: 15,
          top: 8,
          bottom: 8,
        },
      })
      .setOrigin(0.5);

    const replayText = this.add
      .text(0, 30, "REPLAY", {
        fontFamily: "Arial Black",
        fontSize: "50px",
        color: "#00ffff",
        stroke: "#008b8b",
        strokeThickness: 8,
        align: "center",
        padding: {
          left: 15,
          right: 15,
          top: 8,
          bottom: 8,
        },
      })
      .setOrigin(0.5);

    const freeShine = freeText.postFX.addShine(0.5, 0.2, 5);
    const replayShine = replayText.postFX.addShine(0.5, 0.2, 5);
    freeText.setShadow(0, 0, "#00ff00", 25, true, true);
    replayText.setShadow(0, 0, "#000dff", 30, true, true);

    container.add([freeText, replayText]);

    // Pulse animation
    this.tweens.add({
      targets: container,
      scale: 1.1,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.tweens.add({
      targets: container,
      angle: 1.5,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    return container;
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
      .setDepth(10)
      .setAlpha(0.5);

    const winText = this.add
      .text(
        this.width / 2,
        this.height * 0.47,
        `YOU ${this.winText}\n${this.amount}`,
        {
          fontFamily: "Arial Black",
          fontSize: "135px",
          color: "#ffd700",
          stroke: "#ff8c00",
          strokeThickness: 8,
          align: "center",
          padding: {
            left: 30,
            right: 30,
            top: 20,
            bottom: 20,
          },
        },
      )
      .setDepth(11)
      .setOrigin(0.5);

    const amountText = this.add
      .text(this.width / 2, this.height * 0.53, "", {
        fontFamily: "Arial Black",
        fontSize: "150px",
        color: "#ffb700",
        stroke: "rgba(194, 94, 0, 0.71)",
        strokeThickness: 10,
        align: "center",
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
      .setDepth(11)
      .setOrigin(0.5);
    const winShine = winText.postFX.addShine(0.5, 0.2, 5);
    const amountShine = amountText.postFX.addShine(0.5, 0.2, 5);
    winText.setShadow(0, 0, "#ff1e00", 60, true, true);
    amountText.setShadow(0, 0, "#ff1e00", 70, true, true);

    this.lightBg3 = this.add
      .image(this.width / 2, this.height / 2, "blink")
      .setAlpha(0)
      .setDepth(11);
    this.createCoins();

    this.tweens.add({
      targets: [winText, amountText],
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
      targets: [winText, amountText],
      duration: 500,
      scale: { from: 1.2, to: 0.88 },
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
        duration: 2500,
        scale: { from: 0.2, to: 0.4 },
        delay: index * 60,
        ease: "Linear",
        onComplete: () => {
          coin.destroy();
        },
      });
    });

    this.time.delayedCall(5000, () => {
      this.lightBg3.setVisible(false);
      this.tweens.killTweensOf(winText);
      this.tweens.add({
        targets: [winText, amountText, this.winBg],
        alpha: 0,
        duration: 300,
        onComplete: () => {
          this.lightBg3.setVisible(false);
          this.tweens.killTweensOf(winText);
          this.tweens.killTweensOf(amountText);
          winText.destroy();
          amountText.destroy();
          this.resetPlay();
        },
      });
    });
  }

  createCoins() {
    this.coinSprites = [];
    for (let i = 0; i < 50; i++) {
      let coin = this.add
        .sprite(Phaser.Math.Between(0, this.width), -150, "coins")
        .setScale(0.15)
        .setDepth(10);
      this.coinSprites.push(coin);
    }
  }

  loseAnimation() {
    this.winBg = this.add
      .rectangle(
        this.width / 2,
        this.height / 2,
        this.width * 1.2,
        this.height * 1.2,
        "#ffffff",
      )
      .setDepth(10)
      .setAlpha(0.5);

    const winText = this.add
      .text(this.width / 2, this.height * 0.47, `${this.loseText}`, {
        fontFamily: "Arial Black",
        fontSize: "100px",
        color: "#ffd700",
        stroke: "#ff8c00",
        strokeThickness: 8,
        align: "center",
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
      .setDepth(11)
      .setOrigin(0.5);

    const amountText = this.add
      .text(this.width / 2, this.height * 0.53, "", {
        fontFamily: "Arial Black",
        fontSize: "150px",
        color: "#ffb700",
        stroke: "rgba(194, 94, 0, 0.71)",
        strokeThickness: 10,
        align: "center",
        padding: {
          left: 20,
          right: 20,
          top: 10,
          bottom: 10,
        },
      })
      .setDepth(11)
      .setOrigin(0.5);
    const winShine = winText.postFX.addShine(0.5, 0.2, 5);
    const amountShine = amountText.postFX.addShine(0.5, 0.2, 5);
    winText.setShadow(0, 0, "#ff1e00", 40, true, true);
    amountText.setShadow(0, 0, "#ff1e00", 50, true, true);

    this.lightBg3 = this.add
      .image(this.width / 2, this.height / 2, "blink")
      .setAlpha(0)
      .setDepth(11);

    this.tweens.add({
      targets: [winText, amountText],
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
      targets: [winText, amountText],
      duration: 500,
      scale: { from: 1.2, to: 0.88 },
      yoyo: true,
      repeat: -1,
      ease: "Linear",
    });

    this.time.delayedCall(3000, () => {
      this.lightBg3.setVisible(false);
      this.tweens.killTweensOf(winText);
      this.tweens.add({
        targets: [winText, amountText, this.winBg],
        alpha: 0,
        duration: 300,
        onComplete: () => {
          this.lightBg3.setVisible(false);
          this.tweens.killTweensOf(winText);
          this.tweens.killTweensOf(amountText);
          winText.destroy();
          amountText.destroy();
          this.resetPlay();
        },
      });
    });
  }

  resetPlay() {
    this.isBackupPower = false;
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
