var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var Margin1, Margin2, Margin3;

var gameState = "instruction";
play = 0;
end = 1;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");

  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

   Margin1 = createSprite(1,300,10,900);
   Margin1.visible = false;
   Margin2 = createSprite(600,300,10,900);
   Margin2.visible = false;
   Margin3 = createSprite(300,1,900,10);
   Margin3.visible = false;
}


function draw() {
  background("black");

  createEdgeSprites();
    ghost.collide(climbersGroup);
    ghost.collide(Margin1);
    ghost.collide(Margin2);
    ghost.collide(Margin3);
    
  if(gameState === "instruction"){
    textSize(25);
    fill("Green");
    text("Climb and don't touch doors,",10,290);
    text("If you touch doors gravitational force will pull you.",10,320);

    if(frameCount % 100 == 0){
      gameState = play;
    }
  }
  
  if (gameState === 0) {
    drawSprites();

    if(keyDown("left")){
      // write a code to move left when left arrow is pressed
      ghost.velocityX = ghost.velocityX - 1;
    }
    if(keyDown("right")){
      // write a code to move left when right arrow is pressed
      ghost.velocityX = ghost.velocityX + 1;
    }
    if(keyDown("space")){
      // write a code to move up when space arrow is pressed
      ghost.velocityY = ghost.velocityY - 2;

    }
  
     ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //write a condition for infinte scrolling tower
      if(tower.y>500){
        tower.y = 300;
      }
    
      spawnDoors();

  
      //write a code to make climbersGroup collide with ghost change the ghost velocity  
      if(ghost.isTouching(invisibleBlockGroup)){
        ghost.velocityY = ghost.velocityY + 9;
      }

      //write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
      if(ghost.y>600){
        gameState = end;
      }
  
}
  if (gameState === 1){
    stroke("blue");
    fill("red");
    textSize(100);
    text("Game Over", 15,300);
    textSize(40);
    text("Press 'f5' to restart",100,350);
  }
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var door = createSprite(random(1,600), -50);
    var climber = createSprite(random(1,600),10);

    var invisibleBlock = createSprite(random(1,600),25);
    invisibleBlock.debug = true;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //change the depth of the ghost and door
    door.depth = ghost.depth;
    climber.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
    door.lifetime = 900;
    climber.lifetime = 900;

    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
  }
}

