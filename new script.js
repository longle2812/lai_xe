const positionX = 0;
const positionY = 0;
var radius = 20;
let speed = 20;
let ctx = document.getElementById("myCanvas").getContext("2d");
let enemyList = [];

let Player = function () {
    this.posX = positionX;
    this.posY = positionY;
    this.radius = radius;
    this.speed = speed;
    this.create = function () {
        ctx.beginPath();
        ctx.arc(this.posX + radius, this.posY +radius, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
    this.move = function (event) {
        switch (event.keyCode) {
            case 40: //down
                this.posY += this.speed;
                break;
            case 38: //up
                this.posY -= this.speed;
                break;
            case 37: //left
                this.posX -= this.speed;
                break;
            case 39: //right
                this.posX += this.speed;
                break;
        }
    }
}

let Reward = function () {
    this.posX = 780;
    this.posY = 580;
    this.radius = radius;
    this.create = function () {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
    }
}
let Enemy = function (X, Y, radius) {
    this.posX = X;
    this.posY = Y;
    this.radius = radius;
    this.speed = 1;
    this.create = function () {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
    this.move = function () {
        let check = random(1,4);
        this.speed = random(1,2);
        switch (check) {
            case 1:
                this.posX += 2*this.speed;
                this.posY += this.speed;
                break;
            case 2:
                this.posX -= 2*this.speed;
                this.posY -= this.speed;
                break;
            case 3:
                this.posY += this.speed;
                this.posY += this.speed;
                break;
            case 4:
                this.posY -= this.speed;
                this.posY -= this.speed;
                break;
        }
    }
    this.update = function () {
        this.create();
        this.move();
    }
}

function spawnEnemies () {
    setInterval(() => {
        let x = Math.random() * 800;
        let y = Math.random() * 600;
        let enemy = new Enemy(x, y, radius);
        enemyList.push(enemy);
    },3000)
}

function deleteEnemies () {
    for (i = 0; i < enemyList.length; i++) {
        if ((enemyList[i].posX - enemyList[i].radius < 0) ||
            (enemyList[i].posY - enemyList[i].radius < 0) ||
            (enemyList[i].posX + enemyList[i].radius > 800) ||
            (enemyList[i].posY + enemyList[i].radius > 600))
        {
            enemyList.splice(i,1);
        }
    }


}

//Start game
//create Player 1
let player1 = new Player();
player1.create();
let reward = new Reward();
reward.create();
//
//create Enemy
for (let i = 0; i < 7; i++) {
    let X = Math.random() * 800;
    let Y = Math.random() * 600
    var enemy = new Enemy(X, Y, radius);
    enemyList.push(enemy);
    enemy.create();
}
//
render();
spawnEnemies();
function render () {
    var cancelID = requestAnimationFrame(render);
    ctx.clearRect(0, 0, 800, 600);
    player1.create();
    reward.create();
    enemyList.forEach((enemy) => enemy.update());
    deleteEnemies();
    checkWin(cancelID);
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkWin(cancelID) {
    for (i = 0; i < enemyList.length; i++) {
        let dist = Math.hypot(player1.posX - enemyList[i].posX,
            player1.posY - enemyList[i].posY)
        if ((dist - player1.radius - enemyList[i].radius) < 1) {
            alert("You lose");
            cancelAnimationFrame(cancelID);
        }
    }
    if (player1.posX >= (reward.posX - (2*player1.radius)) && (player1.posY >= (reward.posY - (2*player1.radius )))) {
        alert("You won");
        cancelAnimationFrame(cancelID);

    }
}


