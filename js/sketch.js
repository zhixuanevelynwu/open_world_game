function draw() {
  // play bgm
  if (!bgmLooping && started) {
    bgm.loop();
    console.log("bgm");
    bgmLooping = true;
  }

  // display the shelter scene
  if (scene0) {
    displayShelterScene();
    // CK: I used this overlay the shelter hitmap
    // -- this is how I figured out the dimensions were off
    //tint(255,255,255,100);
    //image(shelter[1], 0, 0);
    //noTint();
    displayInfo();
    displayItems();
    displayItemList();
    if (started) hero.display(home.hitmap, home.floorY);
    home.exitScene();
  }
  // display forest
  else if (scene1) {
    woods.display();
    hero.display(forest[0], woods.floorY);
    displayInfo();
    displayItemList();
    displaySlimes();
    woods.exitScene();
  }

  displayMaterialList();

  if (!started) {
    push();
    rectMode(CORNER);
    fill(190, 200, 130, 150);
    rect(0, 0, width, height);
    stroke(100, 110, 90, 200);
    strokeWeight(10);
    textSize(30);
    fill(255, 230);
    text("CLICK TO START THE GAME!", width / 2 - 300, height / 2);
    pop();
  }

  drawBorder();
}
