
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey=createSprite(60,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
  //monkey.debug=true;
  
}


function draw() {
  background("white");
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y>=120){
    monkey.velocityY=-10;
    
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  }
 
  if(obstacleGroup.isTouching(monkey)){ 
    ground.velocityX = 0; 
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);    
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1); 
    bananaGroup.setLifetimeEach(-1); 
  }
  
  
  //add gravity
   monkey.velocityY = monkey.velocityY + 0.8
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
  
  monkey.collide(ground);
  
  Banana();
  Obstacle();
  
  drawSprites();
}

function Banana(){
  if(World.frameCount%80===0){
    banana=createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.07;
    banana.y=Math.round(random(120,200));
    banana.velocityX=-8;
    banana.setLifetime=400;  
    
    bananaGroup.add(banana);
  }
}

function Obstacle(){
  if(World.frameCount%300===0){
    obstacle=createSprite(400,330,20,20);
    obstacle.addAnimation("moving",obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    obstacle.setLifetime=400;
    
    obstacleGroup.add(obstacle);
  }
}




