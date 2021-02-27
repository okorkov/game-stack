const domain = 'https://game-stack.herokuapp.com/'
// 'https://game-stack.herokuapp.com/'
// 'http://localhost:3000'
// Trivia Section
const triviaTemplate = `
  <div class='p-5 text-center bg-image' id="trivia-template">
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
<div class="col d-flex justify-content-center text-center" id="score-button">
  <form action="/" method="post" id="submit-score">
  <input type="text" class="input-group" style="width: 200px;" placeholder="Enter your name here ..." required>
  <br>
  <input type="submit" class="btn btn-outline-warning" value="Get on the Board">
  </form>
</div>
<button id="play-again" class="btn btn-outline-success btn-lg">Play Again!</button>`;

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


const app = {

  init: function() {
    document.getElementById('trivia').addEventListener('click', app.openTrivia)
    document.getElementById('logo').addEventListener('click', app.logoClick)
  },

  logoClick: function() {
    location.reload();
  },

  openTrivia: function() {
    if(document.getElementById('carousel') != null) {
      document.getElementById('carousel').remove();
      document.getElementById('carousel-parent').insertAdjacentHTML('afterend', triviaTemplate);
    }
    app.startGame();
  },

  startGame: function() {
    app.renderQuestion(); 
    document.addEventListener('click', function (e) {
      if(e.target.matches('.questions')) {
        e.target.className = 'col btn btn-warning questions';
        app.checkAnswer(correctAnswer, e.target)
      }
    })
  },

  renderQuestion: function() {
    fetch(`${domain}/api/trivia/random_question`).then(object => object.json()).then(object => {
      document.getElementById('question').innerHTML = `Question: ${object.question}`
      correctAnswer = object.correct_answer; 
      answers = [object.incorrect_answer_1, object.incorrect_answer_2, object.incorrect_answer_3, object.correct_answer]
      app.shuffle(answers);
      let answerButtons = document.getElementsByClassName("questions"); 
      for(let i = 0; i < answerButtons.length; i++) {
        if(answers[i] === null){
          answerButtons[i].style.visibility = "hidden";
        } else {
          answerButtons[i].style.visibility = "visible";
          answerButtons[i].innerHTML = answers[i];
        }
      }
      return null;
    });
  },

  checkAnswer: function(correctAnswer, selectAnswer) {
    setTimeout(function(){
      if (correctAnswer === selectAnswer.innerHTML) {
        selectAnswer.className = 'col btn btn-success questions';
        document.getElementById('score').childNodes[1].innerHTML = parseInt(document.getElementById('score').childNodes[1].innerHTML) + 100;
        setTimeout(function(){
          app.resetAnswerColors();
          correctAnswer = null;
          return app.renderQuestion();
        }, 1000);
      } else {
        selectAnswer.className = 'col btn btn-danger questions';
        setTimeout(function(){
          alert(`Correct Answer is: ${correctAnswer}`);
          return app.finishGame();
        }, 1500)
      }
    }, 1000)
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
    document.getElementById('score-button').insertAdjacentHTML('afterend', scoreTable);
    fetch(`${domain}/api/trivia/trivia_top_10_players`).then(object => object.json()).then(object => app.fillScores(object))
    app.submitScore();
    app.playAgain();
  },

  fillScores: function(object) {
    const tableBody = document.getElementById('table-body')
    for(let i = 0; i < object.length; i++) {
      let tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${object[i].score}</td>
      <td>${object[i].name}</td>`
      tableBody.appendChild(tr);
    }
  },

  playAgain: function() {
    document.getElementById('play-again').addEventListener('click', function() {
      document.getElementById('trivia-template').remove();
      document.getElementById('carousel-parent').insertAdjacentHTML('afterend', triviaTemplate);
      app.startGame();
    })
  },

  submitScore: function() {
    document.getElementById('submit-score').addEventListener('submit', function(e) {
      const name = document.getElementById('submit-score').childNodes[1].value;
      const score = parseInt(document.getElementById('score').childNodes[1].innerHTML);
      app.submitData(name, score);
      document.getElementById('submit-score').remove();
      document.getElementById('score-table').remove();
      document.getElementById('score').insertAdjacentHTML('afterend', scoreTable);
      app.updateScore()
      e.preventDefault();
    })
  },

  submitData: function(name, score) {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({'name': name, 'score': score})
    }
    return fetch(`${domain}/api/trivia/add_score`, config)
    .then(function(response) {
      return response.text();
    }).catch(function(error) {
      alert("Failed to save score");
      return error.message;
    });
  },

  updateScore: function() {
    fetch(`${domain}/api/trivia/trivia_top_10_players`).then(object => object.json()).then(object => app.fillScores(object))
  }
}

document.addEventListener("DOMContentLoaded", app.init)

  