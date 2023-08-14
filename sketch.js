var fundoImg, fundo;
var ufoImg, ufo;
var fogueteImg, foguete;
var coinImg, coin;
var explosaoImg, explosao; 

var coinGroup;
var ufoGroup;

var score = 0;
var life = 3;

var gameState = "play";

//carregar imagens
function preload() {
  fundoImg = loadImage("img/a.jpg")
  ufoImg = loadImage("img/ms.png")
  fogueteImg = loadImage("img/SUPERTHAIS.png")
  explosaoImg = loadImage("img/explosao.png")
  coinImg = loadImage("img/protagonista.png")


}


function setup() {
  createCanvas(1500,1100);

  //criar sprites
  fundo = createSprite(900,700)
  fundo.addImage(fundoImg)
  fundo.scale = 2.1

  foguete = createSprite(450,550)
  foguete.addAnimation("foguete", fogueteImg)
  foguete.addAnimation("explosão", explosaoImg)
  foguete.scale = 2.5

  coinGroup = new Group()
  ufoGroup = new Group ()

}

function draw() {
  background(0);

  drawSprites();

  textSize(25)
  fill("white")
  text("Vidas: " + life, 60,100)

  textSize(25)
  fill("white")
  text("Score: " + score, 60,70)
  
  //criar estado de jogo "play"
  if (gameState == "play")  {
    fundo.velocityX = 3;

    if (fundo.x > 1400) {
      fundo.x = 700
    }
    if (keyDown ("RIGHT_ARROW")) {
      foguete.x += 7;
    }  
    if (keyDown ("LEFT_ARROW")) {
      foguete.x -= 7;  
    }
    if (keyDown ("UP_ARROW")) {
      foguete.y -= 7;  
    }
    if (keyDown ("DOWN_ARROW")) {
      foguete.y += 7;  
    }
    
    removeLife()
    removeCoins()
    spawnAliens()
    spawnCoins()

    if (life == 0) { 
      gameState  = "end"
    }
  }



  //criar estado de jogo "end"
 if (gameState == "end") {

  //remover grupos

  coinGroup.destroyEach()
  ufoGroup.destroyEach()

  fundo.velocityX = 0
  foguete.velocityX = 0

  //mudar animação do foguete para explosão

  foguete.changeAnimation("explosao", explosaoImg)
  textSize(35)
  fill("orange")
  text("Game Over!!!", 300, 400)
 }
  
}

function spawnAliens() {
  if (frameCount % 60 == 0) {
    ufo = createSprite(random(30,770), random (10,450))
    ufo.addImage(ufoImg)
    ufo.velocityX = 3.5
    ufo.scale =1.0
    //tempo de vida do sprite
    ufo.lifeTime = 800
    ufoGroup.add(ufo)
  }
}

function spawnCoins() {
  if (frameCount % 60 == 0) {
    coin = createSprite(random(1,770), random (10,450))
    coin.addImage(coinImg)
    coin.velocityX = 5
    coin.scale = 0.9
    coin.lifetime = 800
    coinGroup.add(coin)
  } 
}

function removeCoins() {
  foguete.overlap(coinGroup, function(collector, collected){
    score += 1;
    collected.remove();
  });
}

function removeLife() {
  
}