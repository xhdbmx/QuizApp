let questionNumber = 0;
let score = 0;

$(document).ready(function() {
  $(".currentStats").hide();
});

// Function to display questions
function generateQuestion() {
    if (questionNumber < STORE.length) {
      return `<div class="question-${questionNumber}">
      <h2>${STORE[questionNumber].question}</h2>
      <form>
      <fieldset>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
      <span>${STORE[questionNumber].answers[0]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
      <span>${STORE[questionNumber].answers[1]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
      <span>${STORE[questionNumber].answers[2]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
      <span>${STORE[questionNumber].answers[3]}</span>
      </label>
      <button type="submit" class="submitButton">Submit</button>
      </fieldset>
      </form>
      </div>`;
  } else {
      renderResults();
      restartQuiz();
      $('.questionNumber').text(10)
    }
};

// Function to increment question number
function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
};
  
// Function to increment score
function changeScore() {
    score++;
};

// Function to start quiz, hide the start section, unhide quiz form
function startQuiz() {
    $('.quizStart').on('click', '.startButton', function() {
      $('.quizStart').remove();
      $('.secondaryTitle').remove();
      $('.headingInfo').remove();
      $('.currentStats').slideToggle('slow');
      $(this).fadeOut('slow');
      $('.questionAnswerForm').css('display', 'block');
      $('.questionNumber').text(1);
  });
};

// Function to render question to DOM
function renderQuestion() {
    $('.questionAnswerForm').html(generateQuestion());
};

// Answer selection feedback
function userSelectAnswer() {
    $('form').on('submit', function(e) {
      e.preventDefault();
      let selected = $('input:checked');
      let answer = selected.val();
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      if (answer === correctAnswer) {
        selected.parent().addClass('correct');
        ifAnswerIsCorrect();
      } else {
        selected.parent().addClass('wrong');
        ifAnswerIsWrong();
      }
    });
};

// Display right answer
function ifAnswerIsCorrect() {
    userAnswerFeedbackCorrect();
    updateScore();
};

// Display wrong answer
function ifAnswerIsWrong() {
    userAnswerFeedbackWrong();
};

// Feedback for right answer
function userAnswerFeedbackCorrect() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<section class="correctFeedback">
    <section class="icon">
    <img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/>
    </section>
    <p><b>Correct Answer!</b> The capital of ${STORE[questionNumber].country} is <span>"${STORE[questionNumber].correctAnswer}"</span>!</p>
    <button type=button class="nextButton">Next</button>
    </section>`);
  };

// Feedback for wrong answer
function userAnswerFeedbackWrong() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<section class="correctFeedback">
    <section class="icon">
    <img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/>
    </section>
    <p><b>Wrong Answer!</b><br>The correct answer is <span>"${correctAnswer}"</span>!</p>
    <button type=button class="nextButton">Next</button>
    </section>`);
};

// Update score text
function updateScore() {
    changeScore();
    $('.score').text(score);
};

// Function to display quiz results
function renderResults() {
    if (score === 10) {
      $('.questionAnswerForm').html(`<section class="results correctFeedback">
      <h3>Great Job!</h3><img src="https://media.giphy.com/media/26xBCnHtYrV2QOHxC/giphy.gif" alt="Globe Spinning"/>
      <p>You got ${score} / 10 correct</p><p>You really know your way around the globe!</p>
      <button class="restartButton">Restart Quiz</button>
      </section>`);
    } else if (score <= 8 && score >= 5) {
      $('.questionAnswerForm').html(`<section class="results correctFeedback">
      <h3>Almost there!</h3><img src="https://media.giphy.com/media/l2SpMh8OAvxK9EPwA/giphy.gif" alt="study some more"/>
      <p>You got ${score} / 10 correct</p><p>Increase your geography knowledge a little more and you'll be ready to go!</p>
      <button class="restartButton">Restart Quiz</button>
      </section>`);
    } else {
      $('.questionAnswerForm').html(`<section class="results correctFeedback">
      <h3>You might want to study a map!</h3><img src="https://media.giphy.com/media/3og0INyCmHlNylks9O/giphy.gif" alt="palm face"/>
      <p>You got ${score} / 10 correct</p><p>With more studying you'll be able to pass this quiz in no time!</p>
      <button class="restartButton">Restart Quiz</button>
      </section>`);
    }
};

// Function for next question
function renderNextQuestion() {
    $('main').on('click', '.nextButton', function() {
      updateQuestionNumber();
      renderQuestion();
      userSelectAnswer();
    });
};

// Function to restart quiz
function restartQuiz() {
    $('main').on('click', '.restartButton', function() {
      location.reload();
    });
};

// Invoke functions for quiz app
function commenceQuiz() {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
};

// Launch App
$(commenceQuiz);