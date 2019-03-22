var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var num1 = 1;

$(document).keypress(function(event) {

    if(num1 === 1) {
        nextSequence();
    }
    num1 = 2;
})

$('.btn').click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour); 
    playSound(userChosenColour);
    
    $('#'+userChosenColour).addClass('pressed').fadeOut(100).fadeIn(100);
    
    setTimeout(function () {
        $('#'+userChosenColour).removeClass('pressed');
    }, 20);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $('body').addClass('game-over').fadeOut(100).fadeIn(100);
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 50);

    }

}

function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);       
    
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);

    var audio = new Audio('sounds/'+randomChosenColour+'.mp3');
    audio.play();

    $('h1').text('Level '+level);

    level++;

    return randomChosenColour;
}


function playSound(name) {
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}