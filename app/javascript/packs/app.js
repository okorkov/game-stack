// Trivia Section
const app = {

  init: function() {
    document.getElementById('trivia').addEventListener('click', app.openTrivia)
    document.getElementById('logo').addEventListener('click', app.logoClick)
  },

  logoClick: function() {
    location.reload();
  },

  openTrivia: function() {
    document.getElementById('carousel').remove();
    let canvas = document.createElement('canvas');
    canvas.width = innerWidth - 150;
    canvas.height = 650;
    document.getElementById('carousel-parent').appendChild(canvas);
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fill();
  }

}


document.addEventListener("DOMContentLoaded", app.init)
