const titles = [
    ["You see someone drop a wallet with 200€ in it. No one else notices.", 0],
    ["Your friend's horrible artwork is being shown at school. They ask you if you like it, looking proud and nervous.", 1],
    ["You're about to fail a big exam. A friend secretly gives you the answers.", 2],
    ["You forgot your best friend's birthday. You can lie and say the gift is late, or tell the truth.", 3],
    ["A trolley is heading towards 5 people. You can pull the lever to divert it to the other track, killing 1 person instead.", 4],
    ["You find someone unconscious in a park. You're running late for an important appointment.", 5],
    ["You're offered 1.000€ to test a new shampoo on rabbits. It's legal, but will hurt them.", 6],
    ["You see a child stealing food in a shop. You're the only one who saw it.", 7],
    ["You see a friend being mean to someone anonymously online. No one knows it's them.", 8],
    ["You're interviewing for your dream job. They ask if you've ever lied—and being honest might cost you the job.", 9],
    ["Question 11", 10],
    ["Question 12", 11]
];
const xValues = [
    ["Keep the money.", "Try to return it."],
    ["Lie and say you love it.", "Tell them the truth and break their heart."],
    ["Use the answers and pass.", "Don't cheat, even if it means failing."],
    ["Lie to save the friendship.", "Tell the truth and take the blame."],
    ["Pull the lever.", "Do nothing."],
    ["Call for help and stay with them.", "Leave and continue on your way."],
    ["Take the job.", "Refuse, even if you need the money."],
    ["Report it.", "Let it go—they probably need it."],
    ["Call them out, risking the friendship.", "Ignore it. Not your problem."],
    ["Lie and say you're always truthful.", "Admit you've lied before."],
    ["Answer11/1", "Answer11/2"],
    ["Answer12/1", "Answer12/2"]
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

    console.log(`Question ${questionId}: Left = ${leftCount}, Right = ${rightCount}`);
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
            legend: {display: false},
            title: {
                display: true,
                text: titles[questionId][0]
            }
        }
    });
}
