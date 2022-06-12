var swordWomen , bg,heart1,heart2,heart3,go;
var backgroundImg, swordImg, dragonImg,life1Img,life2Img,life3Img, slayImg,dogImg,ghostImg,gameOver
var dragonGroup, dogGroup,ghostGroup;
var bgSong;
var gameState="fight";
var life=3;
var score=0;
var Ibullet, IbulletGroup;

function preload()
{
  backgroundImg = loadImage("darkhell.jpg");
  swordImg =loadAnimation("swordwomen1.png","swordwomen2.png","swordwomen3.png","swordwomen4.png","swordwomen5.png","swordwomen6.png","swordwomen7.png","swordwomen8.png","swordwomen9.png","swordwomen10.png","swordwomen11.png","swordwomen12.png");
  slayImg =loadAnimation("slay1.png","slay2.png","slay3.png","slay4.png","slay5.png","slay6.png","slay7.png","slay8.png","slay9.png","slay10.png","slay11.png","slay12.png");
  dragonImg = loadImage("dragon.png");
  Song=loadSound("Music.mp3")
  life1Img=loadImage("heart_1.png");
  life2Img=loadImage("heart_2.png");
  life3Img=loadImage("heart_3.png");
  dogImg=loadImage("dog.png");
  gameOver=loadImage("gameover.gif")
 
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg. addImage(backgroundImg,"background");
  bg.scale= 5.9;
  bg.velocityX= -2;
 

  
  swordWomen = createSprite(displayWidth-1150,400,20,10);
  swordWomen. addAnimation("Worrior",swordImg);
  swordWomen.debug=true;
  swordWomen.setCollider("rectangle",40,20,200,200)
 

  heart1= createSprite(displayWidth-150,40,20,20);
  heart1.visible = false
  heart1.addImage(life1Img,"life");
  heart1.scale=0.4;

  heart2= createSprite(displayWidth-100,40,20,20);
  heart2.visible = false
  heart2.addImage(life2Img,"life");
  heart2.scale=0.4;

  heart3= createSprite(displayWidth-150,40,20,20);
  heart3.addImage(life3Img,"life");
  heart3.scale=0.4;

  go= createSprite(windowWidth/2,windowHeight/2,20,20);
  go.addImage("over",gameOver);
  go.visible = false





  dragonGroup= new Group();
  dogGroup=new Group();
  IbulletGroup=new Group();
  

 Song.loop();
 

  
}

function draw() {
  background(0);
  
 

  spawnDragons();
  spawnDogs();
  

  
  
 

  if(gameState==="fight")
  {
  
 
    if(frameCount % 1500===0)
    {
      bg.velocityX = bg.velocityX-5;

    }
     
     if(life===3)
     {
       heart3.visible = true
       heart1.visible = false
       heart2.visible = false
     }

     if(life===2)
     {
      heart3.visible = false
      heart1.visible = false
      heart2.visible = true
     }

     if(life===1)
     {
      heart3.visible = false
      heart1.visible = true
      heart2.visible = false
     }

     

    

       if (bg.x < 0){
        bg.x = bg.width;
      }

      if(keyDown("UP_ARROW"))
    {
      swordWomen.y=swordWomen.y-30;
    
    }

    if(keyDown("DOWN_ARROW"))
    {
      swordWomen.y=swordWomen.y+30;
    }

    if(keyDown("RIGHT_ARROW"))
    {
      swordWomen.x=swordWomen.x+30;
    }

    if(keyDown("LEFT_ARROW"))
    {
      swordWomen.x=swordWomen.x-30;
    }

    if(keyDown("space"))
    {
      swordWomen.changeAnimation("attack",slayImg);
      Ibullet = createSprite(displayWidth-1150,swordWomen.y,20,20);
      Ibullet.velocityX= 50;
      Ibullet.debug=true
      Ibullet.setCollider("rectangle",0,0,15,15)
      Ibullet.visible = false

      IbulletGroup.add(Ibullet);


     
    }

    if(keyDown("space") && IbulletGroup.isTouching(dragonGroup))
    {
     dragonGroup.destroyEach()
     score = score+1
    }

    if(keyDown("space") && IbulletGroup.isTouching(dogGroup))
    {
     dogGroup.destroyEach()
     score = score+2

    }

    if(swordWomen.isTouching(dragonGroup))
    {
      life=life-1;
      dragonGroup.destroyEach();
    }

    if(swordWomen.isTouching(dogGroup))
    {
      life=life-2;
      dogGroup.destroyEach();
    }

  if(life===0)
  {
    gameState = "end"
    
   
  }

} else
if(gameState==="end")
{
  
  bg.velocityX= 0;
  dragonGroup.setVelocityEach(0);
  dogGroup.setVelocityEach(0);
  dragonGroup.destroyEach();
  dogGroup.destroyEach();
  heart1.visible = false
  heart2.visible = false
  heart3.visible = false
  go.visible = true
  
  
}

 


  drawSprites();



  textSize(30);
  fill("white");
  text("score="+score,displayWidth-200,displayHeight/2-280)

 
}

function spawnDragons()
{
  if (frameCount % 300=== 0 )
  {
    var dragon= createSprite(1000,Math.round(random(100, 350),20,20));
    dragon.addImage("dragon",dragonImg)

    dragon.velocityX=-2
    dragon.debug=true

    if(frameCount % 1500===0)
    {
      dragon.velocityX = dragon.velocityX-5;

    }

    dragon.scale= 0.3;
    dragon.lifetime = 300;
  
    dragonGroup.add(dragon);
  
  }
}

function spawnDogs()
{
  if (frameCount % 1000=== 0 )
  {
    var dog= createSprite(500,Math.round(random(100, 250),20,20));
    dog.addImage("dog", dogImg);
    dog.debug = true

    dog.velocityX=-2

    if(frameCount % 1500===0)
    {
      dog.velocityX = dog.velocityX-5;

    }

  
    dog.lifetime = 300;

    
    dogGroup.add(dog);

    
  
  }
}



