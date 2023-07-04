//Classe estrelas
class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 2);
		this.t = random(TAU);
	}
	
	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}
//Final da Classe estrelas. 

//Classe ovos
class Egg {
constructor(xpos, ypos, t, s) {
    this.x = xpos;
    this.y = ypos;
    this.tilt = t;
    this.scalar = s / 100.0;
    this.angle = 0.0;
}

wobble() {
    this.tilt = (this.angle) / 0.4;
    this.angle += 0.05;
}

  //Na funçao display sao construidos os atores, neste caso, os osciladores. Primeiro a coloração por meio da função display, argumento fill("parâmetros") e, em seguida, as figuras geométricas: circulos → a sintaxe circle(parâmetro da posição x, parâmetro da posição y, parâmetro do diâmetro). Os retângulos → a sintaxe rect(parâmetro da posição x, parâmetro da posição y, parâmetro da base do retângulo, parâmetro da altura do retângulo). E, finalmente, as linhas.
  display() {
    noStroke();
    fill(255);
    push();
    translate(this.x, this.y);
    rotate(this.tilt);
    scale(this.scalar);
    beginShape();
    vertex(0, -100);
    bezierVertex(2, 1, 3, 5,5, 4);
    bezierVertex(4, 5, 2, 0, 0, 0);
    bezierVertex(-2, 0, -4, -15, -4, -4);
    bezierVertex(-4, -6, -5, -1, 0, -1);
    endShape();
    pop();
}
}
//Final da Classe ovos.

//Classe ondas esféricas
class Ring {
start(xpos, ypos) {
    this.x = xpos;
    this.y = ypos;
    this.on = true;
    this.diameter = 1;
}
grow() {
    if (this.on == true) {
        this.diameter += 0.5;
        if (this.diameter > width * 2) {
            this.diameter = 0.0;
        }
    }
    }

display() {
    if (this.on == true) {
        noFill();
        strokeWeight(1);
        stroke(155, 153);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}
}
//Final da classe ondas esféricas

//Classe ovos e ondas.
class EggRing {
constructor(x, y, t, sp) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.sp = sp;
    this.circle = new Ring();
    this.ovoid = new Egg(this.x, this.y, this.t, this.sp);
    this.circle.start(this.x, this.y - this.sp/2);
}

transmit() {
    this.ovoid.wobble();
    this.ovoid.display();
    this.circle.grow();
    this.circle.display();
    if (circle.on == false) {
        circle.on = true;
    }
}
}
//Final da classe ovos e ondas.


//Variáveis do campo
var stars = [];
let er1, er2, er3, er4;


//variáveis da bola
let xBolinha = 20;
let yBolinha = 200;
let diâmetro = 20;
let raio = diâmetro / 2;

//velocidade da bolinha
let velocidadexBolinha = 20;
let velocidadeyBolinha = 12;
let raqueteComprimento = 12;
let raqueteAltura = 150;

//variáveis da raquete
let xRaquete = 3;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 640;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente= 0;

//sons do jogo
let rauqetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(0.85*displayWidth, 0.5*displayHeight);
  trilha.loop();
  for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
}
  
  er1 = new EggRing(width * 0.2, height * 0.2, 0.1, 10);
  er2 = new EggRing(width * 0.8, height * 0.2, 5, 15);
  er3 = new EggRing(width * 0.8, height * 0.8, 0.1, 10);
  er4 = new EggRing(width * 0.2, height * 0.8, 5, 20);
  
}
function draw() {
    background("#051933");
	fill(random(0,256), random(0,256), random(0,256))
	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
    mostraBolinha();
    movimentaBolinha();
    colisãoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaRaquete();
    //colisãoRaquete();
    colisãoRaquete(xRaquete, yRaquete);
    mostraRaquete(width-12, yRaqueteOponente);
    movimentaRaqueteOponente();
    colisãoRaquete(width-12, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
  

 
  
  er1.transmit();
  er2.transmit();
  er3.transmit();
  er4.transmit(); 
  
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diâmetro);
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function colisãoBorda(){
  if (xBolinha + raio > width ||
    xBolinha -raio < 0)
  {velocidadexBolinha *= -1;
  }
  
  if (yBolinha +raio > height ||
     yBolinha - raio < 0){
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
}
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
}
}

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 -30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();

}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function colisãoRaquete(){
  if (xBolinha - raio - xRaquete + raqueteCpmprimento && yBolinha + raio > yRaquete0){velocidadexBolinha *= -1;
    raquetada.play();                                       }
}

function colisãoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){velocidadexBolinha *= -1;
    raquetada.play();
    }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(0.1*width, 14, 40, 20);
  fill(255);
  text(meusPontos, 0.117*width, 30);
  fill(color(255, 140, 0));
  rect(0.9*width, 14, 40, 20);
  fill(255);
  text(pontosDoOponente, 0.917*width, 30);
    }

function marcaPonto(){
  if (xBolinha > width-7){meusPontos += 1;
  ponto.play();
  }
  if (xBolinha < 11){pontosDoOponente += 1;
  ponto.play();}
}



function mousePressed() {
  if (mouseX > 0 && mouseX < displayWidth && mouseY > 0 && mouseY < 0.7*displayHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
}
}