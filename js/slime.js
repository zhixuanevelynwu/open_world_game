class Slime extends Hero {
  constructor() {
    super("slime", random(50, sceneWidth - 50), random(670, 680));
    this.xSpeed = random(0.4, 0.8);
    this.sprites = [
      loadSlime(monster[0], monster[0].width / 6, monster[0].height),
      loadSlime(monster[0], monster[0].width / 6, monster[0].height),
    ];
    this.seed = random(-10, 10);
    this.hlth = 50;
    this.attack = 2;
  }

  move() {
    let dir = this.x < hero.x + this.seed ? 1 : -1;
    this.x += this.xSpeed * dir;
  }

  drawHlthBar() {
    push();
    rectMode(CENTER);
    fill(180, 200, 100);
    rect(this.x, this.y - 20, this.hlth * 0.6, 7);
    pop();
  }

  display() {
    imageMode(CENTER);
    this.move();
    this.offset = this.l ? 0 : 1;
    this.frame += 1;
    if (this.frame == 9) {
      this.cur += 1;
      this.frame = 0;
    }
    image(this.sprites[this.offset][this.cur % 4], this.x, this.y);
    imageMode(CORNER);

    this.drawHlthBar();
  }

  collide() {
    if (dist(this.x, this.y, hero.x, hero.y) < 30) {
      return true;
    }
    return false;
  }
}
