// Trivia Section
const app = {

  init: function() {
    document.getElementById('trivia').addEventListener('click', app.openTrivia)
  },

  openTrivia: function() {
    document.getElementById('carousel').remove();
    let canvas = document.createElement('canvas');
    canvas.width = innerWidth - 150;
    canvas.height = 500;
    document.getElementById('carousel-parent').appendChild(canvas);
    let ctx = canvas.getContext('2d');
    // ctx.fillStyle = 'black';
    // ctx.fill();
  }
  
}


document.addEventListener("DOMContentLoaded", app.init)
