var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var foodGroup, obstacleGroup,ground;
var score;
var save=0;
var lose;
var bg, bgimg;

function preload(){
  monkey_running= loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage= loadImage("banana.png");
  obstacleImage= loadImage("obstacle.png");
  bgimg= loadImage("bg.jpg");
}

function setup() {
  createCanvas(400,400);
  
  bg= createSprite(200,200,400,400);
  bg.addImage(bgimg);
  
  monkey= createSprite(80,100,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale= 0.12;
  
  ground= createSprite(400,380,5000,50);
  ground.shapeColor="green";
  
  obstacleGroup= createGroup();
  foodGroup= createGroup();

  score=0;
}


function draw() {
  background(rgb(153, 255, 51));
  
  SpawnObstacles();
  SpawnFood();
  
   if(keyDown("space")&& monkey.y>=300){
     monkey.velocityY=-17;
   }
   
   monkey.velocityY= monkey.velocityY+0.8;
   monkey.collide(ground);
   
   if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score+=1;
     monkey.scale+= +0.03;
   }
  
  if(obstacleGroup.isTouching(monkey)){
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(405);
    obstacleGroup.setLifetimeEach(405);
    
    monkey.velocityY=0;
    ground.velocityX=0;
  }
    drawSprites();
  
  if(obstacleGroup.isTouching(monkey)){
    textSize(40);
    fill("white");
    text("GAME OVER",100,150);
  }  


  textSize(20);
  fill("white");
  text("Score:"+score,310,40);
  
  textSize(20);
  save= Math.round(frameCount/frameRate());
  fill("white");
  text("Survival Time:"+save,50,40);
}

function SpawnObstacles(){

  if(frameCount % 150===0){
   var rock= createSprite(400,325,20,20);
   rock.addImage(obstacleImage);
   rock.velocityX=-7;
    
   var rand= Math.round(random(1,4));
   switch (rand){
     case 1: rock.addImage(obstacleImage);
       break;
       default:break;
   }
  
   rock.scale=0.2;    
   rock.lifetime=-1;
  
   obstacleGroup.add(rock);
  }
}

function SpawnFood(){
  
  if(frameCount% 80===0){
    banana= createSprite(600,250,40,10);
    banana.y= random(200,210);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    
    banana.lifetime=-1;  
    
    banana.depth=monkey.depth;
    monkey.depth=banana.depth+1;
    
    foodGroup.add(banana);
  }
}