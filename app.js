let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
let gridSize = 20;
let snakeColor = "black";
let foodColor = "violet";
let snake = [{x:10, y:10,}];
let food = {x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20),};
let dx=0, dy=0;
let point = document.getElementsByTagName('h1')[0];
let score = 0;
let speed=300;
// draw snake
function drawSnake(snakeEl){
    snakeEl.forEach(
        segment => {
            ctx.fillStyle=snakeColor;
            ctx.fillRect(segment.x*gridSize, segment.y*gridSize, gridSize, gridSize);
        }
    );
}
// draw food
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x*gridSize, food.y*gridSize, gridSize, gridSize);
}
// move snake
function moveSnake(){
    let head = {x:snake[0].x+dx, y:snake[0].y+dy};

    // unshipt() -> massive deer utga nemne
    snake.unshift(head);
   
    if(head.x == food.x && head.y == food.y){
        score = score+1;
        food = {
            x:Math.floor(Math.random()*20),
            y:Math.floor(Math.random()*20),
        }
        point.innerText=Math.floor(score);
    }else{
        snake.pop();
    }
    if( head.x == 20 || head.y == 20 || head.x < 0 || head.y < 0){
        alert("Game over");
        snake = [{x:10, y:10,}];
        dx=0, dy=0;
        food = {x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20),};
        score = 0;
        point.innerText=Math.floor(score);
    }
    //.pop() -> massive aas ehnii utgiig hasna
    // clearRect -> tseverlene
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawFood();
    drawSnake(snake);
}
if(score >=1){
    speed=100;
}
setInterval(moveSnake, speed);

document.addEventListener('keydown',(edo)=>{
    console.log(edo.key);
    if(edo.key=="ArrowUp"){
        if(dy!==1){
            dx=0;
            dy=-1;
        }else{
            alert("Cannot turn this way");
        }
    }else if(edo.key=="ArrowDown"){
        if(dy!==-1){
            dx=0;
            dy=1;
        }
    }else if(edo.key=="ArrowRight"){
        if(dx!==-1){
            dx=1;
            dy=0;
        }
    }else if(edo.key=="ArrowLeft"){
        if(dx!==1){
            dx=-1;
            dy=0;
        }
    }else{
        alert("Wrong Key");
    }
});