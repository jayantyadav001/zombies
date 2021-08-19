var back,sunimg,sungroup,enemygroup,coin=0;
var plant,plantgroup,zombies,enemy,enemyimg;
var ball,balimg,bulletgroup,score = 0;

function preload()
{
  back = loadImage("images/background122.jpg")
  sunimg = loadImage("images/sunused.png");
  plantimg=loadAnimation("images/plant1.png","images/plant2.png","images/plant3.png");
  enemyimg = loadAnimation("images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png")
 ballimg = loadImage("images/ball.png")
}


function setup() {
  createCanvas(innerWidth,innerHeight);
sungroup = new Group();
plantgroup = new Group();
bulletgroup = new Group();
enemygroup = new Group();
}

function draw() {
  background(back); 
  Zombies();
  energy() 

  
  if(coin>=100)
  {
    createPlant();
  
  }
//Creating plants
for(var i=0;i<plantgroup.length;i++)
{
  if(plantgroup[i].dragstate===1)
  {

  
  if(mousePressedOver(plantgroup[i]))
  {
    plantgroup[i].x=mouseX;
    plantgroup[i].y=mouseY;
    //plantgroup[i].flag=false;
    break;
    //flag=false;

  }
  else {
    if(plantgroup[i].x>60)
    {
      plantgroup[i].dragstate = 2
    }
  }
}
}

//creating bullets
for(var x=0;x<plantgroup.length;x++)
{
  if(plantgroup[x].dragstate===2)
  {
    Bullet(plantgroup[x].x,plantgroup[x].y);
  
  }
}
kill()
  drawSprites();
  
  textSize(25)
  fill("brown")
  text("Energy "+coin,20,40)
  text("score "+score,width-100,40)

  
}



function energy()
{
  if(frameCount%100===0)
{
  sun = createSprite(random(100,width/2),50)
  sun.addImage("sun",sunimg)
 sun.scale= 0.2;
 sun.velocityY = 1;
sun.lifetime = height;
sungroup.add(sun);
}

for(var i=0;i<sungroup.length;i++)
{
  if(mousePressedOver(sungroup[i]))
  {
    coin+=25;
    sungroup[i].destroy();
  }
}



}


function createPlant()
{
  plant = createSprite(40,120)
  plant.addAnimation("plant",plantimg)
  plant.scale= 2;
  coin=coin-100;
  plant.dragstate = 1;
//plant.flag=true;
  plantgroup.add(plant)  
  
}
function Zombies()
{
    

  if(frameCount%100===0)
{
  enemy = createSprite(width-150,random(90,height-200))
  enemy.addAnimation("enemy",enemyimg);
  enemy.scale = 1;
  enemy.debug = true;
  enemy.setCollider("rectangle",0,15,60,140)
  enemy.velocityX = -0.6;
  enemygroup.add(enemy)
  
}


}
function Bullet(x,y)
{
 if(frameCount%50===0)
 {
   bullet=createSprite(x,y,10,10);
   bullet.addImage("ball",ballimg) ;
   bullet.velocityX = 5
   bullet.scale = 0.5
   bullet.debug = true;
   bullet.setCollider("circle",100,0,40)
  bulletgroup.add(bullet)
  
  }

}
function kill()
{
  for(var a = 0;a<bulletgroup.length;a++)
  {
    for(var b=0;b<enemygroup.length;b++)
    {
      if(bulletgroup[a].isTouching(enemygroup[b]))
      {
        enemygroup[b].destroy()
        score+=5;
   //     bulletgroup[a].destroy();
   //     continue;
      }
    }
  }
}
