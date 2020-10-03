var PLAY=2;
var START=1;
var END=3;
var gameState = START;
var obstacle;
var obstacleImage;
var obstacleGroup;
var banana;
var bananaImage;
var bananaGroup;
var monkey;
var monkey_running;
var backgroundy;
var backgroundImage;
var score= 0;
var ground;
var song;
var win;
var winImage;
var change;
var changeImage;
var lose;
var loseImage;
var song1;
var song2;
var song3;

function preload(){
    
    backgroundImage= loadImage("unnamed.png");
    monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
    bananaImage= loadImage("banana.png");
    obstacleImage= loadImage("stone.png");
    gameOverImage=loadImage("gameover.jpg");
    restartImage=loadImage("restart.png");
    monkey_stop_img=loadImage("Monkey_02.png");
    song=loadSound("jump.mp3");
    song1=loadSound("win.mp3");
    song2=loadSound("monkey.mp3");
    //song3=loadSound("game-lose.mp3");
    winImage=loadImage("yw.jpg");
    change=loadImage("change.jpg");
    loseImage=loadImage("lose.jpg");

}

function setup() {  
    createCanvas(600,280);

    backgroundy= createSprite (270,120,400,400);
    backgroundy.addImage ("backgroundimage", backgroundImage);
    backgroundy.scale=3;
    backgroundy.velocityX= -0.75;
  
    changeImage=createSprite(200,40,400,400);
    changeImage.addImage(change);
  
    lose=createSprite(300,125,400,400);
    lose.addImage(loseImage);
    lose.scale=2;
    
    monkey= createSprite (70,140,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
  
    ground= createSprite (200,265,400,5);
    ground.visible= false;
  
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
  
    win=createSprite(300,125,50,50);
    win.addImage(winImage);
}

function draw() {
    background("white");
    //gameOver.visible=false;
  
  
   if(gameState===START){
      background("black");
      lose.visible=false;
      win.visible=false;
      changeImage.visible=false;
      backgroundy.visibe=false;
      obstacleGroup.setVisibleEach(false);
      bananaGroup.setVisibleEach(false);
      monkey.visible=false;
      backgroundy.visible=false;
      fill("yellow");
      textSize(30)
      text("MONKEY GO HAPPPY - 1",125,50);
      fill("red");
      textSize(22)
      text("1-SCORE 10 POINTS TO WIN THE GAME.",10,90);
      text("2-PRESS SPACE KEY TO JUMP.",10,115);
      text("3-DO NOT TOUCH THE OBSTACLES i.e. STONES.",10,140);
      text("4-IF YOU'LL TOUCH THE OBSTACLES, YOU'LL LOSE.",10,165)
      text("5-PRESS C KEY TO CONTINUE",10,190);
      
      if (keyWentDown("C")){
        gameState=PLAY;
      }
     }
    
    else if (gameState===PLAY){
    
    lose.visible=false;
    win.visible=false;
    changeImage.visible=false;
    monkey.visible=true;
    backgroundy.visible=true;
    obstacleGroup.setVisibleEach=true;
    
    
    if (backgroundy.x<20) {
      backgroundy.x= 250
    }   
    
    if (keyDown ("space") && monkey.y>=220) {
      monkey.velocityY= -18;
      song.play();
    }    
    monkey.velocityY= monkey.velocityY + 0.9;
    monkey.collide (ground);
  
    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
      song2.play();
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      score= 0;
      obstacleGroup.destroyEach();
      monkey.scale= 0.1;
      gameState=END;
    }
    if(score===10){
      win.visible=true;
      obstacleGroup.setVisibleEach=false;
      bananaGroup.setVisibleEach=false;
      banana.velocityX=0;
      obstacle.velocityX=0;
      monkey.velocityX=0;
      backgroundy.velocityX=0;
      background("white");
      monkey.visible=false;
      banana.visible=false;
      obstacle.visible=false;
      changeImage.visible=true;
      song1.play();
      
    }
  }
     
  else if(gameState===END){
    lose.visible=true;
    win.visible=false;
      obstacleGroup.setVisibleEach=false;
      bananaGroup.setVisibleEach=false;
      banana.velocityX=0;
      obstacle.velocityX=0;
      monkey.velocityX=0;
      backgroundy.velocityX=0;
      background("white");
      monkey.visible=false;
      banana.visible=false;
      obstacle.visible=false;
      changeImage.visible=true;
      //song3.play();
  }   
    

    spawnBananas();
    spawnObstacles();
  
    drawSprites();
    fill("red");
    stroke ("black");
    textSize (20);
    text ("Score: "+score,190,70); 
}


function spawnBananas ()
{
  if (frameCount %90 === 0) {
    banana= createSprite (600,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.06;
    banana.velocityX= -5;
    banana.lifetime= 200;
    bananaGroup.add(banana);
    
  }
  
}


function spawnObstacles(){
  if (frameCount%150===0) {
      obstacle= createSprite(610, 247,10,10);
      obstacle.x=610 ;
      obstacle.addImage ("obstacleimage", obstacleImage);
      obstacle.velocityX=-6;
      obstacle.lifetime=200;
      obstacle.scale=0.18;
      obstacle.setCollider("rectangle",0,0,350,350);
      obstacleGroup.add(obstacle);
      
  }
  
}
