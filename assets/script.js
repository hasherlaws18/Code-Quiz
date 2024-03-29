const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerDisplay = document.getElementById('timerdisplay')
var timeLeft =60;
var timeInterval;

let shuffledQuestions, currentQuestionIndex


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function gameOver() {
  clearInterval(timeInterval);
  resetState();
  currentQuestionIndex = 0;
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  startButton.innerText = 'Start';
  startButton.classList.remove('hide');
  timerDisplay.textContent = '';
};

function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "TIMER: " + timeLeft;

    if (timeLeft === 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  timer()
}



function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Submit'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'What is 15 divided by 3',
    answers: [
      { text: '10', correct: false },
      { text: '5', correct: true },
      { text: '2', correct: false },
      { text: '11', correct: false }
    ]
  },
  {
    question: 'How many sides does a square have?',
    answers: [
      { text: 'two', correct: false },
      { text: 'three', correct: false },
      { text: 'four', correct: true },
      { text: 'eight', correct: false }
    ]
  },
  {
    question: 'Do triangles have three sides?',
    answers: [
      { text: 'false', correct: false },
      { text: 'true', correct: true }
    ]
  }

  
]