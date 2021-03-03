const domain = 'http://localhost:3000'
// 'https://game-stack.herokuapp.com/'
// 'http://localhost:3000'

const scoreTable = `
<div class='p-5 text-center bg-image' id="flappy-dot-template">
    <div class='d-flex justify-content-center align-items-center h-100'>
      <div class='text-white'>
      <div class='row'>
      <div class='col'>
      <table class="table table-dark table-striped table-bordered"  id="trivia">
        <thead>
        <h3>Trivia</h3>
          <tr>
            <th scope="col"><strong>Top Scores</strong></th>
            <th scope="col"><strong>Gamer's Name</strong></th>
          </tr>
        </thead>
        <tbody id="table-body-trivia">
        </tbody>
      </table>
      </div>
      <div class='col'>
      <table class="table table-dark table-striped table-bordered"  id="flappy-dot">
      <thead>
      <h3>Flappy Dot</h3>
        <tr>
          <th scope="col"><strong>Top Scores</strong></th>
          <th scope="col"><strong>Gamer's Name</strong></th>
        </tr>
      </thead>
      <tbody id="table-body-flappy-dot">
      </tbody>
    </table>
    </div>
    </div>
      </div>
    </div>
    </div>
  </div>`;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('all-scores').addEventListener("click", () => renderPage())
})

function renderPage() {
  if(document.getElementById('carousel') !== null) {
    document.getElementById('carousel').remove();
  }
  if(document.getElementById('flappy-dot-template') !== null) {
    document.getElementById('flappy-dot-template').remove();
  } 
  if(document.getElementById('canvas1') !== null) {
    document.getElementById('canvas1').remove();
  }
  if(document.getElementById('trivia-template') !== null) {
    document.getElementById('trivia-template').remove();
  }
  document.getElementById('carousel-parent').insertAdjacentHTML('afterend', scoreTable);
  fetch(`${domain}/api/games/all_scores`).then(object => object.json()).then(object => renderScore(object));
}

function renderScore(object) {
  console.log(object[0].trivia_scores);
}

