
//plans for trivia. 
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;
var timeLeft = 5;
var intervalID;
var questionNum = 0;
var correctAnswer = "";
var allQuestions = [];
var userAnswered = false;
var audio = $("audio");
var started = false;

class Question {
    constructor(question, answer1, answer2, answer3, answer4, correctAnswer){
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correctAnswer = correctAnswer
    }
}

var question1 = new Question("The golden gate bridge was completed in:", "1936", "1937", "1938", "2017", "b");
var question2 = new Question("San Francisco was incorporated in:", "1850", "1849", "1901", "1862", "a");
var question3 = new Question("The famous fisherman's wharf is number: ", "42", "38", "21", "39", "d");
var question4 = new Question("The name San Francisco is: ", "French for foggy city", "Spanish for Saint Francis", "Javascript for home city", "Ohlone for cliff side", "b");
var question5 = new Question("San Francisco is ranked ________ in the US in terms of population:", "1st", "3rd", "12th", "13th", "d");
var question6 = new Question("The gold rush brought in a flood of treasure seekers known as?", "The 76ers", "The dot com boomers", "The 49ners", "The 101 air-borne", "c");
var question8 = new Question("Which of these banks became Bank of America after the 1906 earthquake?", "Bank of Italy", "Bank of California", "Bank of Japan", "Deutsche Bank", "a");
var question7 = new Question("Which year was the great San Francisco earthquake?", "1906", "2017", "1949", "1925", "a");
var question9 = new Question("The famous victorian style houses of San Francisco are named:", "The grand mansions", "The painted ladies", "The old houses", "The victorians", "b");

allQuestions = [question1, question2, question3, question4, question5, question6, question7, question8, question9];

$(document).ready(function() {

$("#start").on("click", start);
$("#stop").on("click", stop);
$("body").on("click", ".answer", checkAnswer);
$("body").on("click", "#reset", reset);
});

function start()
{
    nextQuestion();
}

function restartInterval()
{
    intervalID = setInterval(decrement, 1000);
}

function decrement()
{
    $("#time-left").text("Time Left: " + timeLeft);
    if (timeLeft <= 0)
    {
        //console.log("less than 0");
        userAnswered = true;
        stop(); 
        wrong(2);
       
    }
    timeLeft--;
    
}

function wrong(typeWrong)
{
    stop();
    if (typeWrong === 1)
    {
        //console.log("incorrect answer");
        $("#question").text("Incorrect, the correct answer was: ")
        incorrectCount++;
        $("#incorrect").text("Incorrect: " + incorrectCount);
    }
    else if (typeWrong === 2)
    {
        //console.log("timed out");
        $("#question").text("You have ran out of time, the correct answer was: ")
        unansweredCount++;
        $("#unanswered").text("Unanswered: " + unansweredCount);
    }

    getNext();
}

function nextQuestion()
{
    $(".answer").animate({ opacity: 100 });
    userAnswered = false;
    if(questionNum < allQuestions.length)
    {
        timeLeft = 5;
        restartInterval();
        //console.log(allQuestions[questionNum]);
        var currentQuestion = allQuestions[questionNum];
        $("#question").text(currentQuestion.question);
        $("#answer1").text("a: " + currentQuestion.answer1);
        $("#answer2").text("b: " + currentQuestion.answer2);
        $("#answer3").text("c: " + currentQuestion.answer3);
        $("#answer4").text("d: " + currentQuestion.answer4);
        correctAnswer = currentQuestion.correctAnswer;
        questionNum++;
    }
    else
    {
        $("#question").text("You Completed the Quiz!");
        $("#answer1").hide();
        $("#answer2").hide();
        $("#answer3").hide();
        $("#answer4").hide();
        $("#reset").text("Click Here to Try Again");
    }
}

function checkAnswer()
{
    if (userAnswered === false)
    {
        userAnswered = true;
        if ($(this).attr("value") === correctAnswer)
        {
            correct();
        }
        else
        {
            wrong(1);
        }
    }
}

function correct()
{
    stop();
    $("#question").text("Correct!");
    correctCount++;
    $("#correct").text("Correct: " + correctCount);
    getNext();
}

function stop()
{
    clearInterval(intervalID);
}

function getNext()
{
    //$("#question").text("Preparing for next question");
    isWrong($("#answer1"));
    isWrong($("#answer2"));
    isWrong($("#answer3"));
    isWrong($("#answer4"));
    setTimeout(nextQuestion, 5000);

}

function isWrong(answer)
{
    if ($(answer).attr("value") != correctAnswer)
    {
        answer.animate({ opacity: 0 }, 4000);
    }
}

function reset()
{
    if (started === false)
    {
        started = true;
        start();
        $("#reset").text("");
    }
    else
    {
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
        questionNum = 0;
        correctAnswer = "";
        userAnswered = false;
        $("#reset").text("");
        $("#incorrect").text("Incorrect: " + incorrectCount);
        $("#correct").text("Correct: " + correctCount);
        $("#unanswered").text("Unanswered: " + unansweredCount);
        $("#answer1").show();
        $("#answer2").show();
        $("#answer3").show();
        $("#answer4").show();
        start();
    }
}
//needs objects? question, answer 1, answer2, answer3, answer4, correct answer location. 
//add all questions to array allQuestions
//AskQuestion: pick random question out of allQuestions, 1 p for question, another for each answer. put attr a, b, c, d in each answer. put correctanswer value in as well?
//set time remaining, countdown for how much time is left

//onclick: if correct answer [this.value === this.answer, correct(), 
            //else: wrong(1), then wait interval time.

//if on event timer runs out: wrong(2), then wait interval time.

//correct(): show correct prompt, then add 1 to correctCount, then wait interval time. askQuestion()
//wrong(): show incorrect prompt, then add1 to incorrectCount/unanswered, then wait interval time. askQuestion()
            //on 1 param, show prompt for chose wrong. on 2 param, show run out of time. 

//reset(): recreate questions array.