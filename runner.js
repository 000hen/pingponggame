async function runGame(player1D, player2D, roomID) {
    const { Ball } = require("./classes/ball.js");
    const { Table } = require("./classes/table.js");
    const { encode, decode } = require("msgpack-lite");

    var player1 = new Table(150, "#000", 12, 150, 390, 1080, 1920);
    var player2 = new Table(150, "#000", 12, 1770, 390, 1080, 1920);

    var ball = new Ball(15, "#000", 10, 960, 540, 1080, 1920, { player1, player2 });
    var moveStatus = {
        player1: false,
        player2: false
    };

    function mkData() {
        var r = {
            name: "gameStatus",
            data: {}
        }
        r.data[player1D.id] = {
            x: player1.x,
            y: player1.y
        }
        r.data[player2D.id] = {
            x: player2.x,
            y: player2.y
        }
        r.data["ball"] = {
            x: ball.x,
            y: ball.y
        }

        return r;
    }

    var t = mkData();
    t.name = "status";
    t.value = 0;

    player1D.ws.send(encode(t));
    player2D.ws.send(encode(t));

    function wait(millsec) {
        return new Promise((rs, rj) => {
            setTimeout(() => rs(), millsec);
        });
    }

    await wait(3000);

    var d = setInterval(() => {
        ball.move();
        if (moveStatus.player1) player1.move();
        if (moveStatus.player2) player2.move();

        var data = encode(mkData());

        player1D.ws.send(data);
        player2D.ws.send(data);
    }, 17);

    ball.on("gameOver", (data) => {
        clearInterval(d);
        if (ball.x > 540) {
            var dt = {
                name: "gameOver",
                value: player1D.id
            }
            player1D.ws.send(encode(dt));
            player2D.ws.send(encode(dt));
        } else {
            var dt = {
                name: "gameOver",
                value: player2D.id
            }
            player1D.ws.send(encode(dt));
            player2D.ws.send(encode(dt));
        }
        global.playerList.party.splice(global.playerList.party.findIndex(e => e.roomID === data.roomID), 1);
    });

    return {
        ball,
        player1,
        player2,
        moveStatus
    }
}

module.exports.runGame = runGame;