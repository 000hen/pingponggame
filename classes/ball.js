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

        if (Math.random() * 10 > 5) {
            if (Math.random() * 10 > 5) {
                this.speedX = -this.speedX;
                this.speedY = -this.speedY;
            } else {
                this.speedX = this.speedX;
                this.speedY = -this.speedY;
            }
        } else {
            if (Math.random() * 10 > 5) {
                this.speedX = -this.speedX;
                this.speedY = this.speedY;
            } else {
                this.speedX = this.speedX;
                this.speedY = this.speedY;
            }
        }

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

    move() {
        if (this._isDead) return;

        if (this.x >= this.info.width - this._ballSize || this.x <= this._ballSize) {
            // this.speedX = -this.speedX;
            this._isDead = true;
            this.emit("gameOver", "lol")
        }
        if (this.y >= this.info.height - this._ballSize || this.y <= this._ballSize) {
            this.speedY = -this.speedY + Math.random() * 1.3;
            this.y += this.speedY;
        }

        if (this.y > this._players.player1.y && this.y < this._players.player1.y + this._players.player1._tableSize.y && this.x > this._players.player1.x - this._players.player1._tableSize.x && this.x < this._players.player1.x + this._players.player1._tableSize.x) {
            this.speedX = -this.speedX + Math.random() * 1.3;
            this.speedY = Math.sqrt(Math.pow(this._ballSpeed, 2) - Math.pow(this.speedX, 2));
            this.x += this.speedX;
            this.y += this.speedY;
        }

        if (this.y > this._players.player2.y && this.y < this._players.player2.y + this._players.player2._tableSize.y && this.x > this._players.player2.x - this._players.player2._tableSize.x && this.x < this._players.player2.x + this._players.player2._tableSize.x) {
            this.speedX = -this.speedX + Math.random() * 1.3;
            this.speedY = Math.sqrt(Math.pow(this._ballSpeed, 2) - Math.pow(this.speedX, 2));
            this.x += this.speedX;
            this.y += this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.emit("move", {x: this.x, y: this.y});
    }

    on(event, callback) {
        this._event.push({
            event,
            callback
        });
    }

    emit(event, message) {
        this._event.map(e => {
            if (e.event === event) e.callback(message);
        });
    }
}

module.exports.Ball = Ball;