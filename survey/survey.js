const urlParams = new URLSearchParams(window.location.search);
const surveyCode = urlParams.get('code');

let questionArray = [];
let answerArray = [];
let currentQuestionArray = [];
let currentAnswerArray = [];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const questionText = document.getElementsByClassName("question-text");
const questionOverlay = document.getElementById("question-overlay");
const overlayButton = document.getElementById("continue-button");
const resultsDiv = document.getElementById("results");
const resultsButton = document.getElementById("results-button");
const timer = document.getElementById("countdown");
let currentTimerID;

let clickedLeft = [];
let clickedRight = [];

button1.onclick = button1Click;
button2.onclick = button2Click;
overlayButton.onclick = toggleOverlay;
resultsButton.onclick = redirectToResultsScreen;

window.onload = onLoad;

async function onLoad() {
    await fetchSurvey();
    nextQuestion();
}

async function fetchSurvey() {
    const snapshot = await db.collection("test").doc(surveyCode).get();
    questionArray = snapshot.data().questions;
    answerArray = snapshot.data().answers;
    console.log(questionArray);
    console.log(answerArray);
    currentQuestionArray = [...questionArray];
    currentAnswerArray = [...answerArray];
}

function button1Click() {
    if (0 <= currentQuestionArray.length - 1) {
        clearTimeout(currentTimerID);
        saveChoice(currentQuestionArray[0], 0);
        clickedLeft.push(1);
        clickedRight.push(0);
        currentQuestionArray.shift();
        currentAnswerArray.shift();
        currentAnswerArray.shift();
        nextQuestion();
    }
}

function button2Click() {
    if (0 <= currentQuestionArray.length - 1) {
        clearTimeout(currentTimerID);
        saveChoice(currentQuestionArray[0], 1);
        clickedLeft.push(0);
        clickedRight.push(1);
        currentQuestionArray.shift();
        currentAnswerArray.shift();
        currentAnswerArray.shift();
        nextQuestion();
    }
}

function nextQuestion() {
    if (0 <= currentQuestionArray.length - 1) {
        questionText[0].innerHTML = currentQuestionArray[0];
        questionText[1].innerHTML = currentQuestionArray[0];
        if (questionOverlay.style.display === "none") questionOverlay.style.display = "flex";
        button1.innerHTML = currentAnswerArray[0];
        button2.innerHTML = currentAnswerArray[1];
    }
    else {
        showEndScreen();
    }
}

function toggleOverlay() {
    if (questionOverlay.style.display === "none") {
        questionOverlay.style.display = "flex";
    } else {
        questionOverlay.style.display = "none";
        startTimer();
    }
}

function startTimer() {
    let timerValue = 3;
    timer.textContent = timerValue;
    currentTimerID = setInterval(() => {
        timerValue--;
        timer.textContent = timerValue;
        if (timerValue <= 0) {
            clearInterval(currentTimerID);
            skipQuestion();
        }
    }, 1000);
}

function skipQuestion() {
    var _ = currentQuestionArray.shift();
    currentQuestionArray.push(_);
    _ = currentAnswerArray.shift();
    currentAnswerArray.push(_);
    _ = currentAnswerArray.shift();
    currentAnswerArray.push(_);
    nextQuestion();
}

function saveChoice(questionId, choice) {
    db.collection("test/" + surveyCode + "/answers").add({
        questionId: questionArray.indexOf(questionId),
        choice: choice,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function showEndScreen() {
    document.getElementsByClassName("container")[0].style.display = "none";
    resultsDiv.style.display = "flex";
}

function redirectToResultsScreen() {
    window.location.href = "https://snowboiii.github.io/would-you-rather-but-with-a-timer/results/results.html?code=" + surveyCode;
}
