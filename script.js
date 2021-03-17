const positionX = 0;
const positionY = 0;
var speed = 10;
var orientation_up = "up";
var orientation_down = "down";
var orientation_right = "right";
var orientation_left = "left";
const radius = 20;
const gameboard_height = 600;
const gameboard_width = 800;
let Dot = function () {
    this.radius = radius;
    this.positionX = positionX + radius;
    this.positionY = positionY + radius;
    this.speed = speed;
    this.orientation = orientation_down;
    this.buildDot = function () {
        var ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.beginPath();
        if (this.positionY > (gameboard_height - this.radius)) {
            this.positionY = gameboard_height - this.radius;
        }
        if (this.positionX > (gameboard_width - this.radius)) {
            this.positionX = gameboard_width - this.radius;
        }
        if (this.positionY == 0) {
            this.positionY = this.radius + this.positionY;
        }
        if (this.positionX == 0) {
            this.positionX = this.radius + this.positionX;
        }
        if (this.positionY < this.radius) {
            this.positionY = 0 + this.radius;
        }
        if (this.positionX < this.radius) {
            this.positionX = 0 + this.radius;
        }
        ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        // image = document.getElementById("img");
        // document.getElementById("img").style.height = '100px';
        // image.style.width = '10';
        // ctx.drawImage(image, this.positionX, this.positionY);
    }
    this.move = function () {
        switch (this.orientation) {
            case orientation_down:
                this.positionY += this.speed;
                break;
            case orientation_up:
                this.positionY -= this.speed;
                break;
            case orientation_left:
                this.positionX -= this.speed;
                break;
            case orientation_right:
                this.positionX += this.speed;
                break;
        }
    }
    // this.show = function(ctx){
    //     image = document.getElementById("img");
    //     image.style.height = this.radius;
    //     image.style.width = this.radius;
    //     let xPosition = this.positionX;
    //     let yPosition = this.positionY;
    //     ctx.drawImage(image, xPosition, yPosition);
    // }
}
let Obstacle = function (X, Y, r) {
    this.X = X;
    this.Y = Y;
    this.r = r;
    this.buildObs = function () {
        let ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.beginPath();
        ctx.arc(this.X, this.Y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
    this.move = function (x , y) {
        switch (getRandomInt(1,4)) {
            case 1:
                x += speed;
                break;
            case 2:
                x -= speed;
                break;
            case 3:
                y += speed;
                break;
            case 4:
                y -= speed;
                break;
        }
    }
}
let gameBoard = function () {
    this.gameboard_h = gameboard_height;
    this.gameboard_w = gameboard_width
    this.dot = new Dot();
    this.obstacles = [];
    this.ctx = document.getElementById("myCanvas").getContext("2d");;
    this.start = function () {
        this.dot.buildDot();
        for (let i = 1; i < 7; i++) {
            let r = radius;
            let X = Math.random() * gameboard_width;
            let Y = Math.random() * gameboard_height;
            this.Obs = new Obstacle(X, Y, r);
            this.Obs.buildObs();
            this.obstacles.push(this.Obs);
        }
    }
    this.render = function () {
        this.ctx.clearRect(0, 0, this.gameboard_w, this.gameboard_h);
        this.dot.buildDot();
        for (let i = 1; i < 7; i++) {
            let x = GameBoard.start.obstacles[i].X;
            let y = GameBoard.start.obstacles[i].Y;
            this.Obs.move(x, y);
        }

    };
    this.moveDot = function (event) {
        // let orient = 0;
        // switch (event.keyCode) {
        //     case 37:
        //         orient = orientation_left;
        //         break;
        //     case 38:
        //         orient = orientation_up;
        //         break;
        //     case 39:
        //         orient = orientation_right;
        //         break;
        //     case 40:
        //         orient = orientation_down;
        //         break;
        // }
        // if (orient) {
        //     if(this.dot.orientation !== orient){
        //         this.dot.orientation = orient;
        //     } else {
        //         this.dot.move();
        //     }
        //     this.render();
        // }
        switch (event.keyCode) {
            case 37:
                this.dot.orientation = orientation_left;
                this.dot.move();
                this.render();
                break;
            case 38:
                this.dot.orientation = orientation_up;
                this.dot.move();
                this.render();
                break;
            case 39:
                this.dot.orientation = orientation_right;
                this.dot.move();
                this.render();
                break;
            case 40:
                this.dot.orientation = orientation_down;
                this.dot.move();
                this.render();
                break;
            case 69:
                GameBoard.dot.speed += 5;
                break;
            case 81:
                if (GameBoard.dot.speed <= 0) {
                    GameBoard.dot.speed = 5;
                }
                else GameBoard.dot.speed -= 5;
                break;
        }
    }
}
let GameBoard = new gameBoard();
GameBoard.start();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

