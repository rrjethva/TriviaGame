$(document).ready(function() {
  var questions = [
    {
      question: "Who is the shortest player of all-time",
      answers: ["Yao Ming", "Manute Bol", "Nate Robinson", "Muggsy Bogues"],
      values: ["false", "false", "false", "true"],
      image: "assets/images/muggsy.gif"
    },

    {
      question: "Who is the lowest seeded team to win the NBA title?",
      answers: [
        "92-93 Bulls",
        "94-95 Houston Rockets",
        "10-11 Dallas Mavericks",
        "18-19 Golden State Warriors"
      ],
      values: ["false", "true", "false", "false"],
      image: "assets/images/rockets.gif"
    },

    {
      question: "What player has the most career points?",
      answers: [
        "Kareem Abdul-Jabbar",
        "Magic Johnson",
        "Michael Jordan",
        "Lebron James"
      ],
      values: ["true", "false", "false", "false"],
      image: "assets/images/kareem.gif"
    },

    {
      question: "What is team has the best regular season record?",
      answers: [
        "Golden State Warriors",
        "Chicago Bulls",
        "Boston Celtics",
        "LA Lakers"
      ],
      values: ["true", "false", "false", "false"],
      image: "assets/images/gsw.gif"
    },
    {
      question: "Which player has the highest career 3-pt FG percentage?",
      answers: ["Stephen Curry", "J.J. Reddick", "Steve Kerr", "Ray Allen"],
      values: ["false", "false", "true", "false"],
      image: "assets/images/kerr.gif"
    },
    {
      question: "Which player has the most NBA Finals MVP awards?",
      answers: ["Lebron James", "Kobe Bryant", "Tim Duncan", "Michael Jordan"],
      values: ["false", "false", "false", "true"],
      image: "assets/images/mj.gif"
    },
    {
      question: "What player has the highest career FT percentage?",
      answers: ["James Harden", "Steve Nash", "John Stockton", "Stephen Curry"],
      values: ["false", "true", "false", "false"],
      image: "assets/images/nash.gif"
    },
    {
      question:
        "What player holds the record for most consecutive double-doubles?",
      answers: [
        "Russell Westbrook",
        "Kevin Love",
        "Kobe Bryant",
        "Michael Jordan"
      ],
      values: ["false", "true", "false", "false"],
      image: "assets/images/kevinlove.gif"
    },
    {
      question:
        "Which coach has the most consecutive seasons with a .500 winning percentage?",
      answers: ["Pat Riley", "Rudy T", "Phil Jackson", "Don Nelson"],
      values: ["false", "false", "true", "false"],
      image: "assets/images/phil.gif"
    }
  ];

  var currentQuestion = 0;
  var correct = 0;
  var wrong = 0;
  var none = 0;

  $("#start").on("click", function() {
    $("#start").fadeToggle("slow", displayQ);
  });

  function displayQ() {
    $(".message-content").remove();
    $("#start").remove();

    var questionArea = $("<div>");
    questionArea.attr("id", "question-area");
    var timer = $("<h2>");
    var question = $("<h2>");

    questionArea.appendTo("#content");
    timer.appendTo(questionArea);
    question.appendTo(questionArea);

    var time = 30;
    timer.html("<h2>" + time + " seconds remaining</h2>");

    var countDown = setInterval(function() {
      time--;
      timer.html("<h2>" + time + " seconds remaining</h2>");

      if (time === 0) {
        clearInterval(countDown);
        questionArea.fadeToggle("slow", timedOut);
        none++;
      }
    }, 1000);

    question.html(questions[currentQuestion].question);

    for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
      var answers = $("<button>");
      answers.html(questions[currentQuestion].answers[i]);
      answers.addClass("answer-buttons");
      answers.attr("value", questions[currentQuestion].values[i]);
      answers.attr("id", "a" + i);
      answers.appendTo(questionArea);
    }

    $("#a0").animate({ left: "+=600px" });

    $(".answer-buttons").on("click", function() {
      if ($(this).attr("value") === "true") {
        questionArea.fadeToggle("slow", displayCorrect);
        clearInterval(countDown);
        correct++;
      }

      if ($(this).attr("value") === "false") {
        questionArea.fadeToggle("slow", displayWrong);
        clearInterval(countDown);
        wrong++;
      }
    });
  }

  function displayCorrect() {
    var cycle = setTimeout(displayQ, 5000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content");

    var winMessage = $("<h2>");
    var detail = $("<h2>");
    var image = $("<img>");

    messageArea.appendTo($("#content"));
    winMessage.appendTo($(messageArea));
    detail.appendTo($(messageArea));
    image.appendTo($(messageArea));
    winMessage.text("Correct!");
    detail.text(questions[currentQuestion].detail);
    image.attr("src", questions[currentQuestion].image);

    if (currentQuestion === questions.length - 1) {
      clearTimeout(cycle);
      var gameEnd = setTimeout(gameOver, 10000);
    }
    currentQuestion++;
  }

  function displayWrong() {
    var cycle = setTimeout(displayQ, 10000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content");
    var lossMessage = $("<h2>");
    var detail = $("<h2>");
    var image = $("<img>");

    messageArea.appendTo($("#content"));
    lossMessage.appendTo(messageArea);
    detail.appendTo($(messageArea));
    image.appendTo($(messageArea));
    lossMessage.html(
      "Wrong! The right answer was: " +
        questions[currentQuestion].answers[questions[currentQuestion].values.indexOf(true)]
    );
    detail.text(questions[currentQuestion].detail);
    image.attr("src", questions[currentQuestion].image);

    if (currentQuestion === questions.length - 1) {
      clearTimeout(cycle);
      var gameEnd = setTimeout(gameOver, 10000);
    }
    currentQuestion++;
  }

  function timedOut() {
    var cycle = setTimeout(displayQ, 10000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content");
    var lossMessage = $("<h2>");
    var detail = $("<h2>");
    var image = $("<img>");

    messageArea.appendTo($("#content"));
    lossMessage.appendTo(messageArea);
    detail.appendTo($(messageArea));
    image.appendTo($(messageArea));
    lossMessage.html(
      "You timed out! The right answer was: " +
        questions[currentQuestion].answers[
          questions[currentQuestion].values.indexOf(true)
        ]
    );
    detail.text(questions[currentQuestion].detail);
    image.attr("src", questions[currentQuestion].image);

    if (currentQuestion === questions.length - 1) {
      clearTimeout(cycle);
      var gameEnd = setTimeout(gameOver, 10000);
    }
    currentQuestion++;
  }

  function gameOver() {
    $(".message-content").remove();
    var totalCorrect = $("<h3>");
    var totalIncorrect = $("<h3>");
    var totalNone = $("<h3>");
    var restart = $("<button>");
    totalCorrect.appendTo($("#content"));
    totalCorrect.html("You got " + correct + " correct!");
    totalIncorrect.appendTo("#content");
    totalIncorrect.html("You got " + wrong + " wrong.");
    totalNone.appendTo("#content");

    if (none === 1) {
      totalNone.html("You didn't answer " + none + " question.");
    }
    if (none > 1 || none === 0) {
      totalNone.html("You didn't answer " + none + " questions.");
    }

    restart.addClass("restart");
    restart.text("Restart");
    restart.appendTo($("#content"));

    $(".restart").on("click", function() {
      totalCorrect.remove();
      totalIncorrect.remove();
      totalNone.remove();
      restart.remove();
      currentQuestion = 0;
      correct = 0;
      wrong = 0;
      none = 0;
      displayQ();
    });
  }
});
