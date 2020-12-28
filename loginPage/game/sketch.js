var map;
var pl1ImgU;
var pl1ImgD;
var pl1ImgR;
var pl1ImgL;
var login;
var playerLogged;
var athComple = false;

var pl2ImgU;
var pl2ImgD;
var pl2ImgR;
var pl2ImgL;

var player1;
var player2;
var canvas;
var playerImageUp, playerImageDown, playerImageLeft, playerImageRight;
var database;
var playerIs = 0;
var player1Direction = "up";
var player2Direction = "up";
var wallSet;
var life = 5;
var player1Life = 100;
var player2Life = 100;
var inp1;
var inp2;
var submit;
var alldata;
var lifebar;
var lifebar2;
var respawnPointsX = [200, 400, 100, 800, 1000, 1100];
var respawnPointsY = [200, 400];
var playerTime = false;
var rb = false;
var lb = false;
var ub = false;
var db = false;
var bullets1;
var bullets2;
var bulletsSender = [];
var elmKills;
var elmDeaths;
var elmKillsEnm;
var elmDeathsEnm;
var trigger1;
var trigger2;
var momentalControls = false;
var timerMin = 0;
var timerSec = 0;
var elementTime;
var gameState = 0;
var patienceMaker;
var endingWords;
function preload() {
  //player Images
  pl1ImgU = loadImage("p1Images/pl1Up.png");
  pl1ImgD = loadImage("p1Images/pl1Down.png");
  pl1ImgR = loadImage("p1Images/pl1Right.png");
  pl1ImgL = loadImage("p1Images/pl1Left.png");
  //----------------------------------------------------------------------------//
  pl2ImgU = loadImage("p2Images/pl2Up.png");
  pl2ImgD = loadImage("p2Images/pl2Down.png");
  pl2ImgR = loadImage("p2Images/pl2Right.png");
  pl2ImgL = loadImage("p2Images/pl2Left.png");
}

function setup() {
  login = new Login();
  //canvas
  canvas = createCanvas(1250, 550);
  canvas.hide();

  map = new larMasti();
  //walls

  wallSet = new Group();
  //create walls in map

  map.world();
  ///---------------------------------------------------------------------------//
  //player1
  player1 = createSprite(200, 200, 40, 40);
  player1.addImage(pl1ImgU);
  //player2
  player2 = createSprite(1100, 200, 40, 40);
  player2.addImage(pl1ImgU);
  //player scaling
  player1.scale = 0.5;
  player2.scale = 0.5;

  //bullets
  bullets1 = createGroup();
  bullets2 = createGroup();
  //lifebar
  lifebar = createSprite(0, 0, 0, 0);
  lifebar2 = createSprite(0, 0, 0, 0);
  //----------------------------------------------------------------------------//
  //database
  database = firebase.database();
  //full data reading
  database.ref("/").on("value", (data) => {
    alldata = data.val();
  })


  database.ref("/gameonly/players/player1/playerlife").on("value", (data) => {
    player1Life = data.val();
  })
  database.ref("/gameonly/gameState").on("value", (data) => {
    gameState = data.val();
  })
  database.ref("/gameonly/players/player2/playerlife").on("value", (data) => {
    player2Life = data.val();
  })
  database.ref("/gameonly/players/player2").on("value", (data) => {
    var rbc = data.val();
    player2.position.x = rbc.playerX;
    player2.position.y = rbc.playerY;
    player2Direction = rbc.playerDirection;
  })
  database.ref("/gameonly/players/player1").on("value", (data) => {
    var bbc = data.val();
    player1.position.x = bbc.playerX;
    player1.position.y = bbc.playerY;
    player1Direction = bbc.playerDirection;
  })
  //----------------------------------------------------------------------------//
  //camera zoom
  //camera.zoom = 6;
  //bullet sets
  elmKills = createElement("h1", "Your kills: " + 0);
  elmKills.hide();
  elmDeaths = createElement("h1", "Your Deaths: " + 0);
  elmDeaths.hide();
  elmKillsEnm = createElement("h1", "Enemy Kills: " + 0);
  elmKillsEnm.hide();
  elmDeathsEnm = createElement("h1", "Enemy Deaths: " + 0);
  elmDeathsEnm.hide();

  elmKills.style("font-size: 40px;");
  elmKills.style("color:white;");
  elmKills.style("font-family: cursive;");

  elmDeaths.style("font-size: 40px;");
  elmDeaths.style("color:white;");
  elmDeaths.style("font-family: cursive;");

  elmKillsEnm.style("font-size: 40px;");
  elmKillsEnm.style("color:white;");
  elmKillsEnm.style("font-family: cursive;");

  elmDeathsEnm.style("font-size: 40px;");
  elmDeathsEnm.style("color:white;");
  elmDeathsEnm.style("font-family: cursive;");

  elementTime = createElement("h1", "Total time : " + timerMin + ":" + timerSec);
  elementTime.style("color: white");
  elementTime.hide();

  patienceMaker = createElement("h1", "please wait while others join the game!!!!!!!");
  patienceMaker.style("color: white");
  patienceMaker.position(windowWidth / 2 - 200, windowHeight / 2);
  patienceMaker.hide();

  endingWords = createElement("h1", "");
  endingWords.style("color : white;");
  endingWords.style("font-size : 44px;");
  endingWords.position(windowWidth/2, windowHeight/2);


  
  //----------------------------------------------------------------------------//
  database.ref("gameonly/players/player2/trigger").on("value", (data) => {
    trigger2 = data.val();
  })

  database.ref("gameonly/players/player1/trigger").on("value", (data) => {
    trigger1 = data.val();
  })
}

function draw() {
  var l1;
  var l2;
  var l3;
  //for remembering
  database.ref("gameonly/players/player1/playeringame").on("value", (data) => {
    l1 = data.val();
  })

  database.ref("gameonly/players/player2/playeringame").on("value", (data) => {
    l2 = data.val();
  })

  database.ref("gameonly/gamePlayerPresent").on("value", (data) => {
    l3 = data.val();
  })

  database.ref("gameonly/playersready").on("value", (data) => {
    l4 = data.val();
  })


  if (gameState === 0) {
    var mbc;
    
    login.atuhentication();
    database.ref("gameonly/playersready").on("value", (data) => {
      mbc = data.val();
    })
    

    if (athComple === true
      && l1 === true
      && l2 === true
      && l3 === 2
      && l4 === 2) {
      if (mbc === 2) {
        database.ref("gameonly/").update({
          gameState: 1
        })
      }
    }
  } else if (gameState === 1 && playerLogged === true) {
    canvas.show();
    background(300);
    if (frameCount % 60 == 0) {
      timerSec += 1;
      elementTime.html("Total time : " + timerMin + ":" + timerSec);
    }

    if (timerSec === 60) {
      timerMin += 1;
      timerSec = 0;
      elementTime.html("Total time : " + timerMin + ":" + timerSec);
    }
    patienceMaker.hide();
    elementTime.show();
    elementTime.position(800, 200);
    PlayerMove();
    bulletTransponder();
    bulletRelease();
    map.alwaysCollide();
    bulletStruggle()
    player1.depth = 10;
    player2.depth = 10;
    momentalControls = false;


    window.onbeforeunload = function() {
      database.ref("gameonly/").update({
        gameState : 2,
      })

      if (playerIs === 1) {
        database.ref("gameonly/players/player1").update({
          playerX:0,
            playerY:0,
            playerdeaths : 0,
            playerkills : 0,
            trigger : 0,
            playerlife : 0,
            playerDirection : "up",
            playername : "notset",
            playerPassword : "notset"
            
        })

        database.ref("gameonly/").update({
          playerLeftCon : 1
        }) 
      }


      if (playerIs === 2) {
        database.ref("gameonly/players/player2").update({
          playerX:0,
            playerY:0,
            playerdeaths : 0,
            playerkills : 0,
            trigger : 0,
            playerlife : 0,
            playerDirection : "up",
            playername : "notset",
            playerPassword : "notset"
            
        })

        database.ref("gameonly/").update({
          playerLeftCon : 2
        }) 
      }
    }


    if (timerMin === 1) {
      database.ref("gameonly/").update({
        gameState : 2
      })

      database.ref("gameonly/").update({
        playerLeftCon : "timercom"
      })
    }
    //var a = rect(200, 200, 500, 500);
    
  } else if (gameState === 2 && playerLogged === true) {
    
    elementTime.hide();
    var lmb;
    var pl1k;
    var pl2k;
    var pl1d;
    var pl2d;

    canvas.hide();
    momentalControls = false;

    database.ref("gameonly/playerLeftCon").on("value", (data) => {
      lmb = data.val();
    })

    database.ref("gameonly/players/player1/playerkills").on("value", (data) => {
      pl1k = data.val();
    })

    database.ref("gameonly/players/player2/playerkills").on("value", (data) => {
      pl2k = data.val();
    })

    database.ref("gameonly/players/player1/playerdeaths").on("value", (data) => {
      pl1d = data.val();
    })

    database.ref("gameonly/players/player2/playerdeaths").on("value", (data) => {
      pl2d = data.val();
    })

    if (lmb === 1) {
      elmDeaths.hide();
      elmDeathsEnm.hide();
      elmKills.hide();
      elmKillsEnm.hide();
      endingWords.html(`you won the match, the other player left the game!! your score : ${pl1k * 10}`);
    }else if (lmb === 2) {
      elmDeaths.hide();
      elmDeathsEnm.hide();
      elmKills.hide();
      elmKillsEnm.hide();

      endingWords.html(`you won the match, the other player left the game!! your score : ${pl1k * 10}`);
    }else if (lmb === "timercom") {
      if (playerIs === 1) {

        if (pl1k * 10 > pl2k *10) {
          elmDeaths.hide();
          elmDeathsEnm.hide();
          elmKills.hide();
          elmKillsEnm.hide();
          endingWords.show();
          endingWords.html(`you won the match, your score : ${pl1k * 10}`);
        }else if (pl1k * 10 < pl2k *10) {
          elmDeaths.hide();
          elmDeathsEnm.hide();
          elmKills.hide();
          elmKillsEnm.hide();
          endingWords.show();
          endingWords.html(`you lost the match, your score : ${pl1k * 10}`); 
        }else if (pl1k * 10 === pl2k *10) {
          elmDeaths.hide();
          elmDeathsEnm.hide();
          elmKills.hide();
          elmKillsEnm.hide();
          endingWords.show();
          endingWords.html(`Match Tie, your score : ${pl1k * 10}`);
        }

      }


      if (playerIs === 2) {

        if (pl2k * 10 > pl1k *10) {
          elmDeaths.hide();
          elmDeathsEnm.hide();
          elmKills.hide();
          elmKillsEnm.hide();
          endingWords.show();
          endingWords.html(`you won the match, your score : ${pl2k * 10}`);
        }else if (pl2k * 10 < pl1k *10) {
          elmDeaths.hide();
          elmDeathsEnm.hide();
          elmKills.hide();
          elmKillsEnm.hide();
          endingWords.show();
          endingWords.html(`you lost the match, your score : ${pl2k * 10}`);
        }else if (pl2k * 10 === pl1k *10) {
          elmDeaths.hide();
          elmDeathsEnm.hide();
          elmKills.hide();
          elmKillsEnm.hide();
          endingWords.show();
          endingWords.html(`Match Tie, your score : ${pl2k * 10}`);
        }

      }
    }

    window.onbeforeunload = function() {
      database.ref("gameonly/").update({
        gamePlayerPresent : 0,
        gameState : 0,
        playerLeftCon : 0,
        playersready : 0
      })

      if (playerIs === 1) {
        database.ref("gameonly/players/player1").update({
          playername : "notset",
          playerPassword: "notset",
          playeringame : false
        })
      }

      if (playerIs === 2) {
        database.ref("gameonly/players/player2").update({
          playername : "notset",
          playerPassword: "notset",
          playeringame : false
         
        })
      }
    }
  }

  drawSprites();
}
