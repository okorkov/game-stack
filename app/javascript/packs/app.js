
// Trivia Section
const triviaBackground = `
<div class='p-5 text-center bg-image'>
  <div class='mask' style='background-color: rgba(0, 0, 0, 0.6); padding: 50px; margin: 20px;'>
    <div class='d-flex justify-content-center align-items-center h-100'>
      <div class='text-white'>
        <h1 class='mb-3 text-uppercase' style="color:#931A00;">Trivia Game</h1>
        <h1 id="players-name-form"></h1>
        <h3 id='score' style="color:yellow;">Score: 
        <span>0</span>
        </h3>
        <h3 id='question'>Question: </h3>
        <div class="container">
          <div class="row">
          <button type="button" class="col btn btn-primary questions" style="margin:2em;padding:25px;"></button>
          <br><br/>
          <button type="button" class=" col btn btn-primary questions" style="margin:2em;padding:25px;"></button>
            <div class="w-100"></div>
          <button type="button" class="col btn btn-primary questions" style="margin:2em;padding:25px;"></button>
          <br><br/>
          <button type="button" class="col btn btn-primary questions" style="margin:2em;padding:25px;"></button>
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

  renderQuestion: function() {
    fetch(`http://localhost:3000/api/trivia/random_question`).then(object => object.json()).then(object => {
      const correctAnswer = object.correct_answer
      document.getElementById('question').innerHTML += object.question
      const answers = [object.incorrect_answer_1, object.incorrect_answer_2, object.incorrect_answer_3, object.correct_answer]
      app.shuffle(answers);
      let answerArray = document.getElementsByClassName("questions");
      for(let i = 0; i < answerArray.length; i++) {
        answerArray[i].innerHTML = answers[i]
      }
    });
  },

   shuffle: function(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },

  startGame: function() {
    app.renderQuestion(); 
  }

}

document.addEventListener("DOMContentLoaded", app.init)

