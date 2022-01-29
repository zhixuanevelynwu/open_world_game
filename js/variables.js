let started = false;

// images
let shelter, tree, ball, items, skySprites, floor, mountain, monster;

// sound
let craft_sd, atk_sd, revive_sd, putdown_sd, bgm, radio_sd;
let bgmLooping = false,
  haveRadio = false,
  radioPlaying = false;

// elements
let hero, sky, ground, forest, trees, theOldTree, hill;

let allItems;

// items & materials the player currently have
let itemList = [],
  materialList = [];

// movement control
const gravity = 3,
  spd = 5,
  sceneWidth = 1000;

// CK: added constants for jumping
const JUMP_POWER = -30;
const FALL_MAX_SPEED = 15;

// Perlin Noise
let noiseLocation = 0;

// font
let myFont;

// conversation and item list display
let info;

// scene
let home, woods;

// scene control
let scene0 = true,
  scene1 = false;

// slime
let slimes;
