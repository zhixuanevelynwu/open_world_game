function setup() {
  textFont(myFont);
  bgm.setVolume(0.1);
  radio_sd.setVolume(0.1);

  // canvas
  let canvas = createCanvas(1400, 700);
  canvas.id("my-canvas");
  canvas.parent("#container");

  // draw items window
  info = new Info();
  allItem = [
    new Table(746, 650),
    new Chair(798, 655),
    new Lamp(840, 625),
    new Closet(750, 625),
    new Statue(750, 625),
    new Bed(750, 625),
    new Vase(750, 625),
    new Radio(750, 625),
  ];

  // background
  sky = new Sky(0, 0);
  home = new Shelter(sceneWidth - shelter[0].width, height - shelter[0].height);
  theOldTree = new TheOldTree(0, height - tree[0].height);
  woods = new Forest(6);
  hill = new Hill(0, 400);

  // player character
  hero = new Hero("hero1", sceneWidth / 3, 250);

  // give player items
  let strMaterial = window.localStorage.getItem("materialList");
  if (strMaterial != null) {
    s = split(trim(strMaterial), " ");
    materialList = [
      new Wood(int(s[0])),
      new Iron(int(s[1])),
      new Glass(int(s[2])),
      new Fabric(int(s[3])),
      new Plastic(int(s[4])),
    ];
  } else {
    materialList = [
      new Wood(0),
      new Iron(0),
      new Glass(0),
      new Fabric(0),
      new Plastic(0),
    ];
  }

  // monster
  let nSlime = random(3, 5);
  slimes = [];
  for (let i = 0; i < nSlime; i++) {
    append(slimes, new Slime());
  }

  // get things
  let strList = window.localStorage.getItem("itemList");
  if (strList != null) {
    // if there are items saved in the local storage
    let savedList = split(trim(strList), " ");
    for (let i = 0; i < savedList.length - 2; i += 3) {
      switch (savedList[i]) {
        case "table":
          append(
            itemList,
            new Table(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;

        case "lamp":
          append(
            itemList,
            new Lamp(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;

        case "closet":
          append(
            itemList,
            new Closet(float(savedList[i + 1]), float(savedList[i + 2]) + 45)
          );
          break;

        case "chair":
          append(
            itemList,
            new Chair(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;

        case "statue":
          append(
            itemList,
            new Statue(float(savedList[i + 1]), float(savedList[i + 2]) + 45)
          );
          break;

        case "bed":
          append(
            itemList,
            new Bed(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;
        case "vase":
          append(
            itemList,
            new Vase(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;
        case "radio":
          append(
            itemList,
            new Radio(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;
      }

      // for (let i = 0; i < itemList.length; i++) {
      //   // radio collision
      //   if (itemList[i].instanceof(Radio)) {
      //     console.log("you have a radio");
      //   }
      // }
    }
  } else {
    itemList = [new Lamp(880, 628), new Table(570, 516), new Chair(625, 521)];
  }
}
