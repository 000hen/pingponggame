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

        this.gameDisplay = document.getElementById('gameplay');
        this.game = this.gameDisplay.getContext('2d');

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
        this._moveWay = moveWay;
    }

    draw() {
        this.game.beginPath();
        this.game.rect(this.x, this.y, this._tableSize.x, this._tableSize.y);
        this.game.fillStyle = this._tableColor;
        this.game.fill();
        this.game.closePath();
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }
}

window.Table = Table;