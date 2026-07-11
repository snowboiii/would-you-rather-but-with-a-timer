const urlParams = new URLSearchParams(window.location.search);
const surveyCode = urlParams.get('code');

let questions = [];
let answers = [];

const barColors = [
    "#e84545", "#2545e8"
];

window.onload = onLoad();

async function onLoad() {
    const snapshot = await db.collection("test").doc(surveyCode).get();
    questions = snapshot.data().questions;
    answers = snapshot.data().answers;
    for (let i = 0; i < questions.length; i++) {
        await createChart(i);
    }
    document.querySelectorAll(".chart-container").forEach(div => {
        div.onclick = function (){
            if (div.classList.contains('zoomed')) return;
    
            const placeholder = div.cloneNode(true);
            placeholder.classList.add('zoomed-placeholder');
            placeholder.id = 'placeholder-' + Math.random().toString(36).substring(2, 9);
            div.parentNode.insertBefore(placeholder, div);
            
            document.body.classList.add('zoomed-mode');
            div.classList.add('zoomed');
            document.querySelector('.close-button').style.display = "block";
        };
    });
}

async function sumAnswers(questionId) {
    const snapshot = await db.collection(`test/${surveyCode}/answers`)
        .where("questionId", "==", questionId)
        .get();

    let leftCount = 0;
    let rightCount = 0;

    snapshot.forEach((doc) => {
        const choice = doc.data().choice;
        if (choice === 0) leftCount++;
        else if (choice === 1) rightCount++;
    });

    return { leftCount, rightCount };
}

async function createChart(questionId) {
    const lefts = (await sumAnswers(questionId)).leftCount;
    const rights = (await sumAnswers(questionId)).rightCount;

    const chartDiv = document.createElement("div");
    chartDiv.className = "chart-container";
    chartDiv.id = `container-${questionId}`;
    
    const canvas = document.createElement("canvas");
    canvas.id = `chart-${questionId}`;
    chartDiv.append(canvas);
    document.getElementsByClassName("container")[0].insertBefore(chartDiv, document.getElementsByClassName("close-button")[0]);

    new Chart(`chart-${questionId}`, {
        type: "bar",
        data: {
            labels: [answers[2 * questionId], answers[2 * questionId + 1]],
            datasets: [{
                backgroundColor: barColors,
                data: [lefts, rights, 0, Math.max(lefts, rights) + 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {display: false},
            title: {
                display: true,
                text: questions[questionId],
                fontColor: "#e2e2e2"
            },
            scales: {
                xAxes: [{
                    gridLines: { color: "#e2e2e2" },
                    ticks: { fontColor: "#e2e2e2" }
                }],
                yAxes: [{
                    gridLines: { color: "#e2e2e2" },
                    ticks: { fontColor: "#e2e2e2" }
                }]
            }
        }
    });
}

function unzoomChart(e) {
    e.stopPropagation();
    document.body.classList.remove('zoomed-mode');
    const zoomedChart = document.querySelector('.chart-container.zoomed');
    if (zoomedChart) {
        zoomedChart.classList.remove('zoomed');
        const placeholder = document.querySelector('.zoomed-placeholder');
        if (placeholder) {
            placeholder.parentNode.insertBefore(zoomedChart, placeholder);
            placeholder.remove();
        }
    }
    document.querySelector('.close-button').style.display = "none";
}