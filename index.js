const questionArray = [
    ["You see someone drop a wallet with 200€ in it. No one else notices.", 0],
    ["Your friend's horrible artwork is being shown at school. They ask you if you like it, looking proud and nervous.", 1],
    ["You're about to fail a big exam. A friend secretly gives you the answers.", 2],
    ["You forgot your best friend's birthday. You can lie and say the gift is late, or tell the truth.", 3],
    ["A trolley is heading towards 5 people. You can pull the lever to divert it to the other track, killing 1 person instead.", 4],
    ["You find someone unconscious in a park. You're running late for an important appointment.", 5],
    ["You're offered 1.000€ to test a new shampoo on rabbits. It's legal, but will hurt them.", 6],
    ["You see a child stealing food in a shop. You're the only one who saw it.", 7],
    ["You see a friend being mean to someone anonymously online. No one knows it's them.", 8],
    ["You're interviewing for your dream job. They ask if you've ever lied—and being honest might cost you the job.", 9]
];
const answerArray = [
    ["Keep the money.", "Try to return it."],
    ["Lie and say you love it.", "Tell them the truth and break their heart."],
    ["Use the answers and pass.", "Don't cheat, even if it means failing."],
    ["Lie to save the friendship.", "Tell the truth and take the blame."],
    ["Pull the lever.", "Do nothing."],
    ["Call for help and stay with them.", "Leave and continue on your way."],
    ["Take the job.", "Refuse, even if you need the money."],
    ["Report it.", "Let it go—they probably need it."],
    ["Call them out, risking the friendship.", "Ignore it. Not your problem."],
    ["Lie and say you're always truthful.", "Admit you've lied before."]
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
    currentTimerID = setTimeout(skipQuestion, 3000);
    console.log("timer started");
}

function skipQuestion() {
    console.log("timer up");
    
    console.log("before: " + curQArray[0]);
    
    var _ = curQArray.shift();
    curQArray.push(_);
    _ = curAArray.shift();
    curAArray.push(_);
    console.log("after: " + curQArray[0]);
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
    window.location.replace("snowboiii.github.io/would-you-rather-but-with-a-timer/results/results.html");
}