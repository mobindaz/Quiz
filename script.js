const quizForm = document.getElementById('quizForm');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');

let currentQuestion = 0;
let score = 0;
let userName = '';
let category = ''; // Declare category outside of the startQuiz function

function shuffleArray(array) {
    // Shuffle the array using the Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const questions = {
    technology: [
        { question: 'What is the capital of France?', options: ['Paris', 'Berlin', 'London', 'Madrid'], correctAnswer: 'Paris' },
        { question: 'Which programming language is known for its use in web development?', options: ['Java', 'Python', 'JavaScript', 'C++'], correctAnswer: 'JavaScript' },
        { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High-Level Text Markup Language', 'HyperTransfer Text Language', 'HyperText Markdown Language'], correctAnswer: 'HyperText Markup Language' },
        { question: 'Which company developed the Android operating system?', options: ['Apple', 'Google', 'Microsoft', 'Samsung'], correctAnswer: 'Google' },
        { question: 'What is the purpose of CSS?', options: ['To define the structure of a document', 'To add interactivity to a website', 'To style the visual presentation of a document', 'To perform mathematical calculations'], correctAnswer: 'To style the visual presentation of a document' },
    ],

    gk: [
        { question: 'What is the capital of Canada?', options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'], correctAnswer: 'Ottawa' },
        { question: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'], correctAnswer: 'William Shakespeare' },
        { question: 'In which year did World War I begin?', options: ['1914', '1916', '1918', '1920'], correctAnswer: '1914' },
        { question: 'What is the currency of Japan?', options: ['Yuan', 'Won', 'Yen', 'Ringgit'], correctAnswer: 'Yen' },
        { question: 'Which planet is known as the "Red Planet"?', options: ['Earth', 'Mars', 'Venus', 'Jupiter'], correctAnswer: 'Mars' },
    ],
    maths: [
        { question: 'What is the value of pi (π) to two decimal places?', options: ['3.14', '3.16', '3.18', '3.20'], correctAnswer: '3.14' },
        { question: 'What is the square root of 144?', options: ['10', '12', '14', '16'], correctAnswer: '12' },
        { question: 'If x = 5 and y = 3, what is the value of x + y?', options: ['6', '8', '10', '12'], correctAnswer: '8' },
        { question: 'What is the area of a rectangle with length 8 units and width 5 units?', options: ['13 square units', '20 square units', '30 square units', '40 square units'], correctAnswer: '40 square units' },
        { question: 'If a circle has a radius of 7 units, what is its circumference?', options: ['14π units', '21π units', '28π units', '35π units'], correctAnswer: '14π units' },
    ],
    science: [
        { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], correctAnswer: 'Au' },
        { question: 'Which planet is known as the "Red Planet"?', options: ['Mars', 'Venus', 'Jupiter', 'Saturn'], correctAnswer: 'Mars' },
        { question: 'What is the speed of light in a vacuum?', options: ['300,000 kilometers per second', '150,000 kilometers per second', '500,000 kilometers per second', '1 million kilometers per second'], correctAnswer: '300,000 kilometers per second' },
        { question: 'Who is considered the father of modern physics?', options: ['Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Niels Bohr'], correctAnswer: 'Albert Einstein' },
        { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic reticulum'], correctAnswer: 'Mitochondria' },
        { question: 'Which gas is most abundant in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], correctAnswer: 'Nitrogen' },
    ],
};

function startQuiz() {
    userName = document.getElementById('userName').value;
    category = document.getElementById('category').value;

    // Shuffle the questions for the selected category
    questions[category] = shuffleArray(questions[category]).slice(0, 5);

    // Update UI
    quizForm.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    displayNextQuestion();
}

function displayNextQuestion() {
    const questionContainer = document.createElement('div');
    const currentQuestionData = questions[category][currentQuestion];

    questionContainer.innerHTML = `
        <p>${currentQuestionData.question}</p>
        <ul>
            ${currentQuestionData.options.map((option, index) => `<li><input type="radio" name="answer" value="${option}" id="option${index}"><label for="option${index}">${option}</label></li>`).join('')}
        </ul>
        <button type="button" onclick="submitQuiz()">Next</button>
    `;

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionContainer);
}

function submitQuiz() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (selectedOption) {
        if (selectedOption.value === questions[category][currentQuestion].correctAnswer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < questions[category].length) {
            displayNextQuestion();
        } else {
            showResult();
        }
    } else {
        alert('Please select an answer.');
    }
}

function showResult() {
    // Display user's score and home button
    resultContainer.innerHTML = `<h2>${userName}, Your Score: ${score}/${questions[category].length}</h2><button type="button" onclick="goHome()">Home</button>`;
    resultContainer.classList.remove('hidden');
    quizContainer.classList.add('hidden');
}

function goHome() {
    // Reset quiz and return to the category selection page
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    quizForm.classList.remove('hidden');
}
