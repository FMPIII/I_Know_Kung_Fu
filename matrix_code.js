var letterSize = 26;
var lines = [];

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight,
  );
  background(0);
  var x = 0;
  for (var i = 0; i <= width / letterSize; i++){
    var line = new Line();
    line.generateLetters(
      x,
      random(-1000, 0)
    );
    lines.push(line);
    x += letterSize;
  }
  textSize(letterSize);
}

function draw() {
  background(0, 125);
  lines.forEach(function(line){
    line.render();
  });

}

function Letter(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchSpeed = round(random(2, 20));
  this.first = first;

  this.setToRandomLetter = function() {
    if (frameCount % this.switchSpeed ==0){
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }
  }

  this.rain = function(){
    // if (this.y >= height){
    //   this.y = 0;
    // } else{
    //   this.y += this.speed;
    // }
    // **the above code actually is the same as this one line**
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}


function Line(){
 this.letters = [];
 this.totalLetters = round(random(5, 30));
 this.speed = random(5,7);

this.generateLetters = function(x, y){
  var first = round(random(0,4)) ==1;
  for (var i =0; i <= this.totalLetters; i++){
    letter = new Letter(x, y, this.speed, first);
    letter.setToRandomLetter();
    this.letters.push(letter);
    y -= letterSize;
    first = false;
  }
}

this.render = function(){
  this.letters.forEach(function(letter) {
    if (letter.first){
      fill(175, 255, 175);
    }
    else {
     fill(0, 255, 70);
    }
    text(letter.value, letter.x, letter.y);
    letter.rain();
    letter.setToRandomLetter();
    });
  }
}
