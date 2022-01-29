// the old tree calls this to revive the forest
function revive() {
  woods = new Forest(6);
  let nSlime = random(3, 5);
  slimes = [];
  for (let i = 0; i < nSlime; i++) {
    append(slimes, new Slime());
  }
  revive_sd.play();
}

// store items to the local storage
function storeItems() {
  let str = "";
  for (let i = 0; i < itemList.length; i++) {
    str += itemList[i].name + " " + itemList[i].x + " " + itemList[i].y + " ";
  }
  return str;
}

// store materials to the local storage
function storeMaterials() {
  let str = "";
  for (let i = 0; i < materialList.length; i++) {
    str += materialList[i].quantity + " ";
  }
  return str;
}

// display monsters
function displaySlimes() {
  for (let i = 0; i < slimes.length; i++) {
    if (slimes[i].hlth <= 0) {
      slimes.splice(i, 1);
      materialList[int(random(1, 5))].get();
      window.localStorage.setItem("materialList", storeMaterials());
    } else {
      slimes[i].display();
    }
  }
}

// display all items in the itemList
function displayItems() {
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].display(hero);
  }
}

// display available items on the info board
function displayItemList() {
  let xOffset = 0,
    yOffset = 0;
  for (let i = 0; i < allItem.length; i++) {
    allItem[i].avatar(1070 + xOffset, 90 + yOffset);
    xOffset += 86;
    if (i == 3) {
      yOffset += 82;
      xOffset = 0;
    }
  }
}

// display available materials
function displayMaterialList() {
  push();
  fill(70);
  let offset = 0;
  for (let i = 0; i < materialList.length; i++) {
    text(
      materialList[i].name + ": " + materialList[i].quantity + "\n",
      1050,
      300 + offset
    );
    offset += 30;
  }
  pop();
}

//display scene0
function displayShelterScene() {
  imageMode(CORNER);
  sky.display();
  theOldTree.display();
  home.display();
}

// display info board
function displayInfo() {
  if (scene0) {
    if (!home.collide() && !theOldTree.collide()) {
      info.conversation = "...";
    }
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].collide();
    }
  } else if (scene1) {
    info.conversation = "...";

    for (let i = 0; i < woods.treeList.length; i++) {
      if (woods.treeList[i].collide()) {
        break;
      }
    }
  }
  info.display();
}

function preload() {
  shelter = [
    loadImage("assets/images/shelter/building.png"),
    loadImage("assets/images/shelter/shelter_hitmap.png"),
  ];
  forest = [loadImage("assets/images/forest/forest_hitmap.png")];
  mountain = loadImage("assets/images/ground/hill.png");
  tree = [loadImage("assets/images/shelter/tree.png")];
  trees = [
    loadImage("assets/images/forest/tree0.png"),
    loadImage("assets/images/forest/tree1.png"),
    loadImage("assets/images/forest/tree2.png"),
  ];
  ball = [
    loadImage("assets/images/hero/ball_l.png"),
    loadImage("assets/images/hero/ball_r.png"),
  ];
  skySprites = loadImage("assets/images/ground/sky.png");
  items = [
    loadImage("assets/images/items/table.png"),
    loadImage("assets/images/items/chair.png"),
    loadImage("assets/images/items/lamp.png"),
    loadImage("assets/images/items/closet.png"),
    loadImage("assets/images/items/statue.png"),
    loadImage("assets/images/items/bed.png"),
    loadImage("assets/images/items/vase.png"),
    loadImage("assets/images/items/radio.png"),
  ];
  floor = [loadImage("assets/images/ground/soil.png")];

  // font
  myFont = loadFont("font/ufonts.com_01problematixbold.ttf");

  // monster
  monster = [loadImage("assets/images/slime/slimeani.png")];

  // sounds
  craft_sd = loadSound("assets/sounds/craft.wav");
  atk_sd = loadSound("assets/sounds/craft.wav");
  revive_sd = loadSound("assets/sounds/craft.wav");
  putdown_sd = loadSound("assets/sounds/craft.wav");
  bgm = loadSound("assets/sounds/bgm.mp3");
  radio_sd = loadSound("assets/sounds/radio.mp3");
}

// craft items
function craftItem(id) {
  let newItem;
  switch (id) {
    case 0:
      newItem = new Table(hero.x, hero.y - 8);
      break;
    case 1:
      newItem = new Chair(hero.x, hero.y - 3);
      break;
    case 2:
      newItem = new Lamp(hero.x, hero.y - 30);
      break;
    case 3:
      newItem = new Closet(hero.x, hero.y + 10);
      break;
    case 4:
      newItem = new Statue(hero.x, hero.y + 10);
      break;
    case 5:
      newItem = new Bed(hero.x, hero.y - 15);
      break;
    case 6:
      newItem = new Vase(hero.x, hero.y - 10);
      break;
    case 7:
      newItem = new Radio(hero.x, hero.y - 10);
      break;
  }
  append(itemList, newItem);
  newItem.build();
  craft_sd.play();
  // save things
  window.localStorage.setItem("itemList", storeItems());
  window.localStorage.setItem("materialList", storeMaterials());
}

/* ------ HELPER FUNCTIONS ------ */
function loadSprite(img, spriteWidth, spriteHeight) {
  let offset = 0;
  return [
    img.get(offset, 0, spriteWidth, spriteHeight),
    img.get(spriteWidth + offset, -2, spriteWidth, spriteHeight),
    img.get(2 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(3 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
  ];
}

function loadSlime(img, spriteWidth, spriteHeight) {
  let offset = 0;
  return [
    img.get(offset, 0, spriteWidth, spriteHeight),
    img.get(spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(2 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(3 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(4 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(5 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
  ];
}

function drawBorder() {
  push();
  rectMode(CORNER);
  noFill();
  strokeWeight(15);
  stroke(0, 0, 0);
  rect(0, 0, width, height);
  pop();
}
