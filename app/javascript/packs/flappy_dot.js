document.addEventListener("DOMContentLoaded", flappyDotInit);

function flappyDotInit() {
  document.getElementById('flappy-dot').addEventListener('click', (e) => {
    if(document.getElementById('carousel') != null) {
      document.getElementById('carousel').remove();
    }
    if(document.getElementById('trivia-template') != null) {
      document.getElementById('trivia-template').remove();
    }
  })
}


