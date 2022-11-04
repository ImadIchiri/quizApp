import { questionsList } from "./questions.js";
const questionsData = questionsList;

const quizContainer = document.getElementById("quiz_container");
const progressBar = document.getElementById("progress_bar");
const quizeTitle = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const submitButton = document.getElementById("submit_button");
const resultContainer = document.getElementById("result_container");
const playAgainBtn = resultContainer.querySelector("button");

const numberOfQuestions = questionsData.length;
let [startingNumber, correctAnswers, progressBarWidth] = [0, 0, 0];

/*
    1- Update The progressBar Width
    2- Update The h2.question Content To The Current Question
    3- Insert Choices Inside choicesContainer
        3-1: [(input + label) ==> div.answer_container] ==> div.choices
        Note: ==> means inside
*/
export const createQAs = () => {
  if (!(startingNumber >= 0) && startingNumber <= numberOfQuestions) return;
  const mainOnject = questionsData[startingNumber];

  progressBar.style.width = `${progressBarWidth}%`;
  quizeTitle.textContent = mainOnject.question;

  //  answerContainer that contains input + label
  choicesContainer.innerHTML = "";
  let i = 1; // For Creating input's <<id>> and relate it to the label
  for (let choice in mainOnject.choices) {
    const answerContainer = document.createElement("div");
    answerContainer.className = "answer_container";

    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("value", `${mainOnject.choices[choice]}`);
    input.setAttribute("name", "answer");
    input.setAttribute("id", `answer-${i}`);

    const label = document.createElement("label");
    label.textContent = mainOnject.choices[choice];
    label.setAttribute("for", `answer-${i}`);

    answerContainer.append(input);
    answerContainer.append(label);

    choicesContainer.append(answerContainer);

    i++;
  }
};

// Submit Buton
submitButton.addEventListener("click", () => {
  if (!checkSubmit()) {
    return alert("You must choose an answer!");
  }
  startingNumber++;
  if (startingNumber >= numberOfQuestions) {
    return endOfQuiz();
  }
  setProgressBarWith();
  createQAs();
});

const checkSubmit = () => {
  const mainOnject = questionsData[startingNumber];
  const [...inputs] = document.querySelectorAll("input[name='answer']");
  const [checkedInput] = inputs.filter((input) => input.checked);
  if (checkedInput) {
    const rightAnswer = mainOnject.choices[mainOnject.rightAnswer];
    const userAnswer = checkedInput.getAttribute("value");
    if (rightAnswer === userAnswer) {
      correctAnswers++;
    }
  }

  /*   
    I keep this one just to use different things 
    (instead of only using checkedInput variable)
  */
  const isAnInputChecked = inputs.some((input) => input.checked);
  return isAnInputChecked;
};

// Set The Progress Bar Width
const setProgressBarWith = () => {
  progressBarWidth = (startingNumber / numberOfQuestions) * 100;
};

/*
    End Of The Quiz:
    1- Create The result Title
    2- Show The Number Of: -Correct Answers, -Wrong Answers, -Score (5pts For Each Correct_Answer)
    3- Hide The quizContainer and Showing The resultContainer
*/
const endOfQuiz = () => {
  const resuleTitle = document.getElementById("resule_title");
  //  Get Spans That Contain The Value Of Numbers:
  const correctAnswersSpan = document.getElementById("correct_number");
  const wrongAnswersSpan = document.getElementById("wrong_number");
  const scoreAnswersSpan = document.getElementById("score_number");

  resuleTitle.textContent =
    correctAnswers >= numberOfQuestions / 2 ? "Congratulations" : "Ooops!";

  correctAnswersSpan.textContent = correctAnswers;
  wrongAnswersSpan.textContent = numberOfQuestions - correctAnswers;
  scoreAnswersSpan.textContent = `${correctAnswers * 5} / ${
    numberOfQuestions * 5
  }`;

  // Hide The quizContainer and Show The resultContainer
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
};

// Play Again Button
playAgainBtn.addEventListener("click", () => {
  [startingNumber, correctAnswers, progressBarWidth] = [0, 0, 0];

  // Hide The resultContainer and Show The quizContainer
  resultContainer.style.display = "none";
  quizContainer.style.display = "block";

  createQAs();
});
