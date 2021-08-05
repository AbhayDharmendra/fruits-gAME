//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  //load sound here

   cut=loadSound("knifeSwoosh.mp3")
   gameover=loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("circle",0,0,70);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  textFont("Poppine")
  stroke("yellow")
  fill("red")
  textSize(25);
  text("Score : "+ score,250,50);

  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score=score+2
      cut.play()
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        monsterGroup.destroyEach();
        gameState=END;
        gameover.play()
      
    
        //add gameover sound here
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
  }
  }
  }
  
  drawSprites();
  
}




function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1){
    fruit.x=50;
    fruit.velocityX=8+(score/5)
    }
    else
    {
      if(position==2){
      fruit.x=550;
      fruit.velocityX= -(8+(score/5));
      }
    }
  
     r=Math.round(random(1,4));
    switch(r){
      case 1:fruit.addImage(fruit1);
      break;
      case 2:fruit.addImage(fruit2);
      break;
      case 3:fruit.addImage(fruit3);
      break;
      case 4:fruit.addImage(fruit4);
      break;
      default:break
    }
    fruit.setLifetime=100;
    fruit.y=Math.round(random(100,550));
    fruit.setCollider("circle",0,0,100) 
    fruitGroup.add(fruit);
  }
}

function Monster(){
  if(World.frameCount%250===0){
    var i=Math.round(random(1,2))
    monster=createSprite(500,300,20,20);
    monster.addAnimation("moving", monsterImage);
    
    //update below give line of code for increase monsterGroup speed by 10
      if(i===1){
        monster.x=50
        monster.velocityX=8+(score/8)
      }
      else{
        if(i===2){
          monster.x=550
          monster.velocityX=-(8+(score/8))
        }
      }
      monster.y=Math.round(random(100,500));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}