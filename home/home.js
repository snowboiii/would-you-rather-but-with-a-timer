let createSurveyButton = document.getElementById('create-survey-button');
let startSurveyButton = document.getElementById('start-survey-button');
let startSurveyInput = document.getElementById('survey-code-input');

createSurveyButton.onclick = createSurvey;
startSurveyButton.onclick = checkSurveyExists;

function createSurvey() {
    window.location.href = 'https://snowboiii.github.io/would-you-rather-with-a-timer/create-survey/createsurvey.html';
}

async function checkSurveyExists() {
    console.log(startSurveyInput.value);
    const a = await db.collection("test").get();
    console.log(a);
    // console.log(a._delegate._document.key.path.segments);
    var b = a._delegate._snapshot.docs.keyedMap.root.key.path.segments;
    console.log(b);
    console.log(b.includes(startSurveyInput.value));
    if (b.includes(startSurveyInput.value)) {
        window.location.href = 'https://snowboiii.github.io/would-you-rather-with-a-timer/index.html?code=' + startSurveyInput.value;
    } else {
        document.getElementById("fatal-response-text").style.display = "flex";
    }
}