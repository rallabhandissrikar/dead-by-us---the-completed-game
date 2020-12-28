function PlayerMove() {
var a1;
var b1;
var a2;
var b2;
  database.ref("gameonly/players/player1/playerkills").on("value", (data) => {
    a1 = data.val();
  })

  database.ref("gameonly/players/player2/playerkills").on("value", (data) => {
    b1 = data.val();
  })

  database.ref("gameonly/players/player1/playerdeaths").on("value", (data) => {
    a2 = data.val();
  })

  database.ref("gameonly/players/player2/playerdeaths").on("value", (data) => {
    b2 = data.val();
  })



  if (playerIs === 2) {
    elmKills.show();
    elmKills.html("Your Kills : " + b1);
    elmKills.position(100, 100);

	elmDeaths.show();
	elmDeaths.html("Your Deaths : " + b2);
	elmDeaths.position(100, 200);
	elmDeaths.style("color : red");

  elmKillsEnm.show();
  elmKillsEnm.html("Opponent Kills : " + a1);
  elmKillsEnm.position(100, 300);

  elmDeathsEnm.show();
  elmDeathsEnm.html("Opponent Deaths : " + a2);
  elmDeathsEnm.position(100, 400);
  elmDeathsEnm.style("color : red");

    player2.depth = 10;
    player1.depth = 9;
    camera.zoom = 6;
    camera.position.x = player2.position.x;
    camera.position.y = player2.position.y;
    lifebar.position.x = player2.position.x
    lifebar.position.y = player2.position.y - 15;
    lifebar.width = player2Life;
    lifebar.height = 1;
    lifebar.shapeColor = "red";
    if (player2Life > 50) {
      lifebar.shapeColor = "green";
    } else if (player2Life < 50) {
      lifebar.shapeColor = "red";
    }


    lifebar2.position.x = player1.position.x;
    lifebar2.position.y = player1.position.y - 15;
    lifebar2.width = player1Life;
    lifebar2.height = 1;
    lifebar2.shapeColor = "red"
    if (player1Life > 50) {
      lifebar2.shapeColor = "green";
    } else if (player1Life < 50) {
      lifebar2.shapeColor = "red";
    }

    if (player1Direction === "up") {
      player1.addImage(pl1ImgU);
    } else if (player1Direction === "down") {
      player1.addImage(pl1ImgD);
    } else if (player1Direction === "left") {
      player1.addImage(pl1ImgL);
    } else if (player1Direction === "right") {
      player1.addImage(pl1ImgR);
    }

    if (player2Life > 100) {
      database.ref("gameonly/players/player2").update({
        playerlife : 100
      });
    }

    if (trigger1 !== 1 && player2Life < 100) {
      if (frameCount % 50 == 0) {
        //console.log("poooooooo")
        database.ref("/gameonly/players/player2").update({
          playerlife : player2Life + 5
        })
      }
    }
  }






  if (playerIs === 1) {
    elmKills.show();
    elmKills.html("Your Kills : " + a1);
    elmKills.position(100, 100);

	elmDeaths.show();
	elmDeaths.html("Your Deaths : " + a2);
	elmDeaths.position(100, 200);
	elmDeaths.style("color : red");

  elmKillsEnm.show();
  elmKillsEnm.html("Opponent Kills : " + b1);
  elmKillsEnm.position(100, 300);

  elmDeathsEnm.show();
  elmDeathsEnm.html("Opponent Deaths : " + b2);
  elmDeathsEnm.position(100, 400);
  elmDeathsEnm.style("color : red");

    player1.depth = 10;
    player2.depth = 9;
    camera.zoom = 6;
    camera.position.x = player1.position.x;
    camera.position.y = player1.position.y;
    lifebar.position.x = player1.position.x;
    lifebar.position.y = player1.position.y - 15;
    lifebar.width = player1Life;
    lifebar.height = 1;
    if (player1Life > 50) {
      lifebar.shapeColor = "green";
    } else if (player1Life < 50) {
      lifebar.shapeColor = "red";
    }
    lifebar2.position.x = player2.position.x;
    lifebar2.position.y = player2.position.y - 15;
    lifebar2.width = player2Life;
    lifebar2.height = 1;
    lifebar2.shapeColor = "red"
    if (player2Life > 50) {
      lifebar2.shapeColor = "green";
    } else if (player2Life < 50) {
      lifebar2.shapeColor = "red";
    }

    if (player2Direction === "up") {
      player2.addImage(pl2ImgU);
    } else if (player2Direction === "down") {
      player2.addImage(pl2ImgD);
    } else if (player2Direction === "left") {
      player2.addImage(pl2ImgL);
    } else if (player2Direction === "right") {
      player2.addImage(pl2ImgR);
    }

    if (player1Life > 100) {
      database.ref("gameonly/players/player1").update({
        playerlife : 100
      });
    }

    if (trigger2 !== 1 && player1Life < 100) {
      if (frameCount % 50 == 0) {
        //console.log("poooooooo")
        database.ref("/gameonly/players/player1").update({
          playerlife : player1Life + 5
        })
      }
    }
  }



  if (playerIs === 1) {
    if (player1Direction === "up") {
      player1.addImage(pl1ImgU);
    } else if (player1Direction === "down") {
      player1.addImage(pl1ImgD);
    } else if (player1Direction === "left") {
      player1.addImage(pl1ImgL);
    } else if (player1Direction === "right") {
      player1.addImage(pl1ImgR);
    }







    if (keyDown("UP_ARROW") && lb === false && rb === false && db === false) {
      ub = true;
      player1.collide(player2);
      player1.collide(wallSet);
      wallSet.collide(player1);
      player2.collide(player1);
      database.ref("gameonly/players/player1/").update({
        playerY: player1.position.y - 10,
        playerDirection: "up"
      })
    } else {
      ub = false;
    }

    if (keyDown("DOWN_ARROW") && lb === false && rb === false && ub === false) {
      db = true;
      player1.collide(player2);
      player1.collide(wallSet);
      wallSet.collide(player1);
      player2.collide(player1);
      database.ref("gameonly/players/player1/").update({
        playerY: player1.position.y + 10,
        playerDirection: "down"
      })

    } else {
      db = false;
    }

    if (keyDown("LEFT_ARROW") && ub === false && rb === false && db === false) {
      lb = true;
      player1.collide(player2);
      player1.collide(wallSet);
      wallSet.collide(player1);
      player2.collide(player1);
      database.ref("gameonly/players/player1/").update({
        playerX: player1.position.x - 10,
        playerDirection: "left"
      })

    } else {
      lb = false;
    }

    if (keyDown("RIGHT_ARROW") && lb === false && ub === false && db === false) {
      rb = true;
      player1.collide(player2);
      player1.collide(wallSet);
      wallSet.collide(player1);
      player2.collide(player1);
      database.ref("gameonly/players/player1/").update({
        playerX: player1.x + 10,
        playerDirection: "right"
      })

    } else {
      rb = false;
    }

  }

  if (playerIs === 2) {
    if (player2Direction === "up") {
      player2.addImage(pl2ImgU);
    } else if (player2Direction === "down") {
      player2.addImage(pl2ImgD);
    } else if (player2Direction === "left") {
      player2.addImage(pl2ImgL);
    } else if (player2Direction === "right") {
      player2.addImage(pl2ImgR);
    }







    if (keyDown("UP_ARROW") && lb === false && rb === false && db === false) {
      ub = true;
      player2.collide(player1);
      player2.collide(wallSet);
      wallSet.collide(player2);
      player1.collide(player2);
      database.ref("gameonly/players/player2/").update({
        playerY: player2.position.y - 10,
        playerDirection: "up"
      })
    } else {
      ub = false;
    }

    if (keyDown("DOWN_ARROW") && lb === false && rb === false && ub === false) {
      db = true;
      player2.collide(player1);
      player2.collide(wallSet);
      wallSet.collide(player2);
      player1.collide(player2);
      database.ref("gameonly/players/player2/").update({
        playerY: player2.position.y + 10,
        playerDirection: "down"
      })

    } else {
      db = false;
    }

    if (keyDown("LEFT_ARROW") && ub === false && rb === false && db === false) {
      lb = true;
      player2.collide(player1);
      player2.collide(wallSet);
      wallSet.collide(player2);
      player1.collide(player2);
      database.ref("gameonly/players/player2/").update({
        playerX: player2.position.x - 10,
        playerDirection: "left"
      })

    } else {
      lb = false;
    }

    if (keyDown("RIGHT_ARROW") && lb === false && ub === false && db === false) {
      rb = true;
      player2.collide(player1);
      player2.collide(wallSet);
      wallSet.collide(player2);
      player1.collide(player2);
      database.ref("gameonly/players/player2/").update({
        playerX: player2.x + 10,
        playerDirection: "right"
      })

    } else {
      rb = false;
    }


  }




}






function respawn() {
  if (player1Life < 1 && playerIs === 2) {
    playerTime = true;
    database.ref("/gameonly/players/player1").update({
      playerX: random(respawnPointsX),
      playerY: random(respawnPointsY),
      playerlife: 100
    })
    var pmbr = alldata.gameonly.players
    database.ref("/gameonly/players/player2").update({
      playerkills: pmbr.player2.playerkills + 1
    })
    database.ref("/gameonly/players/player1").update({
      playerdeaths: pmbr.player1.playerdeaths + 1
    })

    setTimeout(() => {
      playerTime = false
    }, 100);
  } else if (player2Life < 1 && playerIs === 1) {
    playerTime = true;
    database.ref("/gameonly/players/player2").update({
      playerX: random(respawnPointsX),
      playerY: random(respawnPointsY),
      playerlife: 100
    })
    var rmbr = alldata.gameonly.players
    database.ref("/gameonly/players/player1").update({
      playerkills: rmbr.player1.playerkills + 1
    })
    database.ref("/gameonly/players/player2").update({
      playerdeaths: rmbr.player2.playerdeaths + 1
    })

  }
  setTimeout(() => {
    playerTime = false
  }, 100);
}
