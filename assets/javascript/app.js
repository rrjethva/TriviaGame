$(document).ready(function () {

    let counter = 30;
    let currentQuestion = 0;
    let score = 0;
    let lost = 0;
    let timer;

    var quizQuestions = [
        {
            question: "Who is the shortest player of all-time",
            choices: ["Yao Ming", "Manute Bol", "Nate Robinson", "Muggsy Bogues"],
            correctAnswer: "Muggsy Bogues",
            image: ("assets/images/muggsy.gif"),
        },

        {
            question: "Who is the lowest seeded team to win the NBA title?",
            choices: ["92-93 Bulls", "94-95 Houston Rockets", "10-11 Dallas Mavericks", "18-19 Golden State Warriors"],
            correctAnswer: "94-95 Houston Rockets",
            image: ("assets/images/rockets.gif"),
        },

        {
            question: "What player has the most career points?",
            choices: ["Kareem Abdul-Jabbar", "Magic Johnson", "Michael Jordan", "Lebron James"],
            correctAnswer: "Kareem Abdul-Jabbar",
            image: ("assets/images/kareem.gif"),
        },

        {
            question: "What is team has the best regular season record?",
            choices: ["Golden State Warriors", "Chicago Bulls", "Boston Celtics", "LA Lakers"],
            correctAnswer: "Golden State Warriors",
            image: ("assets/images/gsw.gif"),
        },
        {
            question: "Which player has the highest career 3-pt FG percentage?",
            choices: ["Stephen Curry", "J.J. Reddick", "Steve Kerr", "Ray Allen"],
            correctAnswer: "Steve Kerr",
            image: ("assets/images/kerr.gif"),
        },
        {
            question: "Which player has the most NBA Finals MVP awards?",
            choices: ["Lebron James", "Kobe Bryant", "Tim Duncan", "Michael Jordan"],
            correctAnswer: "Michael Jordan",
            image: ("assets/images/mj.gif"),
        },
        {
            question: "What player has the highest career FT percentage?",
            choices: ["James Harden", "Steve Nash", "John Stockton", "Stephen Curry"],
            correctAnswer: "Steve Nash",
            image: ("assets/images/nash.gif"),
        },
        {
            question: "What player holds the record for most consecutive double-doubles?",
            choices: ["Russell Westbrook", "Kevin Love", "Kobe Bryant", "Michael Jordan"],
            correctAnswer: "Kevin Love",
            image: ("assets/images/kevinlove.gif"),
        },
        {
            question: "Which coach has the most consecutive seasons with a .500 winning percentage?",
            choices: ["Pat Riley", "Rudy T", "Phil Jackson", "Don Nelson"],
            correctAnswer: "Phil Jackson",
            image: ("assets/images/phil.gif"),
        },
    ];

    // var winImages = [
    //     './assets/images/muggsy.gif',
    //     './assets/images/rockets.gif',
    //     './assets/images/kareem.gif',
    //     './assets/images/gsw.gif',
    //     './assets/images/kerr.gif',
    //     './assets/images/mj.gif',
    //     './assets/images/nash.gif',
    //     './assets/images/kevinlove.gif',
    //     './assets/images/phil.gif',
    // ];

    var lossImages = [
        './assets/images/lose1.gif',
        './assets/images/lose2.gif',
        './assets/images/lose3.gif',
        './assets/images/lose4.gif',
        './assets/images/lose5.gif',
    ];

    
    function nextQuestion() {
        const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
        if (isQuestionOver) {
            // TODO
            console.log('Game is over!!!!!');
            displayResult();
        } else {
            currentQuestion++;
            loadQuestion();
        }

    }

    
    function timeUp() {
        clearInterval(timer);

        lost++;

        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }

    function countDown() {
        counter--;

        $('#time').html('Timer: ' + counter);

        if (counter === 0) {
            timeUp();
        }
    }

   
    function loadQuestion() {
        counter = 30;
        timer = setInterval(countDown, 1000);

        const question = quizQuestions[currentQuestion].question; // 
        const choices = quizQuestions[currentQuestion].choices; // 

        $('#time').html('Timer: ' + counter);
        $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
    }

    function loadChoices(choices) {
        let result = '';

        for (let i = 0; i < choices.length; i++) {
            result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
        }

        return result;
    }

    
    $(document).on('click', '.choice', function () {
        clearInterval(timer);
        const selectedAnswer = $(this).attr('data-answer');
        const correctAnswer = quizQuestions[currentQuestion].correctAnswer;


        if (correctAnswer === selectedAnswer) {
            score++;
            console.log('Winsss!!!!');
            preloadImage();
            setTimeout(nextQuestion, 3 * 1000);
        } else {
            lost++;
            console.log('Lost!!!!');
            preloadImage('lost');
            setTimeout(nextQuestion, 3 * 1000);
        }
    });


    function displayResult() {
        const result = `
        <p>You get ${score} questions(s) right</p>
        <p>You missed ${lost} questions(s)</p>
        <p>Total questions ${quizQuestions.length} questions(s) right</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

        $('#game').html(result);
    }


    $(document).on('click', '#reset', function () {
        counter = 30;
        currentQuestion = 0;
        score = 0;
        lost = 0;
        timer = null;

        loadQuestion();
    });


    function loadRemainingQuestion() {
        const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
        const totalQuestion = quizQuestions.length;

        return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
    }


    function randomImage(images) {
        const random = Math.floor(Math.random() * images.length);
        const randomImage = images[random];
        return randomImage;
    }


    
    function preloadImage(status) {
        const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
        const correctImage = quizQuestions[currentQuestion].image;

        if (status === 'win') {
            $('#game').html(`
            <p class="preload-image">Congratulations, you pick the corrrect answer</p>
            <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
            <img src="${image}" />
        `);
        } else {
            $('#game').html(`
            <p class="preload-image">The correct answer was <b>${correctAnswer}</b></p>
            <p class="preload-image">You lost pretty bad</p>
            <img src="${randomImage(lossImages)}" />
        `);
        }
    }

    $('#start').click(function () {
        $('#start').remove();
        $('#time').html(counter);
        loadQuestion();
    });

});