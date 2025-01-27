//Entering the questions as arrays

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements when questions has been generated already
    }
}

//Entering the quiz questions as arrays

const questions = [

    {
        question: "Who is the 44th president of the United State of America?",
        options: ["George Bush", "Barack Obama", "Bill Clinton", "David Cameron"],
        answer:  1
    },

    {
        question: "Which of the following is not a planet? Select as applicable",
        options: ["Earth", "Saturn", "Egypt", "Nepturn"],
        answer: 2
    },

    {
        question: "How many days are there in a leap year?",
        options: ["375", "265", "365", "366"],
        answer: 3
    },

    {
        question: "What is the colour of the Sky?",
        options: ["Pink", "Blue", "Green", "Purple"],
        answer: 1
    },

    {
        question: "Prince Charles is next on the Throne as King?",
        options: ["True", "False"],
        answer: 1
    },       
];

//Shuffle questions to be displayed at random
shuffleArray(questions);

//Start the counter of the current questions to 0

    let currentQuestion = 0;
    const answers = new Array (questions.length).fill(null);

    const quizDiv = document.getElementById("quiz");
    const previousButton = document.getElementById("previous-button");
    const nextButton = document.getElementById("next-button");
    const resultDiv = document.getElementById("result");


    function renderQuestion() {

        const q = (questions[currentQuestion]);

// Rendering the quiz into JavaScipt

        quizDiv.innerHTML = `
        <div class = "question">${currentQuestion + 1}. ${q.question}</div>
        <ul class = "options">
                  ${q.options
                  .map(
                        (option, index) => `
                            <li>
                            <label>
                                <input type = "radio" name="answer" value="${index}" ${answers[currentQuestion] === index ? "checked" : "" }                                
                                >
                                    ${option}                                                        
                            </label>                                
                            </li>
                                          `
                        )
                    .join("")} 
         </ul>
                             `;
    
    previousButton.disabled = currentQuestion === 0; //Disabling the previous button
    nextButton.textContent = 
      currentQuestion === questions.length - 1 ? "Submit" : "Next"; //Next button changes into Submit when the questions are done
                              }

// Code for the results to be calculated

    function calculateResult() {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].answer) {
                score++;
            }
        })
        return score;
    }

// Code for the results to show

    function showResult() {
        const score = calculateResult();
        quizDiv.style.display="none";
        previousButton.style.display = "none";
        nextButton.style.display = "none";
        resultDiv.style.display = "block";
        resultDiv.textContent = `You scored ${score} out of ${questions.length}`;
    }

// Code for the results to show
    function showResult() {
    const score = calculateResult();
    quizDiv.style.display = "none";
    previousButton.style.display = "none";
    nextButton.style.display = "none";
    resultDiv.style.display = "block";

//Display to inform the user what their score was

    let resultHTML = `You scored ${score} out of ${questions.length}<br><br>`;

// Loop through each question to show the user's answer and the correct answer
    questions.forEach((q, index) => {
        const userAnswer = answers[index] !== null ? q.options[answers[index]] : "No answer";
        const correctAnswer = q.options[q.answer];

// Determine if the user's answer is correct or not
const userAnswerStyle = answers[index] === q.answer ? 'style="color: green;"' : 'style="color: red;"';

// Display the result Summary of questions with answers.
        
        resultHTML += `
             <div>
                <strong>Question ${index + 1}: </strong> ${q.question}<br>
                Your answer: <span ${userAnswerStyle}><strong>${userAnswer}</strong></span><br>
                Correct answer: <span style="color: green;"><strong>${correctAnswer}</strong></span><br><br>
            </div>
        `;
    });

    resultDiv.innerHTML = resultHTML;
}

//The next button function

    nextButton.addEventListener("click", () => {
        const selectedOption = document.querySelector('input[name="answer"]:checked');

        if (selectedOption) {
            answers[currentQuestion] = parseInt(selectedOption.value);
        }

        if (currentQuestion === questions.length - 1) {
            showResult();
            } else {
                currentQuestion++;
                renderQuestion();            
            }
    });

//The previous or back button function

    previousButton.addEventListener ("click", () => {
        if (currentQuestion > 0) {
            currentQuestion --;
            renderQuestion();
        }
    });

    renderQuestion();
