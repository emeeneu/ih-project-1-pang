function Player() {
    this.x2 = 50;
    this.y2 = 50;
    this.x = (width / 2) - this.x2;
    this.y = height - this.y2;
}

Player.prototype.goLeft = function () {
    if (this.x !== 0) {
        this.x = this.x - this.x2;
        console.log('l');
    }
};

Player.prototype.goRight = function () {
    if (this.x !== (width - this.x2)) {
        this.x = this.x + this.x2;
        console.log('r');
    }
};

function Attack(height) {
    this.style = '';
    this.x = 0;
    this.y = height;
    this.x2 = 0;
    this.y2 = 0;
    this.intervalAttack = undefined;
}

Attack.prototype.updateAttack = function (x, x2, height, width) {
    this.style = 'red';
    this.x = x + 10;
    this.y = height - x2;
    this.x2 = x2 - 20;
    this.y2 = height + x2;

    this.intervalAttack = clearInterval(this.intervalAttack);
    this.intervalAttack = setInterval(function () {
        this.y = this.y - 2;

        if (this.y === -2) {
            clearInterval(this.intervalAttack);
            this.style = '';
            this.x = 0;
            this.y = height;
            this.x2 = 0;
            this.y2 = 0;
            this.intervalAttack = undefined;
        }
    }.bind(this), 10);
};

Attack.prototype.deleteAttack = function () {
    this.style = '';
    this.x = 0;
    this.y = height;
    this.x2 = 0;
    this.y2 = 0;
    this.intervalAttack = undefined;
};

function BigBubble(height, width) {
    this.style = 'blue';
    this.x = 50;
    this.y = 50;
    this.x2 = 100;
    this.y2 = 100;
    //this.radius = 50;
    this.speedX = 1;
    this.speedY = 10;
    this.boardHeight = height;
    this.boardWidth = width;
    this.gravity = 0.15;
    this.intervalBigBubble = undefined;
}

BigBubble.prototype.updatePosBigBubble = function () {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    if ((this.x + this.speedX) > (this.boardWidth - this.x2) || (this.x + this.speedX) < (0)) {
        this.speedX *= -1;
    }
    if ((this.y + this.speedY) > (this.boardHeight - this.x2)) {
        this.speedY = 10;
        this.speedY *= -1;
    }
    if ((this.y + this.speedY) < 0) {
        this.speedY = -10;
        this.speedY *= -1;
    }

    this.intervalBigBubble = window.requestAnimationFrame(this.updatePosBigBubble.bind(this));
};

BigBubble.prototype.deleteBigBubble = function () {
    this.style = '';
    this.x = 0;
    this.y = 0;
    this.x2 = 0;
    this.intervalBigBubble = undefined;
};