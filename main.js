window.onload = function() {
  //Declaration variables
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");


  var stars = 10;
  var m;
  var n;
  var radius;
  var st = 1;

  var x = 450;
  var y = 175;
  var a = x + 37.5;
  var b = y - 15;

  var ast_x = Math.random() * (1000-20);
  var ast_y = Math.random() * (390-100);

  var fire = 0;
  var allow = 0;

  var score_txt = 0;

  var speed_x = 200;
  var speed_y = 200;
  var speed_b = 700;

  var t = Date.now();
  var dir = 0;
  var img = new Image();
  
  //Directions
  let right = document.getElementById('right');
  let left = document.getElementById('left');
  let up = document.getElementById('up');
  let down = document.getElementById('down');

  right.ontouchstart = function() {dir = 1;}
  left.ontouchstart = function() {dir = 2;}
  up.ontouchstart = function() {dir = 3;}
  down.ontouchstart = function() {dir = 4;}
  
  right.ontouchend = function() {dir = 0;}
  left.ontouchend = function() {dir = 0;}
  up.ontouchend = function() {dir = 0;}
  down.ontouchend = function() {dir = 0;}

  //Keyboard key press down
  document.onkeydown = function(event) {
    switch (event.keyCode) {
      case 37:
        console.log("Left key is pressed.");
        dir = 2;
        break;
      case 38:
        console.log("Up key is pressed.");
        dir = 3;
        break;
      case 39:
        console.log("Right key is pressed.");
        dir = 1;
        break;
      case 40:
        console.log("Down key is pressed.");
        dir = 4;
        break;
      case 32:
        console.log("Spacebar pressed")
        fire = 1;
        break;
    }
  }
  
  //Keyboard key up
  document.onkeyup = function(event) {
    switch (event.keyCode) {
      case 37:
        dir = 0;
        break;
      case 38:
        dir = 0;
        break;
      case 39:
        dir = 0;
        break;
      case 40:
        dir = 0;
        break;
      case 32:
        fire = 0;
        break;
    }
  }

  function draw() {

    //Time value  
    var timepassed = (Date.now()-t)/1000;
    t = Date.now();
    var fps_value = Math.round(1/timepassed);
    
    //Clear screen
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    
    //Display FPS
    context.font = '15px Arial';
    context.fillStyle = 'yellow';
    context.fillText("FPS: " + fps_value, 10, 35);

    //Asteroid creation
    context.beginPath();
    context.rect(ast_x, ast_y, 25, 25);
    context.fillStyle = 'white';
    context.fill();


    if (allow == 1){
        //Missle
        context.beginPath();
        context.rect(a, b, 5, 25);
        context.fillStyle="red";
        context.fill();
    }

    //Load image
    img.src = "/Images/ship.png";
    context.drawImage(img, x, y, 80, 80);

    b -= (speed_b * timepassed);

    //Movement
    if (dir == 1) {
      if (x + 65 < canvas.width){
        x += speed_x * timepassed;
      }
    }
    else if (dir == 2) {
      if (x+20 > 0) {
        x -= speed_x * timepassed;
      }
    }
    else if (dir == 3) {
      if (y > 0){
        y -= speed_y * timepassed;
      }
    }
    else if (dir == 4) {
      if (y < canvas.height-70){
        y += speed_y * timepassed;
      }
    }

    //Fire
    if (fire == 1) {
        a = x + 37.5;
        b = y - 15;
        console.log("Fire");
        allow = 1;
    }

    if (ast_x<=a+20 && a<=ast_x+20 && ast_y<=b+20 && b<=ast_y+20){
        score_txt++;
        ast_x = Math.random() * (1000-20);
        ast_y = Math.random() * (390-100);
    }
    
    window.requestAnimationFrame(draw);
  }
  
  //Display Score text
  function text() {
    context.font = '15px Arial';
    context.fillStyle = 'yellow';
    context.fillText('Points: ', 10, 15);
    window.requestAnimationFrame(text);
  }
  
  //Display Score points
  function score() {
    context.font = '15px Arial';
    context.fillStyle = 'yellow';
    context.fillText(score_txt, 70, 15);
    window.requestAnimationFrame(score);
  }

  //Resizing Canvas
  function resize_canvas(){
    canvas.width = window.innerWidth;
    setTimeout(function (){
      canvas.height = window.innerHeight;
    }, 0)
  }
  
  
  //Calling the functions
  resize_canvas();
  draw();
  text();
  score();
  
  window.addEventListener('resize_canvas', resize_canvas)

}
