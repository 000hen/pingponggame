async function runGame(player1D, player2D) {
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

    player1D.ws.send(encode({name:"status",value:0}));
    player2D.ws.send(encode({name:"status",value:0}));

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

        var data = {
            name: "gameStatus",
            data: {}
        }
        data.data[player1D.id] = {
            x: player1.x,
            y: player1.y
        }
        data.data[player2D.id] = {
            x: player2.x,
            y: player2.y
        }
        data.data["ball"] = {
            x: ball.x,
            y: ball.y
        }

        player1D.ws.send(encode(data));
        player2D.ws.send(encode(data));
    }, 17);

    return {
        ball,
        player1,
        player2,
        moveStatus
    }
}

module.exports.runGame = runGame;