const questionArray = [
    ["Du findest eine Geldbörse mit 200€. Niemand hat es gesehen.", 0],
    ["Jemand hat dir wehgetan.", 1],
    ["Du brauchst dringend Geld, weißt aber, dass du einen Kredit nie zurückzahlen könntest.", 2],
    ["Dein Wecker klingelt. Du hast zur Sicherheit einen zweiten gestellt.", 3],
    ["Ein Trolley rast auf 5 gefesselte Personen zu. Du kannst einne Hebel umlegen und damit eine andere Person töten, um die 5 zu retten.", 4],
    ["Morgens musst du dich für ein Getränk entscheiden.", 5],
    ["Du bist finanziell abgesichert, siehst aber, wie andere große Probleme haben.", 6],
    ["Was machst du zuerst am Morgen?", 7],
    ["Es könnte heute regnen.", 8],
    ["Nicht-heterosexuell zu sein soll gesetzlich verboten werden.", 9],
    ["Du musst dich für einen zukünftigen Job entscheiden.", 10],
    ["Auf welcher Bettseite stehst du auf?", 11]
];
const answerArray = [
    ["Behalten.", "Im Fundbüro abgeben."],
    ["Rache nehmen.", "Vergeben."],
    ["Lügen, um den Kredit zu bekommen.", "Ehrlich bleiben und keinen Kredit erhalten."],
    ["Jetzt aufstehen.", "Schlummern bis zum zweiten Wecker."],
    ["Nichts tun und die 5 sterben lassen.", "Hebel ziehen und eine Person opfern."],
    ["Kaffee.", "Tee."],
    ["Gleichgültig bleiben.", "Geld spenden."],
    ["Zähne putzen.", "Gesicht waschen."],
    ["Jacke mitnehmen, was nervig ist.", "Risiko eingehen und keine mitnehmen."],
    ["Dafür.", "Dagegen."],
    ["Einen Job wählen, der gut bezahlt ist.", "Einen Job wählen, den du liebst."],
    ["Links.", "Rechts."]
];

let curQArray = questionArray;
let curAArray = answerArray;

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

// Add functions to both buttons
button1.onclick = button1Click;
button2.onclick = button2Click;
overlayButton.onclick = toggleOverlay;
resultsButton.onclick = redirectToResultsScreen;

// OnLoad function
window.onload = () => {
    nextQuestion();
};

function button1Click() {
    if (0 <= curQArray.length - 1) {
        console.log("num: " + 0 + "\narray: " + curQArray.length);
        clearTimeout(currentTimerID);
        saveChoice(curQArray[0][1], 0);
        console.log("timer cancelled")
        clickedLeft.push(1);
        clickedRight.push(0);
        curQArray.shift();
        curAArray.shift();
        nextQuestion();
    }
}

function button2Click() {
    if (0 <= curQArray.length - 1) {
        console.log("num: " + 0 + "\narray: " + curQArray.length);
        clearTimeout(currentTimerID);
        saveChoice(curQArray[0][1], 1);
        console.log("timer cancelled")
        clickedLeft.push(0);
        clickedRight.push(1);
        curQArray.shift();
        curAArray.shift();
        nextQuestion();
    }
}

function nextQuestion() {
    if (0 <= curQArray.length - 1) {
        questionText[0].innerHTML = curQArray[0][0];
        questionText[1].innerHTML = curQArray[0][0];
        if (questionOverlay.style.display === "none") questionOverlay.style.display = "flex";
        button1.innerHTML = curAArray[0][0];
        button2.innerHTML = curAArray[0][1];
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
    var _ = curQArray.shift();
    curQArray.push(_);
    _ = curAArray.shift();
    curAArray.push(_);
    nextQuestion();
}

function saveChoice(questionId, choice) {
    db.collection("surveyResponses").add({
        questionId: questionId,
        choice: choice,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function showEndScreen() {
    document.getElementsByClassName("container")[0].style.display = "none";
    resultsDiv.style.display = "flex";
}

function redirectToResultsScreen() {
    window.location.href = "results/results.html";
}