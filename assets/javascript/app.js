var counter = 30;
var currentQuestion = 0;
var score = 0;
var losses = 0;
var timer;

const triviaQuestions = [
    {
        question: "Who is the shortest player of all-time",
        choices: ["Yao Ming", "Manute Bol", "Nate Robinson", "Muggsy Bogues"],
        correctAnswer: "Muggsy Bogues"
    },

    {
        question: "Who is the lowest seeded team to win the NBA title?",
        choices: ["92-93 Bulls", "94-95 Houston Rockets", "10-11 Dallas Mavericks", "18-19 Golden State Warriors"],
        correctAnswer: "94-95 Houston Rockets"
    },

    {
        question: "What player has the most career points?",
        choices: ["Kareem Abdul-Jabbar", "Magic Johnson", "Michael Jordan", "Lebron James"],
        correctAnswer: "Kareem Abdul-Jabbar"
    },

    {
        question: "What is team has the best regular season record?",
        choices: ["Golden State Warriors", "Chicago Bulls", "Boston Celtics", "LA Lakers"],
        correctAnswer: "Golden State Warriors"
    },
    {
        question: "Which player has the highest career 3-pt FG percentage?",
        choices: ["Stephen Curry", "J.J. Reddick", "Steve Kerr", "Ray Allen"],
        correctAnswer: "Steve Kerr"
    },
    {
        question: "Which player has the most NBA Finals MVP awards?",
        choices: ["Lebron James", "Kobe Bryant", "Tim Duncan", "Michael Jordan"],
        correctAnswer: "Michael Jordan"
    },
    {
        question: "What player has the highest career FT percentage?",
        choices: ["James Harden", "Steve Nash", "John Stockton", "Stephen Curry"],
        correctAnswer: "Steve Nash"
    },
    {
        question: "What player holds the record for most consecutive double-doubles?",
        choices: ["Russell Westbrook", "Kevin Love", "Kobe Bryant", "Michael Jordan"],
        correctAnswer: "Kevin Love"
    },
    {
        question: "Which coach has the most consecutive seasons with a .500 winning percentage?",
        choices: ["Pat Riley", "Rudy T", "Phil Jackson", "Don Nelson"],
        correctAnswer: "Phil Jackson"
    },
];


// this function will display the questions
function question() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = triviaQuestions[question].question;
    const choices = triviaQuestions[question].choices;

    $('#time').html(counter);
    $('#game').html(`<h3>${question}</h3> ${loadChoices(choices)} ${loadRemainingQuestion()}`);
}

function loadChoices(choices) {
    let result = "";
    for (i=0; i < choices.length; i++) {
        result += '<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>';
    }
    return result;
}


// start timer
function timesUp() {
    clearInterval(timer);
    losses++;

    setTimeout(question, 3000);
}

function countDown() {
    counter--;
    $('#time').html(counter);
    if (counter === 0) {
        timesUp();
    }
}


