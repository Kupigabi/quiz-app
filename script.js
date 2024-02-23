const skeletonComponent = () => `
<h1>Simple Quiz</h1>
<div class="quiz">
    <h2 id="question"></h2>
    <div id="answer-buttons">
        <button class="btn"></button>
    </div>
    <button id="next-btn"></button>
</div>
`
const rootElement = document.getElementById("root")

rootElement.insertAdjacentHTML("beforeend", skeletonComponent())

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        answerButtons.insertAdjacentHTML("beforeend", `<button class="btn">${answer.text}</button>`)
        const buttons = document.querySelectorAll('.btn')
        const buttonElement = buttons[buttons.length - 1]

        if (answer.correct) {
            buttonElement.dataset.correct = answer.correct;
        }
        buttonElement.addEventListener("click", selectAnswer);
    });
}

const resetState = () => {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    const correctBtn = answerButtons.querySelector('[data-correct="true"]');
        correctBtn.classList.add("correct");

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

const showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

const handleNextButton = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
