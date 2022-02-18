var buttonColours = ['red', 'green', 'yellow', 'blue'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function (e) {
    if (!started) {
        $("h1").text("level" + level);
        nextSequence();
        started = true;
    }
});

$('.box').click(function () {
    var userChosenColor = $(this).attr("id");
    console.log(userChosenColor) ;
    userClickedPattern.push(userChosenColor);

    $("#" + userChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong") ;
        $('body').addClass('gameOver') ;
        $("h1").text('Game Over Press Any Key to Restart');

        setTimeout(() => {
            $('body').removeClass('gameOver') ;
        }, 200);
        startOver() ;
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text("level" + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
}

function playSound(color) {
    var audio = new Audio(color + ".mp3") ;
    audio.play() ;
}

function startOver() {
    level = 0 ;
    started = false ;
    gamePattern = [] ;
}