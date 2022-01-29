class Item {
  constructor(name, x, y, sprite) {
    this.name = name;
    this.requiredMaterials = [0, 0, 0, 0, 0]; // wood iron glass fabric plastic
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.sprite = sprite;
    this.w = this.sprite.width;
    this.h = this.sprite.height;
    this.active = false;
    this.pickedUp = false;
    this.avatar_w = 50;
    this.avatar_h = 50;
    this.avatar_o = 10;
    this.pickUp = 20;
    this.putDown = -8;
    this.selected = false;
  }

  canBuild() {
    for (let i = 0; i < this.requiredMaterials.length; i++) {
      if (this.requiredMaterials[i] > materialList[i].quantity) {
        return false;
      }
    }
    return true;
  }

  build() {
    for (let i = 0; i < this.requiredMaterials.length; i++) {
      if (this.requiredMaterials[i] > 0) {
        materialList[i].quantity -= this.requiredMaterials[i];
      }
    }
  }

  avatar(x, y) {
    let avatarWidth = 70;

    push();
    fill(150, 156, 114);

    if (!this.canBuild()) {
      fill(150, 100);
    }

    rectMode(CENTER);
    imageMode(CENTER);
    stroke(255);
    strokeWeight(5);

    // hover effect
    if (
      started &&
      mouseX >= x - avatarWidth / 2 &&
      mouseX <= x + avatarWidth / 2 &&
      mouseY <= y + avatarWidth / 2 &&
      mouseY >= y - avatarWidth / 2
    ) {
      stroke(255, 200, 100);
      fill(220, 156, 114);

      if (mouseIsPressed && this.selected == false) {
        console.log(this.name);
        this.selected = true;
      }
    }

    if (this.selected == true) {
      this.displayMaterials();
    }

    rect(x, y, avatarWidth, avatarWidth);

    this.sprite.width = this.avatar_w;
    this.sprite.height = this.avatar_h;

    image(this.sprite, x, y + this.avatar_o);

    this.sprite.width = this.w;
    this.sprite.height = this.h;

    pop();
  }

  displayMaterials() {
    push();
    noStroke();
    rectMode(CENTER);
    fill(150, 159, 112);
    stroke(255, 255, 255);
    strokeWeight(10);

    let x = sceneWidth / 2;
    let y = height / 2;
    let w = sceneWidth / 2;
    let h = height / 3;
    rect(x, y, w, h);

    noStroke();
    fill(255);
    textSize(15);
    text("Crafting a " + this.name + " requires:", 290, 275);
    let offset = 0;
    for (let i = 0; i < this.requiredMaterials.length; i++) {
      if (this.requiredMaterials[i] != 0) {
        if (this.requiredMaterials[i] > materialList[i].quantity) {
          fill(255, 150, 150);
        } else {
          fill(255);
        }
        text(
          materialList[i].name + ": " + this.requiredMaterials[i],
          290,
          315 + offset
        );
        offset += 40;
      }
    }

    // button
    fill(220);
    rect(x + w / 4, y + h / 4, w / 4, h / 6);
    fill(100);
    text("CLOSE", x + w / 4 - 35, y + h / 4 + 5);

    // canbuild?
    let b = this.canBuild();
    if (!b) {
      fill(100, 120);
    } else {
      fill(100);
    }
    rect(x + w / 4 - 250, y + h / 4, w / 4, h / 6);
    if (!b) {
      fill(220, 120);
    } else if (!scene0) {
      push();
      fill(255, 150, 150);
      textSize(12);
      text("Go back to the shelter to craft your item.", 320, 450);
      pop();
      fill(220, 120);
    } else {
      fill(220);
    }
    text("CRAFT", x + w / 4 - 35 - 250, y + h / 4 + 5);

    pop();
  }

  display() {
    fill(40, 40, 40, 100);
    if (this.pickedUp == false) {
      this.shadow();
    }
    imageMode(CENTER);
    image(this.sprite, this.x, this.y);

    if (this.active == true) {
      rectMode(CENTER);
      noFill();
      strokeWeight(3);
      stroke(255, 237, 122, 100);
      rect(this.x, this.y, this.w + 10, this.h + 10);
      rectMode(CORNER);
      noStroke();
    }

    if (this.pickedUp == true) {
      if (hero.l == true) this.x = hero.x - 30;
      else this.x = hero.x + 30;
      this.y = hero.y - this.pickUp;
    }
  }

  shadow() {
    rectMode(CENTER);
    rect(this.x, this.y + this.h / 2, this.w - 10, this.h / 3);
    rectMode(CORNER);
  }

  collide() {
    if (dist(hero.x, hero.y, this.x, this.y) <= this.w / 2 + hero.r) {
      this.active = true;
      info.conversation =
        "<Item name: " + this.name + ">\n\nPress <ENTER> to move it arround";
      return true;
    } else {
      this.active = false;
      return false;
    }
  }
}

class Table extends Item {
  constructor(x, y) {
    super("table", x, y, items[0]);
    this.requiredMaterials = [3, 0, 0, 0, 0];
  }
}

class Chair extends Item {
  constructor(x, y) {
    super("chair", x, y, items[1]);
    this.w = 50;
    this.avatar_o = 5;
    this.pickUp = 20;
    this.putDown = -3;
    this.requiredMaterials = [2, 0, 0, 0, 0];
  }
  shadow() {
    rectMode(CENTER);
    rect(this.x, this.y + this.h / 2 - 5, this.w - 10, this.h / 3);
    rectMode(CORNER);
  }
}

class Lamp extends Item {
  constructor(x, y) {
    super("lamp", x, y, items[2]);
    this.avatar_w = 30;
    this.avatar_h = 70;
    this.avatar_o = 5;
    this.pickUp = 50;
    this.putDown = -30;
    this.requiredMaterials = [0, 2, 2, 0, 0];
  }
  shadow() {
    rectMode(CENTER);
    rect(this.x, this.y + 42, this.w, 15);
    rectMode(CORNER);
  }
}

class Closet extends Item {
  constructor(x, y) {
    super("closet", x, y, items[3]);
    this.avatar_w = 40;
    this.avatar_o = 4;
    this.pickUp = 50;
    this.putDown = -35;
    this.y -= 45;
    this.requiredMaterials = [5, 0, 0, 0, 0];
  }
  shadow() {
    rectMode(CENTER);
    rect(this.x, this.y + 47, this.w, 18);
    rectMode(CORNER);
  }
}

class Statue extends Item {
  constructor(x, y) {
    super("statue", x, y, items[4]);
    this.avatar_w = 45;
    this.avatar_o = 0;
    this.pickUp = 50;
    this.putDown = -35;
    this.y -= 45;
    this.requiredMaterials = [0, 5, 0, 0, 0];
  }
  shadow() {
    rectMode(CENTER);
    rect(this.x, this.y + 47, this.w, 18);
    rectMode(CORNER);
  }
}

class Bed extends Item {
  constructor(x, y) {
    super("bed", x, y, items[5]);
    this.avatar_w = 50;
    this.avatar_o = 20;
    this.pickUp = 50;
    this.putDown = -15;
    this.requiredMaterials = [3, 0, 0, 4, 0];
  }
  shadow() {
    rectMode(CENTER);
    rect(this.x, this.y + 20, this.w, 18);
    rectMode(CORNER);
  }
}

class Vase extends Item {
  constructor(x, y) {
    super("vase", x, y, items[6]);
    this.avatar_w = 30;
    this.avatar_o = 10;
    this.pickUp = 20;
    this.putDown = -10;
    this.requiredMaterials = [0, 0, 2, 0, 0];
  }
  shadow() {
    rectMode(CENTER);
    rect(this.x, this.y + this.h / 2 - 5, this.w - 10, 20);
    rectMode(CORNER);
  }
}

class Radio extends Item {
  constructor(x, y) {
    super("radio", x, y, items[7]);
    this.avatar_w = 40;
    this.avatar_o = 10;
    this.pickUp = 20;
    this.putDown = -10;
    this.requiredMaterials = [0, 2, 0, 0, 4];
    this.radioPlaying = false;
  }
  shadow() {
    rectMode(CENTER);
    rect(this.x, this.y + this.h / 2 - 5, this.w, 25);
    rectMode(CORNER);
  }

  canBuild() {
    for (let i = 0; i < itemList.length; i++) {
      if (typeof itemList[i] === "Radio" || itemList[i] instanceof Radio) {
        haveRadio = true;
        return false;
      }
    }
    for (let i = 0; i < this.requiredMaterials.length; i++) {
      if (this.requiredMaterials[i] > materialList[i].quantity) {
        return false;
      }
    }
    return true;
  }

  //play music when collided
  collide() {
    if (dist(hero.x, hero.y, this.x, this.y) <= this.w / 2 + hero.r) {
      this.active = true;
      info.conversation =
        "<Item name: " + this.name + ">\n\nPress <ENTER> to move it arround";
      bgm.pause();
      if (!this.radioPlaying) {
        radio_sd.loop();
        this.radioPlaying = true;
      }
      return true;
    } else {
      if (this.radioPlaying && bgmLooping) {
        bgmLooping = false;
      }
      radio_sd.pause();
      this.radioPlaying = false;
      this.active = false;
      return false;
    }
  }

  displayMaterials() {
    push();
    noStroke();
    rectMode(CENTER);
    fill(150, 159, 112);
    stroke(255, 255, 255);
    strokeWeight(10);

    let x = sceneWidth / 2;
    let y = height / 2;
    let w = sceneWidth / 2;
    let h = height / 3;
    rect(x, y, w, h);

    noStroke();
    fill(255);
    textSize(15);
    text("Crafting a " + this.name + " requires:", 290, 275);
    let offset = 0;
    for (let i = 0; i < this.requiredMaterials.length; i++) {
      if (this.requiredMaterials[i] != 0) {
        if (this.requiredMaterials[i] > materialList[i].quantity) {
          fill(255, 150, 150);
        } else {
          fill(255);
        }
        text(
          materialList[i].name + ": " + this.requiredMaterials[i],
          290,
          315 + offset
        );
        offset += 40;
      }
    }

    // button
    fill(220);
    rect(x + w / 4, y + h / 4, w / 4, h / 6);
    fill(100);
    text("CLOSE", x + w / 4 - 35, y + h / 4 + 5);

    // canbuild?
    let b = this.canBuild();
    if (!b) {
      fill(100, 120);
    } else {
      fill(100);
    }
    rect(x + w / 4 - 250, y + h / 4, w / 4, h / 6);
    if (!b) {
      fill(220, 120);
    } else if (!scene0) {
      push();
      fill(255, 150, 150);
      textSize(12);
      text("Go back to the shelter to craft your item.", 320, 450);
      pop();
      fill(220, 120);
    } else {
      fill(220);
    }
    text("CRAFT", x + w / 4 - 35 - 250, y + h / 4 + 5);

    if (haveRadio) {
      push();

      fill(150, 159, 112);
      rect(431, 318, w / 2 + 39, h / 2);
      fill(255, 150, 150);
      textSize(14);
      text("You can only have 1 radio in your shelter.", 290, 283);
      pop();
    }
    pop();
  }
}
