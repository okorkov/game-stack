// Trivia Section
const app = {

  init: function() {
    document.getElementById('trivia').addEventListener('click', app.openTrivia)
  },

  openTrivia: function() {
    document.getElementById('carousel').remove();
    let ctx = document.createElement('canvas');
    document.getElementById('carousel-parent').appendChild(ctx);
    ctx = canvas.getContext("2d");
    ctx.width = innerWidth - 150;
    ctx.height = 500;
    ctx.fillStyle = 'black';
  }
  
}


document.addEventListener("DOMContentLoaded", app.init)
