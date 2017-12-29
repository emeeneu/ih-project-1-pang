function Player(character) {
    this.x2 = character.x2;
    this.y2 = 100;
    this.x = (width / 2) - this.x2;
    this.y = (height - 10) - this.y2;
    this.speed = character.speed;
    this.direction = '';
    this.setInterval = undefined;
    this.character = character.still.character;
    this.widthFrame = character.still.widthFrame;
    this.heightFrame = character.still.heightFrame;
    this.spriteX = character.still.spriteX;
    this.spriteY = character.still.spriteY;
    this.currentFrame = character.still.currentFrame;
    this.frameCount = character.still.frameCount;
    this.speedFrame = character.still.speedFrame;
    this.updateFramePlayer();
}

Player.prototype.updateFramePlayer = function () {
    this.setInterval = clearInterval(this.setInterval);
    this.setInterval = setInterval(function () {
        this.currentFrame = ++this.currentFrame % this.frameCount;
        this.spriteX = this.currentFrame * this.widthFrame;
    }.bind(this), this.speedFrame);
};

Player.prototype._changeMoveFrame = function (move) {
    this.character = move.character;
    this.widthFrame = move.widthFrame;
    this.heightFrame = move.heightFrame;
    this.spriteX = move.spriteX;
    this.spriteY = move.spriteY;
    this.currentFrame = move.currentFrame;
    this.frameCount = move.frameCount;
    this.speedFrame = move.speedFrame;
};

Player.prototype.goStill = function (character) {
    this._changeMoveFrame(character.still);
    this.direction = '';
};

Player.prototype.goLeft = function (character) {
    if (this.direction != 'left') {
        this.x = this.x - this.speed;
        this._changeMoveFrame(character.left);
    }
    if (this.x > 0) {
        this.x = this.x - this.speed;
    }
    this.direction = 'left';
};

Player.prototype.goRight = function (character) {
    if (this.direction != 'right') {
        this.x = this.x + this.speed;
        this._changeMoveFrame(character.right);
    }
    if (this.x < (width - this.x2)) {
        this.x = this.x + this.speed;
    }
    this.direction = 'right';
};

Player.prototype.goAttack = function (character) {
    this._changeMoveFrame(character.attack);
};

function Attack(height, character) {
    this.image = character.character;
    this.x = 0;
    this.y = height;
    this.x2 = 0;
    this.y2 = 0;
    this.intervalAttack = undefined;
    //animation
    this.widthFrame = character.widthFrame;
    this.heightFrame = character.heightFrame;
    this.spriteX = character.spriteX;
    this.spriteY = character.spriteY;
    this.currentFrame = character.currentFrame;
    this.frameCount = character.frameCount;
}

Attack.prototype.updateAttack = function (x, x2, height, width) {
    this.x = x + ((x2 * 30) / 100);
    this.y = height - x2;
    this.x2 = x2 - ((x2 * 60) / 100);
    this.y2 = height + x2;

    this.intervalAttack = clearInterval(this.intervalAttack);
    this.intervalAttack = setInterval(function () {
        this.y = this.y - 25;
        this.currentFrame = ++this.currentFrame % this.frameCount;
        this.spriteX = this.currentFrame * this.widthFrame;
        if (this.y < -15) {
            clearInterval(this.intervalAttack);
            this.x = 0;
            this.y = height;
            this.x2 = 0;
            this.y2 = 0;
            this.intervalAttack = undefined;
        }
    }.bind(this), 100);
};

Attack.prototype.deleteAttack = function () {
    this.style = '';
    this.x = 0;
    this.y = height;
    this.x2 = 0;
    this.y2 = 0;
    this.intervalAttack = undefined;
};

function Ball(height, width, x, y, x2, y2, speedX, speedY) {
    this.pokeball = imgPokeball;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.speedX = speedX;
    this.speedY = speedY;
    this.boardHeight = height;
    this.boardWidth = width;
    this.gravity = 0.15;
    this.intervalBall = undefined;
    this.intervalPosBall = undefined;
    //animation
    this.spriteWidth = 185;
    this.spriteHeight = 22;
    this.cols = 8;
    this.rows = 1;
    this.widthFrame = this.spriteWidth / this.cols;
    this.heightFrame = this.spriteHeight / this.rows;
    this.spriteX = 0;
    this.spriteY = 0;
    this.currentFrame = 0;
    this.frameCount = 8;
    this.updatePosBall();
    this._updateFrameBall();
}

Ball.prototype._updateFrameBall = function () {
    this.intervalBall = setInterval(function () {
        this.currentFrame = ++this.currentFrame % this.frameCount;
        this.spriteX = this.currentFrame * this.widthFrame;
    }.bind(this), 150);
};

Ball.prototype.updatePosBall = function () {
    this.intervalPosBall = window.cancelAnimationFrame(this.intervalPosBall);
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
    this.intervalPosBall = window.requestAnimationFrame(this.updatePosBall.bind(this));
};

function PokemonFly(x, y, x2, y2, speedX, height, width, pokemon) {
    this.character = pokemon.character;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.speedX = speedX;
    this.boardHeight = height;
    this.boardWidth = width;
    this.intervalPokemonFly = undefined;
    this.direction = 'left';
    //animation
    this.widthFrame = pokemon.widthFrame;
    this.heightFrame = pokemon.heightFrame;
    this.spriteX = pokemon.spriteX;
    this.spriteY = pokemon.spriteY;
    this.currentFrame = pokemon.currentFrame;
    this.frameCount = pokemon.frameCount;
    this.updatePosPokemonFly();
    this._updateFramePokemonFly();
}

PokemonFly.prototype._updateFramePokemonFly = function () {
    this.intervalPokemonFly = setInterval(function () {
        this.currentFrame = ++this.currentFrame % this.frameCount;
        this.spriteX = this.currentFrame * this.widthFrame;
    }.bind(this), 150);
};

PokemonFly.prototype.updatePosPokemonFly = function () {
    this.intervalPokemonFly = window.cancelAnimationFrame(this.intervalPokemonFly);
    if(this.direction == 'right'){
        if (this.x > this.boardWidth + 200) {
            this.x = this.boardWidth + 250;
            this.direction = 'left';
        }
        this.x += this.speedX;
    }
    if(this.direction == 'left'){
        if (this.x > -200) {
            this.x = -250;
            this.direction = 'right';
        }
        this.x -= this.speedX;
    }
    this.intervalPokemonFly = window.requestAnimationFrame(this.updatePosPokemonFly.bind(this));
};

function PokemonStone(x, y, x2, y2, speedX, height, width) {
    this.character = 'red';
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.speedX = speedX;
    this.boardHeight = height;
    this.boardWidth = width;
    this.gravity = 2;
    this.intervalPokemonStone = undefined;
    this.typeStone = undefined;
    this.falling = false;
    this._typeStone();
    this.updatePosPokemonStone();
}

PokemonStone.prototype.updatePosPokemonStone = function () {
    //this.intervalPokemonFly = window.cancelAnimationFrame(this.intervalPokemonFly);   
    if (this.x - 60 > this.boardWidth) {
        this.x = -190;
    }
    if (this.falling === true) {
        this.y += this.gravity;
    } else {
        this.x += this.speedX;
    }
    this.intervalPokemonStone = window.requestAnimationFrame(this.updatePosPokemonStone.bind(this));
};

PokemonStone.prototype._typeStone = function () {

};