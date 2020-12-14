
//Canvas Width:400px, Height:400px

//Intro Splash Screen
//Add Original Idea
//Request Animation Frame
//Adding Sound
//Play again feature

//Constants
const canvas = document.querySelector("#canvas");
const context = canvas.getContext('2d');
const middlex = canvas.width/2;
const middley = canvas.height/2;
const scale = 10;
const borderColor = 'blue';
const backgroundColor = 'black';
const snakeColor = 'green;'
const snakeBorderColor = 'yellow';
const gameOverImg = document.getElementById('gameoverimg');
const winImg = document.getElementById('winimg');

//Variables
let snake = [
    {x: middlex, y:middley},
    {x: middlex + 10, y:middley},
    {x: middlex + 20, y:middley},
    {x: middlex + 30, y:middley},
    {x: middlex + 40, y:middley},
];
let score = 0;
let changing_direction = false;
let foodx;
let foody;

//Horizontal velocity
let dx = 0;
//Vertical Velocity 
let dy = -10;


main();
spawnFood();
document.addEventListener("keydown", changeDirection);


function main(){
    if(CheckWallCollision()){
        gameOver();
        return;//if wall has collided, returns out of main and exits the game
    }

    if(score >= 50){
        win();
        return;
    }

    changing_direction = false;
    setTimeout(function onTick(){
        clear();
        drawFood();
        moveSnake();
        DrawSnake();
        main()
    }, 100)
}


function DrawBodyPart(bodyPart){
    context.fillStyle  = snakeColor;
    context.strokestyle  = snakeBorderColor;
    context.fillRect(bodyPart.x, bodyPart.y, scale, scale);
    context.strokeRect(bodyPart.x, bodyPart.y, scale, scale);
}

function DrawSnake(){
    snake.forEach(DrawBodyPart);
}

function clear(){
    context.fillStyle = backgroundColor;
    context.strokestyle = borderColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeRect(0, 0, canvas.width, canvas.height);
}

function changeDirection(event){
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    if(changing_direction){
        return;
    }

    changing_direction = true;
    let readKey = event.keyCode;
    let isMovingUp = (dy === -10);
    let isMovingDown = (dy === 10);
    let isMovingRight = (dx === 10);
    let isMovingLeft = (dx === -10);

    if(readKey === LEFT && !isMovingRight){
        dx = -10;
        dy = 0;
    }
    if(readKey === UP && !isMovingDown){
        dx = 0;
        dy = -10;
    }
    if(readKey === RIGHT && !isMovingLeft){
        dx = 10;
        dy = 0; 
    }
    if(readKey === DOWN && !isMovingUp){
        dx = 0;
        dy = 10;
    }
}

function CheckWallCollision(){
    for(let i = 4; i < snake.length; i++){
        let hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if(hasCollided){
            return true;
        }
    }

    let left_collision = snake[0].x < 0;
    let right_collision = snake[0].x > canvas.width - scale;
    let top_collision = snake[0].y < 0;
    let bottom_collision = snake[0].y > canvas.height - scale;

    return left_collision || right_collision || top_collision || bottom_collision
}

function randomizeFood(min, max){
    return Math.round(((Math.random() * (max-min) + min) * 10) / 10);// random number that is divisible by 10
}

function spawnFood(){
    foodx = getRandomInt(2, 8) * 10;
    foody = getRandomInt(2, 8) * 10;
    //document.getElementById('score').innerHTML = "foodx: " + foodx + "foody" + foody;

    snake.forEach(function hasEaten(bodyPart){
        const hasEaten = bodyPart.x == foodx && bodyPart.y == foody;
        if(hasEaten){
            spawnFood();
        }
    })
}

function drawFood(){
    context.fillStyle = 'pink';
    context.strokeStyle = 'blue';
    context.fillRect(foodx, foody, scale, scale);
    context.strokeRect(foodx, foody, scale, scale);
}

function moveSnake(){
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    let hasEatenFood = snake[0].x === foodx && snake[0].y === foody;
    if (hasEatenFood) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        spawnFood();
    }
    else {
        snake.pop();
    }
}

function getRandom10(min, max) {
    return getRandomInt(min / 10, max / 10) * 10;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameOver(){
    context.drawImage(gameOverImg, middlex - 40, middley - 60, 80, 60);
}

function win(){
    context.drawImage(winImg, middlex - 60, middley - 80, 140, 120);

}
