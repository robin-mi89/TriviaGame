
//plans for trivia. 
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;
var timeLeft = 5;
var intervalID;
var IntervalId2;
var questionNum = 0;
var correctAnswer = "";
var allQuestions = [];

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

var question1 = new Question("What is my name?", "Robin", "Dan", "Sam", "Chuck", "a");
var question2 = new Question("What is the formula for power?", "v=ir", "f=ma", "p=iv", "k=xy", "c")
allQuestions.push(question1);
allQuestions.push(question2);

$(document).ready(function() {

$("#start").on("click", start);
$("#stop").on("click", stop);
$("body").on("click", ".answer", checkAnswer);





});

function start()
{
    intervalId = setInterval(decrement, 1000);
}

function decrement()
{
    timeLeft--;
    $("#time-left").text(timeLeft);
    if (timeLeft <= 0)
    {
        console.log("less than 0");
        stop(); 
        wrong(2);
       
    }
}

function wrong(typeWrong)
{
    stop();
    if (typeWrong === 1)
    {
        console.log("incorrect answer");
        incorrectCount++;
        $("#incorrect").text("Incorrect: " + incorrectCount);
    }
    else if (typeWrong === 2)
    {
        console.log("timed out");
        unansweredCount++;
        $("#unanswered").text("Unanswered: " + unansweredCount);
    }

    getNext();
}

function nextQuestion()
{
    if(questionNum < allQuestions.length)
    {
    start();
    console.log(allQuestions[questionNum]);
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
        $("#questions").text("Finished Quiz");
    }
}

function checkAnswer()
{
    var temp = $(this).attr("value")
    var tempcorrect = correctAnswer;
    if ($(this).attr("value") === correctAnswer)
    {
        correct();
    }
    else
    {
        wrong(1);
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
    clearInterval(intervalId);
}

function getNext()
{
    $("#question").text("Preparing for next question");
    setTimeout(nextQuestion, 5000);

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