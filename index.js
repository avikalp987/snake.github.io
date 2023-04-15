let inputDir = {x: 0 ,y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
let speed=4;
let score = 0;
let lastPaintTime=0;
let snakeArr = [
    {x: 13 , y: 15}
];
food = {x: 6, y: 7};





function main(ctime)
{
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    return;
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snakeArr)
{
    //if snake bites itself
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y)
        return true;
    }
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0)
    return true;
}
function gameEngine()
{
    //update the snake array and food
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        musicsound.pause();
        inputDir = {x:0,y:0};
        alert("Game over, press any key to play again")
        snakeArr = [{x:13,y:15}];
        //musicsound.play();
        score=0;
        scoreBox.innerHTML = "Score : " + score;

    }

    // if you ate the food then increment the score and regenerate the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    {
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
        score+=1;
        if(score>hiscoreval)
        {
            hiscoreval =score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "HiScore : " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        let a = 2;
        let b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};
    }

    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //render the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0)
        snakeElement.classList.add('head');
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //dispaly the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



let hiscore = localStorage.getItem("hiscore");
let hiscoreval =0;
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "HiScore :" + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x: 0,y: 1};
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

    };
})