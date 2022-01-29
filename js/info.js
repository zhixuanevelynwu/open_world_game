/* ------ INFO BOARD ------ */
class Info {
  constructor() {
    this.conversation = "...";
  }

  display() {
    noStroke();
    fill(156, 171, 113);
    rect(sceneWidth, 0, width - sceneWidth, height);

    strokeWeight(8);
    stroke(255);

    fill(176, 179, 161);
    let padding = 20;
    let x0 = sceneWidth + padding;
    let y0 = padding * 2;
    let w0 = width - sceneWidth - padding * 2;
    let h0 = 180;
    rect(x0, y0, w0, h0);

    fill(176, 179, 161);
    let x1 = sceneWidth + padding;
    let y1 = padding * 2 + 225;
    let w1 = width - sceneWidth - padding * 2;
    let h1 = 180;
    rect(x1, y1, w1, h1);

    fill(132, 138, 90);
    let x2 = sceneWidth + padding;
    let y2 = padding * 2 + (height / 5) * 3 + 30;
    let w2 = width - sceneWidth - padding * 2;
    let h2 = (height / 5) * 1.2;
    rect(x2, y2, w2, h2);

    noStroke();
    fill(255);
    textSize(18);
    text("ITEMS:", x0, y0 - 10);
    text("Materials:", x1, y1 - 15);
    text("CONVERSATION:", x2, y2 - 10);
    textSize(12);

    text(this.conversation, x2 + padding, y2 + padding + 10);

    fill(156, 171, 113);
  }
}
