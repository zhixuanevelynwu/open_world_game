class Hero {
  constructor(name, x, y) {
    this.r = ball[0].height / 2;
    this.x = x + this.r;
    this.y = y - this.r;
    this.name = name;
    this.sprites = [
      loadSprite(ball[0], ball[0].height, ball[0].height),
      loadSprite(ball[1], ball[1].height, ball[0].height),
    ];
    this.cur = 0;
    this.offset = 0; // 0 stand_l, 1 stand_r
    this.frame = 0;
    this.l = true;
    this.jumpMode = false;
    this.jumpPower = 0;

    // sensor
    this.left = this.x - 2;
    this.right = this.x + ball[0].height + 2;
    this.up = this.y - 2;
    this.down = this.y + ball[0].height + 2;

    // data
    this.attack = 10;
    this.hlth = 100;
    this.maxHlth = 100;
  }

  drawHlth() {}

  computeSensors() {
    this.left = this.x - 16;
    this.right = this.x + 12;
    this.up = this.y - 14;
    this.down = this.y + 12;
  }

  display(hitmap) {
    imageMode(CENTER);
    this.offset = this.l ? 0 : 1;
    this.frame += 1;
    if (this.frame == 9) {
      this.cur += 1;
      this.frame = 0;
    }
    image(this.sprites[this.offset][this.cur % 4], this.x, this.y);
    imageMode(CORNER);

    // CK: I made the following changes:

    // Step 1: always pull the character down based on jumpPower
    this.y += this.jumpPower;

    // get the color below & above the character
    let colorBelow = red(hitmap.get(this.x, this.down));
    let colorAbove = red(hitmap.get(this.x, this.up));

    // if the color below is white we should fall
    if (colorBelow == 255) {
      this.jumpPower += gravity;

      // limit the falling speed (prevents us falling through
      // floors and other black pixels)
      this.jumpPower = constrain(this.jumpPower, JUMP_POWER, FALL_MAX_SPEED);
    }

    // black pixel above & jumping (we hit the ceiling)
    if (colorAbove == 0 && this.jumpPower < 0) {
      // stop upward momentum
      this.jumpPower = 0;

      // nudge us down so we aren't "stuck" in the ceiling
      // this will find the first white pixel below the ceiling
      // and move the here there
      for (let i = this.up; i < height; i++) {
        let p2 = red(hitmap.get(this.x, i));
        if (p2 == 255) {
          this.y = i + 14;
          break;
        }
      }
    }

    // black pixel below & not jumping
    if (colorBelow == 0 && this.jumpPower >= 0) {
      // stop downward momentum
      this.jumpPower = 0;

      // nudge us up so we aren't "stuck" in the floor
      // this will find the first white pixel above the floor
      // and move the here there
      for (let i = this.down; i > 0; i--) {
        let p2 = red(hitmap.get(this.x, i));
        if (p2 == 255) {
          this.y = i - 11;
          // important - we need to get out of jump mode
          // when we are on solid ground
          this.jumpMode = false;
          break;
        }
      }
    }

    /* ---------- KEY EVENTS START ---------- */
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      // get the pixel to the right of the player
      let p = red(hitmap.get(this.left, this.y));
      if (p == 255) {
        this.x -= spd;
      }
      this.l = true;
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      let p = red(hitmap.get(this.right, this.y));
      if (p == 255) {
        this.x += spd;
      }
      this.l = false;
    }
    /* ---------- KEY EVENTS END ---------- */

    this.computeSensors();
  }

  jump() {
    if (this.jumpMode == false) {
      this.jumpPower = JUMP_POWER;
      this.jumpMode = true;
    }
  }
}
