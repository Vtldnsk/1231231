var gameOver = false;

class Snake{
  constructor(a, dir) {
    this.a = a;
    this.dir= dir;
  }

  draw() {
    for (let i = 0; i < this.a.length; i++) {
      if (i == 0) {
        fill("black");
      } else if (i == this.a.length - 1) {
        fill("white");
      } else {
        fill(155);
      }
      square(this.a[i].x*25, this.a[i].y*25, 25);
    }
  }

  moveHead() {
    let newHead;
    if (this.dir == 0) {
      // вправо
      newHead = {x: this.a[this.a.length - 1].x + 1, y: this.a[this.a.length - 1].y};
    } else if (this.dir == 1) {
      // вниз
      newHead = {x: this.a[this.a.length - 1].x, y: this.a[this.a.length - 1].y + 1};
    } else if (this.dir == 2) {
      // вліво
      newHead = {x: this.a[this.a.length - 1].x - 1, y: this.a[this.a.length - 1].y};
    } else if (this.dir == 3) {
      // вгору
      newHead = {x: this.a[this.a.length - 1].x, y: this.a[this.a.length - 1].y - 1};
    }
    this.a.push(newHead);


    var head = this.a[this.a.length-1];
    if (head.x < 0 || head.x >=22  || head.y < 0 || head.y >= 22) {
      gameOver = true;
    }
  }

  moveTail() {
    this.a.shift();
  }
}

var snake = new Snake([{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}], 0);

var apple = {x: 0, y: 0};
var stones = [];
var bg;

function preload() {
  bg = loadImage("photo.jpg");
}

function setup() {
   createCanvas(500, 500); 
  for (let i = 0; i < 5; i++) {
    stones.push({x: round(random(0, 19)), y: round(random(0, 19))});
  }

  while (placeApple() != true) {};
}

function placeApple() {
  apple = {x: round(random(0, 19)), y: round(random(0, 19))};
  for (let i = 0; i < stones.length; i++) {
    if (stones[i].x == apple.x && stones[i].y == apple.y) {
      return false;
    }
  }

  return true;
}

function draw() {
  background(bg);
// фон картинка

  if (gameOver) {
    fill("red");
    textSize(50);
    text("GAME OVER", 100, 250);
    noLoop();
  }
  snake.draw();

  if (frameCount % 30 == 0) {
    snake.moveHead();

    var head = snake.a[snake.a.length - 1];
    if (head.x == apple.x && head.y == apple.y) {
      placeApple();
    } else {
      snake.moveTail();
    }
  }

  for (let i = 0; i < stones.length; i++) {
    fill(0, 0, 0);
    square(stones[i].x*25, stones[i].y*25, 25);

    var head = snake.a[snake.a.length - 1];
    if (head.x == stones[i].x && head.y == stones[i].y) {
      gameOver = true;
    }
  }

  for (let i = 0; i < snake.a.length-1; i++) {
    var head = snake.a[snake.a.length - 1];
    if (head.x == snake.a[i].x && head.y == snake.a[i].y) {
      gameOver = true;
    }
  }


  fill(255, 0, 0);
  square(apple.x*25, apple.y*25, 25);

}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    snake.dir = 0;
  }
  if (keyCode == DOWN_ARROW) {
    snake.dir = 1;
  }
  if (keyCode == LEFT_ARROW) {
    snake.dir = 2;
  }
  if (keyCode == UP_ARROW) {
    snake.dir = 3;
  }


}