import { Boot } from "./scenes/Boot";
import { Preload } from "./scenes/Preload";
import { Game as MainGame } from "./scenes/Game";
import { AUTO, Scale, Game } from "phaser";

let width = 1024;
let height = 1536;

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
  type: AUTO,
  width: width,
  height: height,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [Boot, Preload, MainGame],
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

export default StartGame;
