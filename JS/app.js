const start = document.querySelector('.start-btn button');
const infoBox = document.querySelector('.info-box');
const infoContinue = infoBox.querySelector('.buttons .continue');
const infoQuit = infoBox.querySelector('.buttons .quit');
const quizBox = document.querySelector('.quizBox');
const resultBox = document.querySelector('.result_box');
const scoreText = resultBox.querySelector('.score_text');
const replayQuiz = resultBox.querySelector('.restart');
const quitQuiz = resultBox.querySelector('.quit');
const nextQuesBtn = quizBox.querySelector('footer .buttons .btn')
const quesHeading = document.querySelector('section .question');
const optionList = document.querySelector('section .option_list');
const quesCounter = document.querySelector('footer .ques_num');
const time = document.querySelector('.timer .timer_num')
const tickIcon = '<i class="ri-check-line"></i>';
const wrongIcon = '<i class="ri-close-line"></i>';
let timeValue = 15;
let timeLine;
let counter;
let correctCounter = 0;



let quesNum = 0;
// console.log(questions[0].numb)

start.addEventListener('click', () => {
    infoBox.classList.add('infoActive')
    // start.textContent = 'Replay';
});


infoQuit.addEventListener('click', () => {
    infoBox.classList.remove('infoActive');
    // start.textContent = 'Start Quiz'
});

infoContinue.addEventListener('click', () => {
    quizBox.classList.add('activeQuiz');
    infoBox.classList.remove('infoActive');
    startTimer(timeValue);
    startTimeLine(timeValue);
});

nextQuesBtn.addEventListener('click', () => {
    quesNum++; console.log('next: ', quesNum);

    if (quesNum <= 4) {
        clearInterval(counter);
        clearInterval(timeLine);
        loadQuestion(quesNum)
        startTimer(timeValue);
        startTimeLine(timeValue);

    }
    if (quesNum == 4) {
        console.log(quesNum);
        nextQuesBtn.textContent = 'Finish';
        nextQuesBtn.addEventListener('click', () => {
            resultBox.classList.add('resultActive');
            quizBox.classList.remove('activeQuiz');
            if (correctCounter <= 3) {
                scoreText.textContent = `${correctCounter} of ${questions.length} answers are correct. Need improvement 🙁`;
            }
            else {
                scoreText.textContent = `🎉 congratulations ${correctCounter} of ${questions.length} answers are correct 🎉`;
            }


        })

    }

});

quitQuiz.addEventListener('click', () => {
    window.location.reload();
})

replayQuiz.addEventListener('click', () => {
    resultBox.classList.remove('resultActive');
    quizBox.classList.add('activeQuiz');
    nextQuesBtn.textContent = 'Next Ques';
    nextQuesBtn.removeEventListener('click',()=>{})

    correctCounter = 0;
    timeValue = 15;
    quesNum = 0;
    clearInterval(counter);
    clearInterval(timeLine);
    startTimer(timeValue);
    startTimeLine(timeValue);

    loadQuestion(quesNum);
    console.log(quesNum);

})

function loadQuestion(questionNumber) {
    console.log(quesNum);
    nextQuesBtn.classList.add('choosing');
    quesHeading.textContent = questions[questionNumber].numb + '.' + ' ' + questions[questionNumber].question;
    let ques_tag = `<div class="option"><span>${questions[questionNumber].options[0]}</span></div>
    <div class="option"><span>${questions[questionNumber].options[1]}</span></div>
    <div class="option"><span>${questions[questionNumber].options[2]}</span></div>
    <div class="option"><span>${questions[questionNumber].options[3]}</span></div>`;


    let quesCounterTag = `<span><b>${quesNum + 1}</b> of <b>${questions.length}</b> Questions</span>`
    quesCounter.innerHTML = quesCounterTag;
    optionList.innerHTML = ques_tag;


    const option = optionList.querySelectorAll('.option');

    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }


};

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(timeLine);
    const allOptions = optionList.children.length;
    if (answer.textContent == questions[quesNum].answer) {
        answer.classList.add('correct');
        answer.insertAdjacentHTML("beforeend", tickIcon);
        correctCounter++;
    }
    else {
        answer.classList.add('wrong');
        answer.insertAdjacentHTML("beforeend", wrongIcon);

        for (i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == questions[quesNum].answer) {
                optionList.children[i].classList.add('correct');
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for (i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextQuesBtn.classList.remove('choosing');

};

function startTimer(value) {
    counter = setInterval(countdown, 1000);
    function countdown() {
        --value;
        if (value >= 0) {
            time.textContent = value;
        }
        if (value < 10 && value >= 0) {
            time.textContent = '0' + value;
        }

        if (value == 0) {
            const len = optionList.childElementCount;
            for (i = 0; i < len; i++) {
                if (optionList.children[i].textContent == questions[quesNum].answer) {
                    optionList.children[i].classList.add('correct');
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (i = 0; i < len; i++) {
                optionList.children[i].classList.add('disabled');
            }

            nextQuesBtn.classList.remove('choosing');

        }
    }
}

function startTimeLine(time) {
    timeLine = setInterval(timer, 29);
    const timeBar = document.querySelector('.time_line .percent');
    function timer() {
        time++;
        timeBar.style.width = time + 'px';
        if (time > 549) { //if time value is greater than 549, its the width of our quizBox basicaly
            clearInterval(timeLine); //clear counterLine
        }

    }
}
loadQuestion(0);


//Left at : - time counter tk bann chuka hai uske age se continue karna hai
