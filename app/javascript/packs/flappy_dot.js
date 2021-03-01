document.addEventListener("DOMContentLoaded", flappyDotStart);

function flappyDotStart() {
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
    let curve = Math.sin(angle) * 20;
    if(this.y > canvas.height - (this.height * 3) + curve) {
      this.y = canvas.height - (this.height * 3) + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if(this.y < this.height) {
      this.y = this.height
      this.vy = 0;
    }
    if(spacePressed && this.y > this.height * 3) {
      this.flap();
    }
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

  canvas.width = 800;
  canvas.height = 600;

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
    angle += 0.12;
  }

  animate();

  window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') spacePressed = true;
  })

  window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false;
  })


}