// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // start at a random x position off the canvas
    this.startPos = Math.floor((Math.random() * -100) + -101);
    this.x = this.startPos;
    this.y = y;
    
    // random speed generator
    this.speed = Math.floor((Math.random() * 200) + 100);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    
    // loop when of the canvas
    if (this.x > 505) {
        this.x = this.startPos;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    
    // 101 * "of number of cells" gives proper x position
    // (83 * "of number of cells") - 40 gives proper y position
    this.startPos = [202, 375];
    this.x = this.startPos[0];
    this.y = this.startPos[1];
}

Player.prototype.update = function() {
    this.xRange = [this.x - 65, this.x + 65];

    // check collisions
    for (enemy in allEnemies) {
        if (allEnemies[enemy].x >= this.xRange[0] && allEnemies[enemy].x <= this.xRange[1] && allEnemies[enemy].y == this.y) {
            // reset player position
            this.x = this.startPos[0];
            this.y = this.startPos[1];
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch (true) {
        case key == "up" && this.y > 43:
            this.y += - 83;
            break;
            
        case key == "right" && this.x < 404:
            this.x += 101;
            break;
            
        case key == "down" && this.y < 375:
            this.y += + 83;
            break;
            
        case key == "left" && this.x > 0:
            this.x += - 101;
            break;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var en1 = new Enemy(43);
var en2 = new Enemy(43);

var en3 = new Enemy(126);
var en4 = new Enemy(126);


var en5 = new Enemy(209);
var en6 = new Enemy(209);

var allEnemies = [en1,en2,en3,en4,en5,en6];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});