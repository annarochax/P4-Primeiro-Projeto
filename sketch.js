let video;
let detetar;
let detecoes = [];
let numPessoas;
let tamanho = 40;
let v;
let ctx;

let string = "Chama amigos :)";
const stringList = [
  "Democracia",
  "Constituição",
  "Justiça",
  "Liberdade",
  "25 abril"];

function preload(){
  detetar = ml5.objectDetector('cocossd');
  font = loadFont('assets/InstrumentSerif-Regular.ttf');
  //lines = loadStrings("25abril.txt");
}

function detetou(error, results){
  if(error){
    console.log(error);
  }
  //console.log(results.filter(detetar => detetar.label === 'person'));
  detecoes = results.filter(detetar => detetar.label === 'person');
  
  numPessoas = detecoes.length;
  console.log(numPessoas);
  detetar.detect(video, detetou);
}

function setup() {
  let renderer = createCanvas(420, 594);
  ctx = renderer.drawingContext;
  textAlign(CENTER, CENTER);
  video = createCapture(VIDEO);
  video.size(width, height);
  //video.hide();
  detetar.detect(video, detetou);
}

function draw() {
  background(255);
  //image(video, 0, 0);
  fill(0);
  //letter spacing from CSS
  select('canvas').elt.style.letterSpacing = "2px";
  //This works
  ctx.font = '30px monospace';
  noStroke();
  for(let i = 0; i < detecoes.length; i++){
    if(detecoes.length===1){
      v = 10;
    } else if(detecoes.length===2){
      v=6;
    } else if(detecoes.length===3){
       v=3;
    } else if(detecoes.length>=4){
       v=0;
    }
    string = stringList[i];
    let objeto = detecoes[i];
    /*stroke(255);
    strokeWeight(2);
    noFill();
    rect(objeto.x, objeto.y, objeto.width, objeto.height);*/
  }
  text(string, width/2, height/2);
  filter(BLUR, v);
}