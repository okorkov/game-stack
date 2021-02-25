
// Trivia Section
const triviaBackground = `
<div class='p-5 text-center bg-image'>
  <div class='mask' style='background-color: rgba(0, 0, 0, 0.6); padding: 50px; margin: 20px;'>
    <div class='d-flex justify-content-center align-items-center h-100'>
      <div class='text-white'>
        <h1 class='mb-3 text-uppercase'>Trivia Game</h1>
        <h1 id="players-name-form"></h1>
        <h3 id='score'>Score: 
        <span>0</span>
        </h3>
        <h3 id='question'>Question: </h3>
        <div class="container">
          <div class="row">
          <button type="button" id="question-1" class="col btn btn-primary" style="margin:2em;padding:25px;"></button>
          <br><br/>
          <button type="button" id="question-2" class=" col btn btn-primary" style="margin:2em;padding:25px;"></button>
            <div class="w-100"></div>
          <button type="button" id="question-3" class="col btn btn-primary" style="margin:2em;padding:25px;"></button>
          <br><br/>
          <button type="button" id="question-4" class="col btn btn-primary" style="margin:2em;padding:25px;"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`


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
    document.getElementById('carousel-parent').insertAdjacentHTML('afterend', triviaBackground);
    app.startGame();
  },

  startGame: function() {
    fetch(`http://localhost:3000/api/trivia/easy_question`).then(object => object.json()).then(object => console.log(object)); 
  }

}

document.addEventListener("DOMContentLoaded", app.init)

