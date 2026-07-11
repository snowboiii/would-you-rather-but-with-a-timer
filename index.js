let createSurveyButton = document.getElementById('create-survey-button');
let startSurveyButton = document.getElementById('start-survey-button');
let startSurveyInput = document.getElementById('survey-code-input');

createSurveyButton.onclick = createSurvey;
startSurveyButton.onclick = checkSurveyExists;

function createSurvey() {
    window.location.href = 'https://snowboiii.github.io/would-you-rather-but-with-a-timer/create-survey/create-survey.html';
}

async function checkSurveyExists() {
    console.log(startSurveyInput.value);
    const survey = await db.collection("test").doc(startSurveyInput.value).get();
    if (survey._delegate._document != null) {
        window.location.href = 'https://snowboiii.github.io/would-you-rather-but-with-a-timer/survey/survey.html?code=' + startSurveyInput.value;
    } else {
        document.getElementById("fatal-response-text").style.display = "flex";
    }
}