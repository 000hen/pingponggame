function runGame(player1D, player2D) {
    const { Ball } = require("./classes/ball.js");
    const { Table } = require("./classes/table.js");
    const { encode, decode } = require("msgpack-lite");

    var player1 = new Table(150, "#000", 12, 150, 150, 1080, 1920);
    var player2 = new Table(150, "#000", 12, 1770, 150, 1080, 1920);

    var ball = new Ball(15, "#000", 10, 960, 540, 1080, 1920, {player1, player2});

    var d = setInterval(() => {
        ball.move();
        // player1.draw();
        // player2.draw();

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
    }, 17)
}

module.exports.runGame = runGame;