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
        question: "Prince Charles is next on the Throne as King?",
        options: ["True", "False"],
        answer: 1
    }
];

    let currentQuestion = 0;
    const answers = new Array (questions.length).fill(null);

    const quizDiv = document.getElementById("quiz");
    const previousButton = document.getElementById("previous-button");
    const nextButton = document.getElementById("next-button");
    const resultDiv = document.getElementById("result");

    function renderQuestion() {
        const q = questions[currentQuestion];

        quizDiv.innerHTML = `
        <div class = "question">${currentQuestion + 1}. ${q.question}</div>
        <ul class = "options">
                  ${q.options
                  .map (
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
    
    previousButton.disabled = currentQuestion === 0;
    nextButton.textContent = 
      currentQuestion === questions.length - 1 ? "Submit" : "Next";
                              }

    function calculateResult() {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].answer) {
                score++;
            }
        })
        return score;
    }

    function showResult() {
        const score = calculateResult ();
        quizDiv.style.display="none";
        previousButton.style.display = "none";
        nextButton.style.display = "none";
        resultDiv.style.display = "block";
        resultDiv.textContent = `You scored ${score} out of ${questions.length}`;
    }

    nextButton.addEventListener("click", () => {
        const selectedOption = document.querySelector('input [name="answer"]:checked');

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

    previousButton.addEventListener ("click", () => {
        if (currentQuestion > 0) {
            currentQuestion --;
            renderQuestion();
        }
    });

    renderQuestion();
