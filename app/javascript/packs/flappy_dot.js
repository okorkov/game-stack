const domain = 'http://localhost:3000'
// 'https://game-stack.herokuapp.com/'
// 'http://localhost:3000'

document.addEventListener("DOMContentLoaded", flappyDotStart);

function flappyDotStart() {
  document.getElementById('flappy-dot').addEventListener('click', (e) => {
    if(document.getElementById('carousel') !== null) {
      document.getElementById('carousel').remove();
    }
    if(document.getElementById('trivia-template') !== null) {
      document.getElementById('trivia-template').remove();
    }
    if(document.getElementById('flappy-dot-template') !== null) {
      document.getElementById('flappy-dot-template').remove();
    } 
    if(document.getElementById('score-table') !== null) {
      document.getElementById('score-table').remove();
      document.getElementById('score-button').remove();
    }
    if( document.getElementById('canvas1') === null ) {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('id', 'canvas1');
      document.getElementById('carousel-parent').appendChild(canvas);
      const instruction = document.createElement('h2')
      instruction.innerHTML = "Press 'SPACE' to Fly";
      instruction.style = "color:yellow;"
      document.getElementById('carousel-parent').appendChild(instruction);
      
    }
    document.getElementById('navbarToggleExternalContent').className = "collapse"
    startFlappyGame();
  })
}

const scoreForm = `
<div class='p-5 text-center bg-image' id="flappy-dot-template">
  <div class='mask' style='background-color: rgba(0, 0, 0, 0.6); padding: 50px; margin: 20px;'>
    <div class='d-flex justify-content-center align-items-center h-100'>
      <div class='text-white'>
        <div class="col d-flex justify-content-center text-center" id="score-button">
          <form action="/" method="post" id="submit-score">
          <input type="text" class="input-group" style="width: 200px;" placeholder="Enter your name here ..." required>
          <br>
          <input type="submit" class="btn btn-outline-warning" value="Get on the Board">
          </form>
        </div>
        <button id="play-again" class="btn btn-outline-success btn-lg">Play Again!</button>
      </div>
    </div>
  </div>
</div>`;

const scoreTable = `<br>
<table class="table table-dark table-striped table-bordered" id="score-table">
  <thead>
    <tr>
      <th scope="col"><strong>Top Scores</strong></th>
      <th scope="col"><strong>Gamer's Name</strong></th>
    </tr>
  </thead>
  <tbody id="table-body">
  </tbody>
</table>`;

function startFlappyGame() {

  let score = 0;
  class Dot {
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
    ctx.fillStyle = 'pink';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, this.height, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  flap() {
    this.vy -= 2;
  }

}
const dot = new Dot();

const particlesArray = [];

class Particle {
  constructor(){
    this.x = dot.x;
    this.y = dot.y;
    this.size = Math.random() * 7 + 3;
    this.speedY = (Math.random() * 1) - 0.5;
    this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }
  update() {
    this.x -= gameSpeed;
    this.y += this.speedY
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  particlesArray.unshift(new Particle)
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()
  }
  if(particlesArray.length > 200) {
    for(let j = 0; j < 20; j++) {
      particlesArray.pop(particlesArray[j]);
    }
  }
}

const obstaclesArray = [];

class Obscacle {
  constructor() {
    this.top = (Math.random() * canvas.height / 3) + 50;
    this.bottom = (Math.random() * canvas.height / 3) + 50;
    this.x = canvas.height;
    this.width = 20;
    this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0 , this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  update() {
    this.x -= gameSpeed;
    this.draw();
  }
}

function handleObscacles() {
  if(frame % 20 === 0) {
    obstaclesArray.unshift(new Obscacle);
  }
  for(let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if(obstaclesArray.length > 40) {
    obstaclesArray.pop(obstaclesArray[0])
  }
}

function handleCollision() {
  for(let i = 0; i < obstaclesArray.length; i++) {
    const pipe = obstaclesArray[i];
    if(dot.x < pipe.x + pipe.width &&
      dot.x + dot.width > pipe.x &&
      ((dot.y < 0 + pipe.top && dot.y + dot.height > 0) ||
      (dot.y > canvas.height - pipe.bottom &&
      dot.y + dot.height < canvas.height))) {
        ctx.font = '30px sans-serif';
        ctx.fillStyle = 'red';
        ctx.fillText(`HAHA WHAT A LOOSER! SCORED ONLY: ${score}`, 60, canvas.height / 2);
        return true;
    }
  }
}

function finishGame() {
  clearInterval(scoreCount);
  setTimeout(function(){
    canvas.remove();
    document.getElementById('carousel-parent').insertAdjacentHTML('afterend', scoreForm);
    document.getElementById('score-button').insertAdjacentHTML('afterend', scoreTable);
    fetch(`${domain}/api/flappy_dot/flappy_dot_top_10_players`).then(object => object.json()).then(object => fillScores(object));
    document.querySelector('h2').remove();
    submitScore();
    playAgain();
  }, 1000)
}

function fillScores(object) {
  const tableBody = document.getElementById('table-body')
  for(let i = 0; i < object.length; i++) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${object[i].score}</td>
    <td>${object[i].name}</td>`
    tableBody.appendChild(tr);
  }
}

function playAgain() {
  document.getElementById('play-again').addEventListener('click', function(e) {
    document.getElementById('flappy-dot-template').remove();
    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas1');
    document.getElementById('carousel-parent').appendChild(canvas);
    const instruction = document.createElement('h2')
    instruction.innerHTML = "Press 'SPACE' to Fly";
    instruction.style = "color:yellow;"
    document.getElementById('carousel-parent').appendChild(instruction);
    startFlappyGame();
    e.preventDefault();
  })
}

function submitScore() {
  document.getElementById('submit-score').addEventListener('submit', function(e) {
    const name = document.getElementById('submit-score').childNodes[1].value;
    submitData(name, score);
    document.getElementById('submit-score').remove();
    document.getElementById('score-table').remove();
    document.getElementById('score-button').insertAdjacentHTML('afterend', scoreTable);
    updateScore()
    e.preventDefault();
  })
}

function submitData(name, score) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({'name': name, 'score': score, 'game_id': 2})
  }
  return fetch(`${domain}/api/flappy_dot/add_score`, config)
  .then(function(response) {
    return response.text();
  }).catch(function(error) {
    alert("Failed to save score");
    return error.message;
  });
}


function updateScore() {
  fetch(`${domain}/api/flappy_dot/flappy_dot_top_10_players`).then(object => object.json()).then(object => fillScores(object))
}


  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 600;

  let spacePressed = false;
  let angle = 0;
  let frame = 0;
  let gameSpeed = 5;

  function animate(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dot.update();
    dot.draw();
    ctx.fillStyle = 'red';
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 650, 80);
    ctx.fillText(score, 650, 80);
    handleParticles();
    handleObscacles();
    handleCollision();
    if(handleCollision()) return finishGame();
    requestAnimationFrame(animate);
    angle += 0.12;
    frame ++;
    
  }

  animate();

  const scoreCount = setInterval(function() {
    score += 1;
  }, 1000);


  window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') spacePressed = true;
  })

  window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false;
  })

  window.addEventListener('touchstart', function(e) {
    spacePressed = true;
  }, false)

  window.addEventListener('touchend', function(e) {
    spacePressed = false;
  }, false)

}