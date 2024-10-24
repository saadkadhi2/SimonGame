const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let clicked = 0;
$("div[type='button']").click(function () {
    clicked++;
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if(clicked === level) {
        checkAnswer();
    }
});
document.addEventListener('keydown', (event) => {
    userClickedPattern = [];
    nextSequence();
    $("#level-title").text("Level " + level);
});
document.removeEventListener('keydown', (event) => {
    userClickedPattern = [];
    nextSequence();
    $("#level-title").text("Level " + level);
});

//helper functions
function nextSequence() {
    userClickedPattern = [];
    clicked = 0;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.volume = 0.5;
    audio.play().catch(function(error) {
        console.error("Audio playback failed: ", error);
    });

    level++;
    $("#level-title").text("level " + level);
}
function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.volume = 0.5;
    audio.play().catch(function(error) {
        console.error("Audio playback failed: ", error);
    });
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer() {
    let status = "success";
    for (let i = 0; i < gamePattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            status = "wrong";
            let audio = new Audio('sounds/wrong.mp3');
            audio.volume = 0.5;
            audio.play().catch(function(error) {
                console.error("Audio playback failed: ", error);
            });
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
            break;
        } else {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }

}
function startOver() {
    level = 0;
    gamePattern = [];
}