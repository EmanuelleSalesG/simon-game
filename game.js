let buttonColours = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

$('.btn').on("click", function(){
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length);

});

let level = 0;

function nextSequence(){

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(200).fadeIn(200);

    playSound(randomChosenColour);

    level++;

    $('#level-title').text('Level ' + level);
    
}

function playSound(name){

    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();

}

function animatePress(currentColour){
    
    $(`#${currentColour}`).addClass('pressed');

    setTimeout(function(){
        $(`#${currentColour}`).removeClass('pressed');
        $('body').removeClass('game-over');
    }, 200);
}



$('body').on('keypress', function(event){
    
    
    if(event.key == 'a' && level === 0){
        nextSequence();     
    }
    
});

function checkAnswer(lengthUserChoise){

    console.log('lengthUserChoise: ' + lengthUserChoise);
    console.log('gamePattern.length: ' + gamePattern.length);

    if(lengthUserChoise === gamePattern.length){
        for(let i = 0; i < lengthUserChoise; i++){
            if(gamePattern[i] === userClickedPattern[i]){
                console.log('sucess');
            }else{
                console.log('wrong');
                gamePattern = [];
                level = 0;
                $('body').addClass('game-over');
                playSound('wrong');
                break;
            }
        }
        userClickedPattern = [];

        if(level > 0)
            nextSequence();
    }

   
}

