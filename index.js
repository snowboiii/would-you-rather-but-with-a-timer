const questionArray = [
    "You see someone drop a wallet with 200€ in it. No one else notices.",
    "Your friend's horrible artwork is being shown at school. They ask you if you like it, looking proud and nervous.",
    "You're about to fail a big exam. A friend secretly gives you the answers.",
    "You forgot your best friend's birthday. You can lie and say the gift is late, or tell the truth.",
    "A trolley is heading towards 5 people. You can pull the lever to divert it to the other track, killing 1 person instead.",
    "You find someone unconscious in a park. You're running late for an important appointment.",
    "You're offered 1.000€ to test a new shampoo on rabbits. It's legal, but will hurt them.",
    "You see a child stealing food in a shop. You're the only one who saw it.",
    "You see a friend being mean to someone anonymously online. No one knows it's them.",
    "You're interviewing for your dream job. They ask if you've ever lied—and being honest might cost you the job."
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
]
let questionNumber = 0

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const questionText = document.getElementById("question-text");

let clickedLeft = [];
let clickedRight = [];

// Add functions to both buttons
button1.onclick = button1Click;
button2.onclick = button2Click;

// OnLoad function
window.onload = () => {
    nextQuestion();
};

function button1Click() {
    if (questionNumber <= questionArray.length) {
        clickedLeft.push(1);
        clickedRight.push(0);
        nextQuestion();
    }
}

function button2Click() {
    if (questionNumber <= questionArray.length) {
        clickedLeft.push(0);
        clickedRight.push(1);
        nextQuestion();
    }
}

function nextQuestion() {
    if (questionNumber <= questionArray.length - 1) {
        questionText.innerHTML = questionArray[questionNumber];
        button1.innerHTML = answerArray[questionNumber][0];
        button2.innerHTML = answerArray[questionNumber][1];
        questionNumber++;
    }
    else {
        questionNumber++;
        showStats();
    }
}

function showStats() {
    console.log("left: " + clickedLeft);
    console.log("right: " + clickedRight);
    alert(`clicked left: ${clickedLeft}\nclicked right: ${clickedRight}`);
}