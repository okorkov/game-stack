
// Trivia Section
const triviaTemplate = `
<div class='p-5 text-center bg-image'>
  <div class='mask' style='background-color: rgba(0, 0, 0, 0.6); padding: 50px; margin: 20px;'>
    <div class='d-flex justify-content-center align-items-center h-100'>
      <div class='text-white'>
        <h1 class='mb-3 text-uppercase' style="color:#931A00;">Trivia Game</h1>
        <h1 id="players-name-form"></h1>
        <h3 id='score' style="color:yellow;">Score: 
        <span>0</span>
        </h3>
        <div id ="question-and-answers">
          <h3 id='question'> </h3>
          <div class="container">
            <div class="row">
            <button id="ans-1" type="button" class="col btn btn-primary questions" style="margin:2em;padding:25px;"></button>
            <br><br/>
            <button id="ans-2" type="button" class="col btn btn-primary questions" style="margin:2em;padding:25px;"></button>
              <div class="w-100"></div>
            <button id="ans-3" type="button" class="col btn btn-primary questions" style="margin:2em;padding:25px;"></button>
            <br><br/>
            <button id="ans-4" type="button" class="col btn btn-primary questions" style="margin:2em;padding:25px;"></button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

const scoreForm = `
<div class="col d-flex justify-content-center text-center">
  <form action="/" method="post" id="submit-score">
  <input type="text" class="input-group" style="width: 200px;" placeholder="Enter your name here ...">
  <br>
  <input type="submit" class="btn btn-outline-warning" value="Get on the Board" required>
  </form>
</div>
<br>
<table class="table table-dark table-striped table-bordered">
  <thead>
    <tr>
      <th scope="col"><strong>Top Scores</strong></th>
      <th scope="col"><strong>Gamer's Name</strong></th>
    </tr>
  </thead>
  <tbody id="table-body">
  </tbody>
</table>
<button id="play-again" class="btn btn-outline-success btn-lg">Play Again!</button>`;




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
    document.getElementById('carousel-parent').insertAdjacentHTML('afterend', triviaTemplate);
    app.startGame();
  },

  renderQuestion: function() {
    fetch(`http://localhost:3000/api/trivia/random_question`).then(object => object.json()).then(object => {
      const correctAnswer = object.correct_answer
      document.getElementById('question').innerHTML = `Question: ${object.question}`
      const answers = [object.incorrect_answer_1, object.incorrect_answer_2, object.incorrect_answer_3, object.correct_answer]
      app.shuffle(answers);
      let answerArray = document.getElementsByClassName("questions");
      for(let i = 0; i < answerArray.length; i++) {
        if(answers[i] === null || answers[i] === undefined){
          answerArray[i].style.visibility = "hidden";
        } else {
          answerArray[i].innerHTML = answers[i];
          answerArray[i].addEventListener('click', function(e){
            e.target.className = 'col btn btn-warning questions'
            app.checkAnswer(correctAnswer, answerArray[i])
          })
        }
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
  },

  checkAnswer: function(correctAnswer, selectAnswer) {
    setTimeout(function(){
      if (correctAnswer === selectAnswer.innerHTML) {
        selectAnswer.className = 'col btn btn-success questions'
        setTimeout(function(){
          document.getElementById('score').childNodes[1].innerHTML = parseInt(document.getElementById('score').childNodes[1].innerHTML) + 100;
          app.renderQuestion()
          app.resetAnswerColors();
        }, 1000);
      } else {
        selectAnswer.className = 'col btn btn-danger questions'
        setTimeout(function(){
          app.finishGame()
        }, 1000)
      }
      return null;
    }, 1000)
  },

  resetAnswerColors: function() {
    let answerArray = document.getElementsByClassName("questions");
    for(let i = 0; i < answerArray.length; i++) {
        answerArray[i].className = "col btn btn-primary questions";
    }
    return null;
  },

  finishGame: function() {
    document.getElementById('question-and-answers').remove()
    document.getElementById('score').insertAdjacentHTML('afterend', scoreForm);
    fetch(`http://localhost:3000/api/trivia/trivia_top_10_players`).then(object => object.json()).then(object => app.fillScores(object))
  },

  fillScores: function(object) {
    const tableBody = document.getElementById('table-body')
    for(let i = 0; i < object.length; i++) {
      let tr = document.createElement('tr')
      tr.innerHTML = `
      <td>${object[i].score}</td>
      <td>${object[i].name}</td>`
      tableBody.appendChild(tr)
    }
  }

}

document.addEventListener("DOMContentLoaded", app.init)

