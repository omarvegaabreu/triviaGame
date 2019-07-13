//Initial values

let counter = 0;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

//function calls
loadQuestion();

function nextQuestion() {
  const isQuestionOver = quizQuestions.length - 1 === currentQuestion;
  if (isQuestionOver) {
    console.log("game is over!");
    //display results to html
    displayResult();
  } else {
    currentQuestion++;
    loadQuestion();
  }
}

function timeUp() {
  clearInterval(timer);
  lost++;
  preloadImage("lost");
  setTimeout(nextQuestion, 2 * 1000);
}

//30 second timer to start before the function
function countDown() {
  counter--;

  $("#time").html(`Timer: ${counter}`);

  if (counter === 0) {
    timeUp();
  }
}

//Display questions and choices together in the browser
function loadQuestion() {
  counter = 1000;
  timer = setInterval(countDown, 50000);

  const question = quizQuestions[currentQuestion].questions;
  const choices = quizQuestions[currentQuestion].choices;

  $("#time").html(`Timer: ${counter}`);
  $("#game").html(`<h4>${question}</h4>
  ${loadChoices(choices)}
  ${loadRemainingQuestion()}`);
}

function loadChoices(choices) {
  let result = "";

  for (let i = 0; i < choices.length; i++) {
    result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
  }

  return result;
}
//

$(document).on("click", ".choice", function() {
  clearInterval(timer);
  const selectAnswer = $(this).attr("data-answer");
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

  if (correctAnswer === selectAnswer) {
    score++;
    console.log("wins");
    preloadImage("win");
    setTimeout(nextQuestion, 2 * 1000);
  } else {
    lost++;
    console.log("lost");
    preloadImage("lost");
    setTimeout(nextQuestion, 2 * 1000);
  }

  console.log("yeah", selectAnswer);
});

function displayResult() {
  const result = `
        <p>You get ${score} questions's right.</p>
        <p>You missed ${lost} question.</p>
        <p>Total questions ${quizQuestions.length} questions's right.</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

  $("#game").html(result);
}

$(document).on("click", "#reset", function() {
  counter = 0;
  currentQuestion = 0;
  score = 0;
  lost = 0;
  timer = null;

  loadQuestion();
});

function loadRemainingQuestion() {
  const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
  const totalQuestion = quizQuestions.length;

  return `Remaining Question: ${remainingQuestion}/${totalQuestion} `;
}
function randomImage(images) {
  const random = Math.floor(Math.random() * images.length);
  const randomImage = images[random];
  return randomImage;
}

function preloadImage(status) {
  const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

  if (status === "win") {
    $("#game").html(`
            <p class="preload-image">Congratulations, you pick the corrrect answer</p>
            <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
            <img src="${randomImage(winImages)}" />
        `);
  } else {
    $("#game").html(`
            <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
            <p class="preload-image">You lost pretty bad</p>
            <img src="${randomImage(looseImages)}" />
        `);
  }
}

$("#start").click(function() {
  $("#start").remove();
  $("#time").html(counter);
  loadQuestion();
});
