const express = require('express');
const { encode, decode } = require("msgpack-lite");
const { runGame } = require("./runner.js");
const uuid = require("uuid");
const app = express();
const SocketServer = require('ws').Server;

const PORT = process.env.PORT || 9487;

const playerList = global.playerList = {
    player: [],
    wait: [],
    party: []
}

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const wss = new SocketServer({
    server
});

app.get("/", (req, res) => { res.sendFile(__dirname + "/index.html"); });
app.get("/multipingpong", (req, res) => { res.sendFile(__dirname + "/mutipingpong.html"); });
app.get("/classes/:file", (req, res) => { res.sendFile(__dirname + "/classes/" + req.params.file); });
app.get("/web/:file", (req, res) => { res.sendFile(__dirname + "/web/" + req.params.file); });

wss.on("connection", (ws) => {
    console.log("Client connected");

    const ID = uuid.v4();
    var roomID = "";

    ws.send(encode({
        name: "userID",
        value: ID
    }));

    playerList.player.push({
        id: ID,
        ws: ws
    });

    ws.on("message", async (message) => {
        var data = decode(new Uint8Array(message));

        switch (data.name) {
            case "start":
                if (playerList.wait.find(e => e.id === ID) || playerList.party.some(e => e.player === ID)) {
                    ws.send(encode({
                        name: "status",
                        value: 1
                    }));
                    return;
                }

                playerList.wait.push(ID);

                function a() {
                    return new Promise((rs, rj) => {
                        if (playerList.wait.length > 1) {
                            return rs(true);
                        }
                        setTimeout(async () => rs(await a()), 1000);
                    })
                }
                await a();

                var pls = [...playerList.wait];
                pls.splice(pls.indexOf(ID), 1);

                var anotherPlayer = pls[Math.floor(Math.random() * pls.length)];
                playerList.wait.splice(playerList.wait.findIndex(e => e.id === ID), 1);
                playerList.wait.splice(playerList.wait.findIndex(e => e.id === anotherPlayer), 1);

                roomID = uuid.v4();
                var data = {
                    name: "gameStart",
                    data: [
                        ID,
                        anotherPlayer
                    ],
                    roomID: roomID
                };

                playerList.party.push(data);

                ws.send(encode(data));
                playerList.player.find(e => e.id === anotherPlayer).ws.send(encode(data));

                playerList.party.find(e => e.roomID === roomID).game = await runGame(playerList.player.find(e => e.id === ID), playerList.player.find(e => e.id === anotherPlayer), roomID);
                break;
            
            case "keydown":
                var party = playerList.party.find(e => e.data.includes(ID));
                if (!party) return;
                if (party.data.findIndex(e => e === ID) === 0) {
                    party.game.player1.moveWay = data.value;
                    party.game.moveStatus.player1 = true;
                } else {
                    party.game.player2.moveWay = data.value;
                    party.game.moveStatus.player2 = true;
                }
                break;
            
            case "keyup":
                var party = playerList.party.find(e => e.data.includes(ID));
                if (!party) return;
                if (party.data.findIndex(e => e === ID) === 0) {
                    party.game.moveStatus.player1 = false;
                } else {
                    party.game.moveStatus.player2 = false;
                }
                break;
            
            case "ping":
                ws.send(encode({
                    name: "pong"
                }));
                break;
        }
    });
    ws.on("close", () => {
        playerList.player.splice(playerList.player.findIndex(e => e === ID), 1);
        playerList.wait.splice(playerList.wait.findIndex(e => e === ID), 1);
        console.log("Client disconnected");
    });
})