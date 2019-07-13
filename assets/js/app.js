//Initial values

let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

//function calls
loadQuestion();

//Display questions and choices together in the browser

function loadQuestion() {
  const question = quizQuestions[currentQuestion].questions;
  const choices = quizQuestions[currentQuestion].choices;

  $("#time").html(`Timer: ${counter}`);
  $("#game").html(`<h4>${question}</h4>
  ${loadChoices(choices)}`); //loading choices to the questions
}

function loadChoices(choices) {
  let result = "";

  for (let i = 0; i < choices.length; i++) {
    result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
  }

  return result;
}
