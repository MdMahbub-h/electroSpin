import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // Boot scene can preload small assets if needed, but for now, just start Preload
  }

  create() {
    this.scene.start("Preload");
  }
}
