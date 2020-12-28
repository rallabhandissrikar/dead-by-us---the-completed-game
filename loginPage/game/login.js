class Login {
  constructor() {
    inp1 = select("#inp1");
    inp2 = select("#inp2");
    submit = select("#subm");
  }

  hideall() {
    inp1.hide();
    inp2.hide();
    submit.hide();
  }

  atuhentication() {
    var playerr
    var players
    database.ref("gameonly/gamePlayerPresent").on("value", (data) => {
      players = data.val();
    })

    database.ref("gameonly/playersready").on("value", (data) => {
      playerr = data.val();
    })
    submit.mousePressed(() => {
      if (inp1.value() && inp2.value() && inp1.value() !== inp2.value() && players === 2) {
        if (inp1.value() === alldata.gameonly.players.player1.playername
          && inp2.value() === alldata.gameonly.players.player1.playerPassword) {
          patienceMaker.show();
          login.hideall();
          database.ref("gameonly/").update({
            playersready: playerr + 1
          });
          database.ref("gameonly/players/player1").update({
            playeringame : true
          });
          playerIs = 1;
          playerLogged = true;
          athComple = true;
        } else if (inp1.value() === alldata.gameonly.players.player2.playername
          && inp2.value() === alldata.gameonly.players.player2.playerPassword) {
          patienceMaker.show();
          login.hideall();
          database.ref("gameonly/").update({
            playersready: playerr + 1
          });
          database.ref("gameonly/players/player2").update({
            playeringame : true
          });
          playerIs = 2;
          playerLogged = true;
          athComple = true;
        }
      }
    })
  }
}
