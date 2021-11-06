const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

let engine;
let world;
var player,playerArcher,base
var playerArrows = [];
var arrow;

var fruit
var fruit_con
var rope
var mangoImg

var score=0;

var basket
var basketImg
var fan


function preload(){
mangoImg=loadImage("mango.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  base = new Base(300, random(450, height-300), 180, 150);
  player = new Player(285, base.body.position.y - 153, 50, 180);
  playerArcher = new Archer(340,base.body.position.y - 190,120,120);

  rope = new Rope(6,{x:random(1200,width/2),y:random(30,300)})
  fruit = Bodies.circle(700,30,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  basket= new Basket(width/2-100,height-height/7,150,100)

  fan = createImg('fan.png');
  fan.position(width-200,height-500);
  fan.size(150,150);
  fan.mouseClicked(blow);
}


function draw() 
{
  background(51);
  Engine.update(engine);

  fill("white");
  text("Score:"+score,width-100,height-700)
  
  if(fruit!=null){
    image(mangoImg,fruit.position.x,fruit.position.y,60,60);
  }
  
  for (var i = 0; i < playerArrows.length; i++) {
    showArrows(i, playerArrows);
  }
  
  base.display();
  player.display();
  playerArcher.display();
  rope.show();
  basket.show();
  arrowCollision();
}

function keyPressed() {

  if(keyCode === 32){
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle+PI/2;

    var arrow = new PlayerArrow(posX, posY, 100, 10);

    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);

  }
}

function keyReleased () {

  if(keyCode === 32){
    if (playerArrows.length) {
      var angle = playerArcher.body.angle+PI/2;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function showArrows(index, arrows) {
  arrows[index].display();
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function blow()
{
Matter.Body.applyForce(fruit,{x:0,y:0},{x:-0.07,y:0});
}

function arrowCollision(){
  for (var i = 0; i < playerArrows.length; i++) {
    //var ropeCollision = Matter.SAT.collides(playerArrows[i].body,rope.body);
    var fruitCollision =Matter.SAT.collides(fruit.body,basket.Body);
    
    if(ropeCollision.collided){
      drop();
      if(fruitCollision.collided){
        score=score+100
      }
    }
}
}