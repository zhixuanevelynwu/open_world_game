/* ------ CONTROL ------ */
function mousePressed() {
  console.log(mouseX, mouseY);
  if (!started) {
    started = true;
  } else {
    for (let i = 0; i < allItem.length; i++) {
      if (allItem[i].selected) {
        if (mouseX >= 563 && mouseX <= 688 && mouseY >= 390 && mouseY <= 425) {
          allItem[i].selected = false;
        } else if (
          scene0 &&
          mouseX >= 313 &&
          mouseX <= 436 &&
          mouseY >= 390 &&
          mouseY <= 425
        ) {
          if (allItem[i].canBuild()) {
            craftItem(i);
            allItem[i].selected = false;
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (started) {
    console.log(keyCode);
    if (keyIsDown(32)) {
      hero.jump();
    }

    let attacking = false;
    // press K to attack & interact with things
    if (keyIsDown(75)) {
      if (scene0) {
        if (theOldTree.collide()) {
          revive();
          theOldTree.makeAWish = true;
        }
      }

      for (let i = 0; i < slimes.length; i++) {
        if (slimes[i].collide()) {
          slimes[i].hlth -= hero.attack;
          attacking = true;
        }
      }

      if (!attacking) {
        for (let i = 0; i < woods.treeList.length; i++) {
          if (woods.treeList[i].collide()) {
            woods.treeList[i].cut();
            break;
          }
        }
      }
    }

    // press enter to move an item
    if (keyIsDown(13)) {
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].collide(hero) && itemList[i].pickedUp == false) {
          itemList[i].y -= itemList[i].pickUp;
          itemList[i].pickedUp = true;
          craft_sd.play();
          break;
        } else if (itemList[i].pickedUp == true) {
          let p = red(shelter[1].get(itemList[i].x, itemList[i].y));
          if (p == 255 && !hero.jumpMode) {
            itemList[i].y = hero.y + itemList[i].putDown;
            itemList[i].pickedUp = false;
            window.localStorage.setItem("itemList", storeItems());
            putdown_sd.play();
          }
        }
      }
    }
  }
}
