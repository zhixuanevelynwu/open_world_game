/* ------ GAME SCENE ------ */
class SceneStatic {
  constructor(name, x, y, sprites) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.sprites = sprites;
  }

  display() {
    image(this.sprites, this.x, this.y);
  }
  collide(hero) {
    return (
      dist(hero.x, hero.y, this.x, this.y) <= this.sprites.width / 2 + hero.r
    );
  }
}

class Forest {
  constructor(nTree) {
    this.floorY = 668;
    this.exit0 = 30;
    this.exit1 = sceneWidth - 30;
    this.treeList = [];
    this.nTree = nTree;

    let treeX = 20;
    for (let i = 0; i < nTree; i++) {
      let rand = random(10);
      let offset = map(rand, 0, 10, 20, 40);
      let t = new Tree(treeX, this.floorY);
      append(this.treeList, t);
      treeX += offset + t.sprites.width / 2;
    }
  }

  display() {
    sky.display();
    //hill.display();
    let floor = new Ground(0, -32);
    floor.display();
    for (let i = 0; i < this.treeList.length; i++) {
      this.treeList[i].display();
    }
  }

  exitScene() {
    if (hero.x >= this.exit1) {
      scene0 = true;
      scene1 = false;
      hero.x = 50;
    }
  }
}

class Ground extends SceneStatic {
  constructor(x, y) {
    super("ground", x, y, floor[0]);
  }
}

class Hill extends SceneStatic {
  constructor(x, y) {
    super("hill", x, y, mountain);
  }
}

class Shelter extends SceneStatic {
  constructor(x, y) {
    super("shelter", x, y, shelter[0]);
    this.floorY = 668;
    this.hitmap = shelter[1];
    this.exit0 = 30;
  }

  collide() {
    if (hero.x > this.x + 50 && hero.y > this.y) {
      info.conversation = "<You are in the Shelter>";
      return true;
    }
    return false;
  }

  exitScene() {
    if (hero.x <= this.exit0) {
      scene0 = false;
      scene1 = true;
      hero.x = sceneWidth - 50;
    }
  }
}

class SceneDynamic {
  constructor(name, x, y, sprites) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.sprites = sprites;
    this.frame = 0;
    this.cur = 0;
  }
  display() {
    image(this.sprites[this.cur], this.x, this.y);
  }
  collide(hero) {
    return (
      dist(hero.x, hero.y, this.x, this.y) <=
      this.sprites[this.cur].width / 2 + hero.r
    );
  }
}

class Sky extends SceneDynamic {
  constructor(x, y) {
    super(
      "sky",
      x,
      y,
      loadSprite(skySprites, skySprites.width / 4, skySprites.height)
    );
  }
  display() {
    this.frame += 1;
    if (this.frame == 50) {
      this.cur = (this.cur + 1) % 4;
      this.frame = 0;
    }
    image(this.sprites[this.cur], this.x, this.y);
    if (!scene0) hill.display();

    // set up random weather condition
    let noiseValueR = noise(noiseLocation);
    let noiseValueG = noise(noiseLocation + 1000);
    let noiseValueB = noise(noiseLocation + 2000);
    let noiseValueT = noise(noiseLocation + 3000);
    let noiseR = map(noiseValueR, 0, 1, 100, 255);
    let noiseG = map(noiseValueG, 0, 1, 0, 150);
    let noiseB = map(noiseValueB, 0, 1, 0, 100);
    let noiseT = map(noiseValueT, 0, 1, 0, 100);

    // increase noise offset
    noiseLocation += 0.005;

    let weather = [noiseR, noiseG, noiseB, noiseT];

    fill(weather);
    rect(0, 0, this.sprites[0].width, this.sprites[0].height);
  }
}

class TheOldTree extends SceneDynamic {
  constructor(x, y) {
    super("The Old Tree", x, y, tree);
    this.makeAWish = false;
  }
  collide() {
    if (scene0) {
      if (dist(hero.x, hero.y, 110, 570) <= 120 + hero.r) {
        if (this.makeAWish) {
          info.conversation =
            "The Old Tree brought all creatures \nback to life...\n\nCheck the forest";
        } else {
          info.conversation = "<The Old Tree>\n\n  Press <E> to make a wish...";
        }
        return true;
      }
    }
    return false;
  }
}

class Tree extends SceneStatic {
  constructor(x, y) {
    let index = int(random(trees.length));
    super("tree", x, y - trees[index].height, trees[index]);
    this.isCut = false;
    this.maxHlth = random(50, 80);
    this.hlth = this.maxHlth;
  }
  cut() {
    if (!this.isCut) {
      this.hlth -= random(8, 15);
      this.isCut = this.hlth <= 0;
      if (this.isCut) {
        // give player some woods
        materialList[0].get();
        console.log(materialList[0].quantity);
      }
    }
  }
  display() {
    if (!this.isCut) {
      image(this.sprites, this.x, this.y);
    } else {
      let cutTree = this.sprites.get(
        0,
        (this.sprites.height / 7) * 6,
        this.sprites.width - 70,
        this.sprites.height / 7
      );
      image(cutTree, this.x, this.y + (this.sprites.height / 7) * 6);
    }
  }
  drawHlthBar() {
    let centerX = this.x + this.sprites.width / 2;
    push();
    if (!this.isCut) {
      rectMode(CENTER);
      fill(255, 255, 255);
      rect(centerX, this.y - 30, 100, 20);
      fill(176, 179, 161);
      rect(centerX, this.y - 30, (100 - 10) * (this.hlth / this.maxHlth), 10);
    }
    pop();
  }
  collide() {
    let centerX = this.x + this.sprites.width / 2;
    let centerY = this.y + this.sprites.height / 2;
    if (
      dist(hero.x, hero.y, centerX, centerY) <=
        this.sprites.width / 2 + hero.r &&
      !this.isCut
    ) {
      this.drawHlthBar();
      info.conversation = "<Tree>\n\n  Press <E> to cut it";
      return true;
    } else {
      return false;
    }
  }
}
