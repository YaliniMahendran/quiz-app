const quizData = [
    {
        question: "Which of the following is a correct syntax to display “Hello World” in an alert box using JavaScript?",
        options: ["alertBox('Hello World');", "alert('Hello World');", "msgAlert('Hello World');", "displayAlert('Hello World');"],
        correct: 2 
    },
    {
        question: "What is the purpose of JavaScript in web development?",
        options: ["To structure web pages", "To style web pages", "To add interactivity and dynamic content to web pages", "To store data on the server"],
        correct: 3
    },
    {
        question: "Which keyword is used for declaring a variable in JavaScript that can be reassigned?",
        options: ["const", "var", "let", "static"],
        correct: 3
    },
    {
        question: "In JavaScript, which of the following is a valid variable name?",
        options: ["2names", "$name", "-name", "name2"],
        correct: 2
    },
    {
        question: "Which data type in JavaScript is used to represent logical values?",
        options: ["String", "Boolean", "Number", "Undefined"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timer = 60;
let interval;

document.addEventListener("DOMContentLoaded", () => {
    displayQuestion();
    interval = setInterval(updateTimer, 1000);
});

function displayQuestion() {
    const questionElement = document.querySelector(".question");
    const optionsElement = document.querySelector(".options");

    questionElement.textContent = quizData[currentQuestion].question;
    optionsElement.innerHTML = "";

    quizData[currentQuestion].options.forEach((option, index) => {
        optionsElement.innerHTML += `
            <label>
                <input type="radio" name="option" value="${index}">
                ${option}
            </label>
        `;
    });

    document.getElementById("prevBtn").style.display = currentQuestion > 0 ? "inline-block" : "none";
    document.getElementById("nextBtn").style.display = currentQuestion < quizData.length - 1 ? "inline-block" : "none";
    document.getElementById("submitBtn").style.display = currentQuestion === quizData.length - 1 ? "inline-block" : "none";
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (selectedOption) {
        if (parseInt(selectedOption.value) === quizData[currentQuestion].correct) {
            score++;
        }
    }

    currentQuestion++;
    displayQuestion();
}

function prevQuestion() {
    currentQuestion--;
    displayQuestion();
}

function submitQuiz() {
    clearInterval(interval);
    document.getElementById("quiz-container").style.display = "none";
    const resultElement = document.querySelector(".result");
    resultElement.style.display = "block";

    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `You scored ${score} out of ${quizData.length}`;

    const correctAnswersElement = document.getElementById("correctAnswers");
    quizData.forEach((data, index) => {
        const correctAnswer = data.options[data.correct];
        correctAnswersElement.innerHTML += `<li>${data.question}: <strong>${correctAnswer}</strong></li>`;
    });
}

function updateTimer() {
    timer--;
    document.getElementById("time").textContent = timer;

    if (timer <= 0) {
        submitQuiz();
    }
}


