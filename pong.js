// This basically animates things. 60fps.
var scoreA = 0;
var scoreB = 0;
var scoretext = document.createElement("h5")
setInterval(function() {
scoretext.innerText = `PlayerA: ${scoreA} | PlayerB: ${scoreB}`;
}, 350);
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };


// Create the canvas, configure the canvas's size, and then getting the 2D context for the canvas
var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

// This creates the canvas
window.onload = function() {
    document.body.appendChild(scoretext);
    document.body.appendChild(canvas);
    animate(step);
  };

var step = function() {
    update();
    render();
    animate(step);
  };

var update = function() {
};

// Background colour
var render = function() {
  context.fillStyle = "#7289DA";
  context.fillRect(0, 0, width, height);
};

// Defines the paddle, and players
class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.x_speed = 0;
        this.y_speed = 0;
    }
    render() {
        context.fillStyle = "#0000FF";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Player {
    constructor() {
        this.paddle = new Paddle(175, 580, 50, 10);
    }
}
 
class PlayerB {
    constructor() {
        this.paddle = new Paddle(175, 10, 50, 10);
    }
}


// Rendering paddles here
Player.prototype.render = function() {
    this.paddle.render();
  };
  
  PlayerB.prototype.render = function() {
    this.paddle.render();
  };

// This is the ball. The constructor defines its position and speed, and then the rendering portion defines its visual parts.
class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.y_speed = 10;
        this.radius = 5;
    }
    render() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        context.fillStyle = "#000000";
        context.fill();
    }
}
  
// Loading the balls and the paddles here
var player = new Player();
var playerb = new PlayerB();
var ball = new Ball(200, 300);

var render = function() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
  player.render();
  playerb.render();
  ball.render();
};


// This is where the animation part comes into play.
var update = function() {
    ball.update();
  };
  

// BALL PHYSICS

  // Events for the ball's boundaries and stuff
  Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
  };

  var update = function() {
    ball.update(player.paddle, playerb.paddle);
  };
  
  Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;
  
    if(this.x - 5 < 0) { // Left Wall Boundary
      this.x = 5;
      this.x_speed = -this.x_speed;

    } else if(this.x + 5 > 400) { // Right Wall Boundary
      this.x = 395;
      this.x_speed = -this.x_speed;
    }
  
    if(this.y < 0) { // Point Scoring for PlayerA, yay
      this.x_speed = 0;
      this.y_speed = 5;
      this.x = 200;
      this.y = 300;
      scoreA += 1;
    }

    if(this.y > 600) { // Point Scoring for PlayerB, yay
        this.x_speed = 0;
        this.y_speed = 5;
        this.x = 200;
        this.y = 300;
        scoreB += 1;
      }
        // Paddle hit events
    if(top_y > 300) {
      if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
        // Player A
        this.y_speed = -5;
        this.x_speed += (paddle1.x_speed / 2);
        this.y += this.y_speed;
      }
    } else {
      if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
        // Player B
        this.y_speed = 5;
        this.x_speed += (paddle2.x_speed / 2);
        this.y += this.y_speed;
      }
    }
  };

// CONTROLS

// Adding listeners that look for keystrokes!
var keyStroke = {};

window.addEventListener("keydown", function(event) {
  keyStroke[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keyStroke[event.keyCode];
});


// Paddle controls
var update = function() {
    player.update();
    playerb.update();
    ball.update(player.paddle, playerb.paddle);
  };
  
  Player.prototype.update = function() {
    for(var key in keyStroke) {
      var value = Number(key);
      if(value == 65) { // Control using A (Going left)
        this.paddle.move(-4, 0);
      } else if (value == 68) { // Control using D (Going right)
        this.paddle.move(4, 0);
      } else {
        this.paddle.move(0, 0);
      }
    }
  };

  PlayerB.prototype.update = function() {
    for(var key in keyStroke) {
      var value = Number(key);
        if(value == 37) { // Control using left arrow (Going left)
            this.paddle.move(-4, 0);
      } else if (value == 39) { // Control using D (Going right)
        this.paddle.move(4, 0);
      } else {
        this.paddle.move(0, 0);
      }
    }
  };
  
  Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x < 0) { // Yeehaw, paddle stops if all the way to the left yeehaw
      this.x = 0;
      this.x_speed = 0;
    } else if (this.x + this.width > 400) { // Nope, howdy sir, not allowed to go past this point on the furthest right.
      this.x = 400 - this.width;
      this.x_speed = 0;
    }
  }