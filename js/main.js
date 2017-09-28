//settings
var snakeX = 3;
var snakeY = 3;
var height = 30;
var width = 40;
var interval = 100;
var increment = 1;
//game variables
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var pX;
var pY;
var bX;
var bY;
var mX;
var mY;
var sX;
var sY;
var running = false;
var gameOver = false;
var direction = -1; // up=0, down = -1, right = 2
var int;
var score = 0;

/**
entry point of the game
*/

function run(){
    init();
    int = setInterval(gameLoop, interval);
}

function init(){
    createMap();
    createSnake();
    createFruit();
    createPred();
    createBlud();
    createMew();
}

/**
* Generate the map for the snake
*/

function createMap(){
    document.write("<table>");
    
    for( var y = 0; y < height; y++){
        document.write("<tr>");
        for( var x =0; x < width; x++){
            if(x == 0 || x == width -1 || y == 0 || y == height -1){
                document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
            } else {
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
            }
                
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

function createSnake(){
    set(snakeX, snakeY, "snake");
}

function get(x,y){
    return document.getElementById(x+"-"+y);
}

function set(x,y,value){
    if(x != null && y != null);
    get(x,y).setAttribute("class", value);
}

function rand(min,max){
    return Math.floor(Math.random() * (max-min) + min);
}

function getType(x,y){
    return get(x,y).getAttribute("class");
}

function createFruit(){
    var found = false;
    while(!found && (length < (width-2)*(height-2)+1)){
        var fruitX = rand(1,width-1);
        var fruitY = rand(1,height-1);
        if(getType(fruitX, fruitY) == "blank")
            found = true;
    }
    
    set(fruitX, fruitY, "fruit");
    fX = fruitX;
    fY = fruitY; 
    }




function createPred(){
    var found = false;
    while(!found && (length < (width-2)*(height-2)+1)){
        var PredX = rand(1,width-1);
        var PredY = rand(1,height-1);
        if(getType(PredX, PredY) == "blank")
            found = true;
    }
    
    set(PredX, PredY, "pred");
    pX = PredX;
    pY = PredY;
    
}

function createBlud(){
    var found = false;
    while(!found && (length < (width-2)*(height-2)+1)){
        var BludX = rand(1,width-1);
        var BludY = rand(1,height-1);
        if(getType(BludX, BludY) == "blank")
            found = true;
    }
    
    set(BludX, BludY, "blud");
    bX = BludX;
    bY = BludY;
    
}

function createMew(){
    var found = false;
    while(!found && (length < (width-2)*(height-2)+1)){
        var MewX = rand(1,width-1);
        var MewY = rand(1,height-1);
        if(getType(MewX, MewY) == "blank")
            found = true;
    }
    
    set(MewX, MewY, "mew");
    mX = MewX;
    mY = MewY;
}



window.addEventListener("keypress", function key(){
    //if key is W set direction up
    var key = event.keyCode;
    if(direction != -1 && (key == 119 || key == 87))
        direction = 0;
    //if key is S set direction down;
    else if(direction != 0 && (key == 115 || key == 83))
        direction = -1;
    //if key is A set direction left
    else if(direction != 2 && (key == 97 || key == 65))
        direction = 1;
    //if key is D set direction right
    else if(direction != 1 && (key == 100 || key == 68))
        direction =2;
    if(!running)
        running = true;
        else if(key == 32)
            running = false;
});

window.addEventListener("keydown", function key(){
    var key = event.keyCode;
    if(direction != -1 && (key == 38))
        direction = 0;
    else if(direction != 0 && (key == 40))
        direction = -1;
    else if(direction != 2 && (key == 37))
        direction = 1;
    //if key is D set direction right
    else if(direction != 1 && (key == 39))
        direction =2;
    if(!running)
        running = true;
        else if(key == 32)
            running = false;
});
    

function gameLoop(){
    if(running && !gameOver){
        update();
    } else if (gameOver){
        clearInterval(init);
    }
}



function update(){
    set(pX, pY, "pred");
    set(bX, bY, "blud");
    set(mX, mY, "mew");
    updateTail();
    set(tailX[length], tailY[length], "blank");
    if(direction == 0)
        snakeY--;
        else if(direction == -1)
            snakeY++;
        else if(direction == 1)
            snakeX--;
        else if(direction == 2)
            snakeX++;
        set(snakeX, snakeY, "snake");
    for(var i = tailX.length-1; i >= 0; i --){
        if(snakeX == tailX[i] && snakeY == tailY[i]){
            gameOver = true;
            break;
        }
    }
    
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1 || (snakeX == pX && snakeY == pY) || (snakeX == bX && snakeY == bY) || (snakeX == mX && snakeY == mY))
        gameOver= true;
        else if(snakeX == fX && snakeY == fY){
            score+=1;
            length+=increment;
            createFruit();
            createPred();
        }
    
    document.getElementById("score").innerHTML= "Score: "+ score;
}

function updateFruit(){
    if (tailX[1],tailY[1],"blank" ) {
        set(fruitX, fruitY, "squirt");
        score+=1;
    } else { (tail[3], tail[3], "blank")
        createFruit();
        score+=1;
        length+=increment;
    }
        
}
    
function updateTail(){
    for(var i = length; i > 0; i--){
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
        }
        
        tailX[0] = snakeX;
        tailY[0] = snakeY;
}
    

run();
