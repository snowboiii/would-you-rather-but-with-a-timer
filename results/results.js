const titles = [
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
const xValues = [
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

const barColors = [
    "red", "blue"
];

async function sumAnswers(questionId) {
    const snapshot = await db.collection("surveyResponses")
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

for (let i = 0; i <= 11; i++) {
    createChart(i)
}

async function createChart(questionId) {
    const lefts = (await sumAnswers(questionId)).leftCount;
    const rights = (await sumAnswers(questionId)).rightCount;

    new Chart(`chart-${questionId}`, {
        type: "bar",
        data: {
            labels: xValues[questionId],
            datasets: [{
                backgroundColor: barColors,
                data: [lefts, rights, 0, 10]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {display: false},
            title: {
                display: true,
                text: titles[questionId][0]
            }
        }
    });
}

function zoomChart(container) {
    if (container.classList.contains('zoomed')) return;
    
    const placeholder = container.cloneNode(true);
    placeholder.classList.add('zoomed-placeholder');
    placeholder.id = 'placeholder-' + Math.random().toString(36).substring(2, 9);
    container.parentNode.insertBefore(placeholder, container);
    
    document.body.classList.add('zoomed-mode');
    container.classList.add('zoomed');
    document.querySelector('.close-button').style.display = "block";
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