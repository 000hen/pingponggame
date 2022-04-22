class Table {
    constructor(tableSize, tableColor, tableSpeed, defaultX, defaultY, defaultDisplayHeight, defaultDisplayWidth) {
        this._tableColor = tableColor;
        this._tableSpeed = tableSpeed;
        this._tableSize = {
            x: tableSize * (2 / 17),
            y: tableSize * (15 / 17)
        }
        this._defaultDisplayHeight = defaultDisplayHeight;
        this._defaultDisplayWidth = defaultDisplayWidth;
        this.x = defaultX;
        this.y = defaultY;
        this._isDead = false;
        this._moveWay = 0;

        this.speedX = this._tableSpeed / Math.sqrt(2);
        this.speedY = this._tableSpeed / Math.sqrt(2);

        // this.gameDisplay = document.getElementById('gameplay');
        // this.game = this.gameDisplay.getContext('2d');

        this.info = {
            width: this._defaultDisplayWidth,
            height: this._defaultDisplayHeight
        }

        this._event = [];
    }

    get tableSpeed() {
        return this.tableSpeed;
    }

    set tableSpeed(tableSpeed) {
        this._tableSpeed = tableSpeed;
    }

    get tableSize() {
        return this._tableSize;
    }

    set tableSize(tableSize) {
        this._tableSize = tableSize;
    }

    get tableColor() {
        return this._tableColor;
    }

    set tableColor(tableColor) {
        this._tableColor = tableColor;
    }

    get moveWay() {
        return this
    }

    set moveWay(moveWay) {
        // moveWay === this._moveWay ? null : (moveWay === 0 ? (this.speedY > 0 ? this.speedY = this.speedY : this.speedY = -this.speedY) : this.speedY = -this.speedY)
        this._moveWay = moveWay;
    }

    move() {
        // if (this._isDead) return;

        // if (this.x >= this.info.width - this._tableSize || this.x <= this._tableSize) {
        //     this.speedX = -this.speedX;
        //     this._isDead = true;
        //     this.emit("gameOver", "lol")
        // }
        if (this.y + this._tableSize.y > this.info.height || this.y < 0) {
            if (this.y < 0) {
                this.y += 1;
            } else {
                this.y -= 1;
            }
            // this.draw();
            return;
        }
        // this.x += this.speedX;
        this._moveWay === 1 ? this.y += this.speedY : this.y -= this.speedY;
        // this.draw();
    }
}

module.exports.Table = Table;