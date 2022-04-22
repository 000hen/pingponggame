class Ball {
    constructor(ballSize, ballColor, ballSpeed, defaultX, defaultY, defaultDisplayHeight, defaultDisplayWidth, players) {
        this._ballSize = ballSize;
        this._ballColor = ballColor;
        this._ballSpeed = ballSpeed;
        this._defaultDisplayHeight = defaultDisplayHeight;
        this._defaultDisplayWidth = defaultDisplayWidth;
        this.x = defaultX;
        this.y = defaultY;
        this._isDead = false;
        this._players = players;

        this.speedX = this._ballSpeed / Math.sqrt(2);
        this.speedY = this._ballSpeed / Math.sqrt(2);

        this.gameDisplay = document.getElementById('gameplay');
        this.game = this.gameDisplay.getContext('2d');

        this.info = {
            width: this._defaultDisplayWidth,
            height: this._defaultDisplayHeight
        }

        this._event = [];
    }

    get ballSpeed() {
        return this.ballSpeed;
    }

    set ballSpeed(ballSpeed) {
        this._ballSpeed = ballSpeed;
    }

    get ballSize() {
        return this._ballSize;
    }

    set ballSize(ballSize) {
        this._ballSize = ballSize;
    }

    get ballColor() {
        return this._ballColor;
    }

    set ballColor(ballColor) {
        this._ballColor = ballColor;
    }

    draw() {
        this.game.beginPath();
        this.game.arc(this.x, this.y, this._ballSize, 0, Math.PI * 2, false);
        this.game.fillStyle = this._ballColor;
        this.game.fill();
        this.game.closePath();
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }

    on(event, callback) {
        this._event.push({
            event,
            callback
        });
    }

    // clearon(event) {
    //     this._event.map(e => {
    //         if (e.event === event) delete e;
    //     });
    // }

    emit(event, message) {
        this._event.map(e => {
            if (e.event === event) e.callback(message);
        });
    }
}

window.Ball = Ball;