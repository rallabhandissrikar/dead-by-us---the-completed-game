function bulletTransponder() {

  //player1
  if (playerIs === 1) {
    if (keyDown("SPACE")) {
      database.ref("gameonly/players/player1").update({
        trigger: 1
      })
    } else {
      database.ref("gameonly/players/player1").update({
        trigger: 0
      })
    }
  }

  //player2
  if (playerIs === 2) {
    if (keyDown("SPACE")) {
      database.ref("gameonly/players/player2").update({
        trigger: 1
      })
    } else {
      database.ref("gameonly/players/player2").update({
        trigger: 0
      })
    }
  }

}


function bulletRelease() {
  //player1bullets
  if (trigger1 === 1) {
    if (player1Direction === "up") {
      var bul = new Bullet();
      bul.x = player1.position.x;
      bul.y = player1.position.y;
      bul.velocity.y = -10
      bullets1.add(bul);
    }else if (player1Direction === "down") {
      var bul = new Bullet();
      bul.position.x = player1.position.x;
      bul.position.y = player1.position.y;
      bul.velocity.y = +10;
      bullets1.add(bul);
    }else if (player1Direction === "left") {
      var bul = new Bullet();
      bul.position.x = player1.position.x;
      bul.position.y = player1.position.y;
      bul.velocity.x = -10;
      bullets1.add(bul);
    }else if (player1Direction === "right") {
      var bul = new Bullet();
      bul.position.x = player1.position.x;
      bul.position.y = player1.position.y;
      bul.velocity.x = +10;
      bullets1.add(bul);
    }


  }

  if (trigger2 === 1) {

    if (player2Direction === "up") {
      var bul = new Bullet();
      bul.x = player2.position.x;
      bul.y = player2.position.y;
      bul.velocity.y = -10
      bullets2.add(bul);
    }else if (player2Direction === "down") {
      var bul = new Bullet();
      bul.position.x = player2.position.x;
      bul.position.y = player2.position.y;
      bul.velocity.y = +10;
      bullets2.add(bul);
    }else if (player2Direction === "left") {
      var bul = new Bullet();
      bul.position.x = player2.position.x;
      bul.position.y = player2.position.y;
      bul.velocity.x = -10;
      bullets2.add(bul);
    }else if (player2Direction === "right") {
      var bul = new Bullet();
      bul.position.x = player2.position.x;
      bul.position.y = player2.position.y;
      bul.velocity.x = +10;
      bullets2.add(bul);
    }
  }
}

function bulletStruggle() {
  //player1----------------------------
  if (playerIs === 1) {
  for (var a = 0; a < bullets1.length; a++) {
    if (bullets1.get(a).collide(wallSet)){
      bullets1.get(a).lifetime = 0;
      bullets1.get(a).destroy();
    }
  }

  for (var a = 0; a < bullets1.length; a++) {
    if (bullets1.get(a).collide(player2)) {
      bullets1.get(a).lifetime = 0;
      bullets1.get(a).destroy();
      database.ref("gameonly/players/player2").update({
        playerlife : player2Life - 1
      })
      respawn();
    }
  }

  for (var b = 0; b < bullets2.length; b++) {
    if (bullets2.get(b).collide(wallSet)){
      bullets2.get(b).lifetime = 0;
      bullets2.get(b).destroy();
    }

  }

  for (var b = 0; b < bullets2.length; b++) {
    if (bullets2.get(b).collide(player1)){
    bullets2.get(b).lifetime = 0;
    bullets2.get(b).destroy();
  }
}

}




//player2----------------------------
if (playerIs === 2) {
  for (var b = 0; b < bullets2.length; b++) {
    if (bullets2.get(b).collide(wallSet)){
      bullets2.get(b).lifetime = 0;
      bullets2.get(b).destroy();
    }
  }

  for (var b = 0; b < bullets2.length; b++) {
    if (bullets2.get(b).collide(player1)) {
      bullets2.get(b).lifetime = 0;
      bullets2.get(b).destroy();
      database.ref("gameonly/players/player1").update({
        playerlife : player1Life - 1
      })
      respawn();
    }
  }

  for (var a = 0; a < bullets1.length; a++) {
    if (bullets1.get(a).collide(wallSet)){
      bullets1.get(a).lifetime = 0;
      bullets1.get(a).destroy();
    }
  }

  for (var a = 0; a < bullets1.length; a++) {
    if (bullets1.get(a).collide(player2)) {
      bullets1.get(a).lifetime = 0;
      bullets1.get(a).destroy();
    }
  }
}


}

function Bullet() {
  var spr = createSprite(0, 0, 2, 2);
  spr.shapeColor = "red";
  spr.lifetime = 200;
  spr.depth = 100;
  return spr;
}
