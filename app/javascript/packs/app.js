// Trivia Section
const triviaBackground = `<div class='p-5 text-center bg-image'>
  <div class='mask' style='background-color: rgba(0, 0, 0, 0.6); padding: 50px; margin: 20px;'>
    <div class='d-flex justify-content-center align-items-center h-100'>
      <div class='text-white'>
        <h1 class='mb-3 text-uppercase'>Trivia Game</h1>
        <h3 id='score'>Score: </h3>
        <h3 id='question'>Question: asdasdasdasdasdasdasdsadasdsadasdsadsadasdasdasdasdasdasdasdsadsdsdasdasdsadsad</h3>
        <div class="container">
          <div class="row">
          <button type="button" id="question-1" class="col btn btn-primary" style="margin:2em;padding:25px;">First</button>
          <br><br/>
          <button type="button" id="question-2" class=" col btn btn-primary" style="margin:2em;padding:25px;">Second</button>
            <div class="w-100"></div>
          <button type="button" id="question-3" class="col btn btn-primary" style="margin:2em;padding:25px;">Third</button>
          <br><br/>
          <button type="button" id="question-4" class="col btn btn-primary" style="margin:2em;padding:25px;">Forth</button>
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
  }

}


document.addEventListener("DOMContentLoaded", app.init)

