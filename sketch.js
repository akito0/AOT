
var PLAY = 1;
var END = 0 ; 
var SERVE;
var GameState= SERVE;

//var b, c, bg, l, latck;
var beastTitan, ymirTitan, titan, beastTitanImg, ymirTitanImg, titanImg ;
var restartImg, restart;
var swordImg, rockImg, sword,rock;
var Landscape, levi;
var gameOverImg, gameOver;
var beastTitanSound, backSound;

var score = 0;


function preload(){
  //to preload images and sound
      
      l = loadImage("levi0.gif");      
      bg = loadImage("background.jpeg");
      swordImg = loadImage("sword.png");
      rockImg = loadImage("rock.png");
      beastTitanImg = loadImage("beast_titan.png");
      ymirTitanImg = loadImage("ymir.png");
      titanImg = loadImage("titan.png");
  gameOverImg = loadImage("gameOver.png");
  beastTitanSound = loadSound("beastTitan.mp3");
  restartImg = loadImage("restart.png");
 
  
}

function setup() {
  createCanvas(600,600);
  
  //background
  Landscape = createSprite(300,300,600,600);
  Landscape.addImage(bg);
  Landscape.scale =1.75;
  Landscape.velocityX = 5;
  
  //player sprite
  levi = createSprite(300,300,50,50);
  levi.addImage(l);
  levi.scale = 0.4;
  levi.debug =false;
  levi.setCollider ("rectangle",0,0,200,300);
  
  //gameOver sprite
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;
  gameOver.visible= false;
  
  //restart 
  restart = createSprite(300,350);
  restart.addImage(restartImg);
  restart.scale = 0.3;
  restart.visible = false;
  
  //groups
  swordsG = new Group();
  titanG = new Group();
  beastTitanG = new Group();
  ymirTitanG = new Group();
  rockG= new Group();

 
}

function draw() {
  background("lightyellow");
  
  if(GameState === SERVE){
    fill("black");
    textSize(21);
    text("The people inside wall rose were living in peace until now,",50,100);
    text("but, the titans have now invaded the wall and are planning", 50,130);
    text("to kill people.",50,160);
    textSize(25);
    text("As usual, captain Levi will come to the saviour!",50,250);
    textSize(20);
    text("PRESS SPACE TO START!",150,300);
    
  }
  if(keyDown("space")){
           GameState = PLAY;
             }
  
  if(GameState===PLAY){
   
  if(Landscape.x<150){
    
    Landscape.x = 450;
  }
    
  
  if(mousePressedOver(levi)){
    
    spawnSwords();
  
  }
  
    //to move the player freely
    levi.x=mouseX;
    levi.y =mouseY;

    // increasing difficulty
     if(score % 10 === 0){
    
    Landscape.velocityX = -(5+score/10)
  }
    
    var select_obstacle = Math.round(random(1,5));
  
  if(frameCount % 60 === 0){
    
    if(select_obstacle === 1){
      
      spawnTitan();
    }else if(select_obstacle === 2){
      
      spawnYmirTitan();
    }else{
      
      spawnBeastTitan();
    }
  }
    
   
    if(levi.isTouching(titanG)){
      GameState =  END;
    }
    if(levi.isTouching(beastTitanG)){
      GameState = END;
    }
    if(levi.isTouching(ymirTitanG)){
      GameState = END;
    }
    if(levi.isTouching(rockG)){
      GameState =END;
    }
    
    if(swordsG.isTouching(titanG)){
      titanG.destroyEach();
      swordsG.destroyEach();
      score+= 1;
    }
    if(swordsG.isTouching(ymirTitanG)){
      ymirTitanG.destroyEach();
      swordsG.destroyEach();
      score+= 2;
    }
    if(swordsG.isTouching(beastTitanG)){
      beastTitanG.destroyEach();
      swordsG.destroyEach();
      score+= 4;
    }
    if(swordsG.isTouching(rockG)){
      rockG.destroyEach();
      swordsG.destroyEach();
      
      
    }
    
    
     drawSprites();
    textSize(20);
    fill("violet");
  text("score:"+score,40,50);
  
  }
if(GameState===END){
  Landscape.velocityX= 0;
  gameOver.visible = true;
  levi.visible =false;
  restart.visible = true;
  titanG.destroyEach();
  ymirTitanG.destroyEach();
  beastTitanG.destroyEach();
  swordsG.destroyEach();
  rockG.destroyEach();
  beastTitanSound.stop();
  
  drawSprites();
  
  if(mousePressedOver(restart)){
    
      GameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      levi.visible = true;
      score = 0;
  }
  
}
  
}
  
function spawnSwords(){
  
   sword = createSprite(200,300);
  sword.addImage(swordImg);
  sword.scale = 0.03;
  sword.x = levi.x+20;
  sword.y = levi.y;
  sword.velocityX = -4;
  sword.lifetime = 500;
  
  sword.debug = false;
  sword.setCollider("rectangle",0,0,200,160);
  
  levi.depth = sword.depth;
  levi.depth += 1;
  
  swordsG.add(sword);
}

function spawnTitan(){
   titan = createSprite(0,Math.round(random(0,600)),0,0);
  titan.velocityX = 1;
  titan.addImage(titanImg);
  titan.scale = 0.2;
  titan.lifetime = 500;
  
  
  titan.debug = false;
  titan.setCollider("circle",0,0,200)
  

  
  titanG.add(titan);
    
  
}

function spawnBeastTitan(){
   beastTitan = createSprite(0,windowHeight/2-150);
  beastTitan.addImage(beastTitanImg);
  beastTitan.velocityX = 3;
  beastTitan.lifetime = 500;
  beastTitan.scale = 0.025;
  beastTitanSound.play();
  
  beastTitan.debug = false;
  beastTitan.setCollider("circle",0,0,2000);
 
  beastTitanG.add(beastTitan);
  
  rock = createSprite(0,windowHeight/2-140);
  rock.addImage(rockImg);
  rock.scale = 0.02;
  rock.velocityX = 4;
  rock.debug = false;
  rock.setCollider("circle", 0,0,1000);
  rockG.add(rock);

  
}

function spawnYmirTitan(){
  
   ymirTitan = createSprite(0,Math.round(random(0,600)),0,0);
  ymirTitan.addImage(ymirTitanImg);
  ymirTitan.velocityX = 2;
  ymirTitan.lifetime = 500;
  ymirTitan.scale = 0.2;
  
  ymirTitan.debug = false;
  ymirTitan.setCollider("rectangle",0,0,350,500);
    
  
  
  
  ymirTitanG.add(ymirTitan);
}