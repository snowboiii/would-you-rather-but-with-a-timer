let createQuestionButton = document.getElementById("create-question-button");
let saveSurveyButton = document.getElementById("save-survey-button");
let resultText = document.getElementById("result-text");

createQuestionButton.onclick = createQuestion;
saveSurveyButton.onclick = saveSurvey;
resultText.onclick = resultTextClick;

function resultTextClick(event) {
    navigator.clipboard.writeText(resultText.innerHTML.match(RegExp("(?<=: ).+$")));
    let copyText = document.createElement("a");
    copyText.style.cssText = `
        position: absolute;
        color: #65d465;
        font-size: small;
        font-weight: bold;
        top: ${event.clientY - 40}px;
        left: ${event.clientX - 80}px;
    `;
    copyText.innerHTML = "code copied successfully :3"
    document.body.append(copyText);
    let currentTimerID = setInterval(() => {
        copyText.remove();
    }, 400);
}

function createQuestion() {
    const num = document.getElementsByClassName("input-field").length;
    
    const question = document.createElement("div")
    question.className = "input-field";
    
    const label = document.createElement("label");
    label.htmlFor = "question-" + num + "-input";
    label.innerHTML = "Question " + num;

    const input = document.createElement("input");
    input.className = "text-input";
    input.id = "question-" + num + "-input";
    input.type = "text";

    const a1label = document.createElement("label");
    a1label.htmlFor = "question-" + num + "-answer-1-input";
    a1label.innerHTML = "Answer 1:"

    const a1input = document.createElement("input");
    a1input.className = "text-input";
    a1input.id = "question-" + num + "-answer-1-input";
    a1input.type = "text";

    const a2label = document.createElement("label");
    a2label.htmlFor = "question-" + num + "-answer-2-input";
    a2label.innerHTML = "Answer 2:"

    const a2input = document.createElement("input");
    a2input.className = "text-input";
    a2input.id = "question-" + num + "-answer-2-input";
    a2input.type = "text";

    question.appendChild(label);
    question.appendChild(input);
    question.append(a1label);
    question.appendChild(a1input);
    question.append(a2label);
    question.appendChild(a2input);
    document.body.insertBefore(question, document.getElementById("create-question-button"));
}

async function saveSurvey() {
    const allInputs = Array.from(document.getElementsByClassName("text-input"));
    let inputStrings = "";
    let questions = [];
    let answers = [];

    allInputs.forEach((c) => {
        inputStrings += c.value;
        console.info(c.id);
        if (/^question-\d+-input$/.test(c.id)) questions.push(c.value);
        else if (/^question-\d+-answer-\d-input$/.test(c.id)) answers.push(c.value);
    });
    
    console.info(questions);
    console.info(answers);

    console.info(inputStrings);
    const hash = await sha256(inputStrings);
    console.info(hash);

    db.collection("test").doc(hash).set({
        questions: questions,
        answers: answers,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        resultText.innerHTML = "Successfully created survey with code: " + hash;
    });
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
