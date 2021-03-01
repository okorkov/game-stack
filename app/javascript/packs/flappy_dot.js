document.addEventListener("DOMContentLoaded", flappyDotInit);

function flappyDotInit() {
  document.getElementById('flappy-dot').addEventListener('click', (e) => {
    if(document.getElementById('carousel') !== null) {
      document.getElementById('carousel').remove();
    }
    if(document.getElementById('trivia-template') !== null) {
      document.getElementById('trivia-template').remove();
    }
    if( document.getElementById('canvas1') === null ) {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('id', 'canvas1');
      document.getElementById('carousel-parent').appendChild(canvas);
    }
    startFlappyGame();
  })
}

function startFlappyGame() {
  class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.width = 20;
    this.height = 20;
    this.weight = 1;
  }

  update() {
    this.vy += this.weight;
    this.y += this.vy;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  flap() {
    this.vy -= 2;
  }

}

const bird = new Bird();

  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  canvas.width = 600;
  canvas.height = 400;

  let spacePressed = false;
  let angle = 0;
  let hue = 0;
  let frame = 0;
  let score = 0;
  let gameSpeed = 2;

  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.update();
    bird.draw();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') spacePressed = true;
  })

  window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false;
  })


}