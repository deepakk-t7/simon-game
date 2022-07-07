let numClick = -1;
let userPattern = [];
let correctPattern = [];
let possibleColors = ["red", "blue", "yellow", "green"];

let level = 0;
let highscore = 0;


$(document).keydown(function(){
    if(level <= 0){
        $("h2").text("The Game Begins")
        nextSequence();
    }
});

// This code returns the id of the button or div clicked

$(".button").click(function(buttonclicked){
    numClick++;
    let color = buttonclicked.target.id;
    clickAnimation("#" + color);
    playAudio(color);
    checkAnswer(color);
});

function checkAnswer(color){
    userPattern.push(color);
    if(color == correctPattern[numClick]){
        if(userPattern.length == correctPattern.length){
            setTimeout(function(){
                userPattern =[];
                numClick = -1;
                nextSequence();
            }, 1000);
        }
    }else{
        $("h2").text("Game Over! Hit another key to start again");
        let audio = new Audio('sounds/wrong.mp3');
    audio.play();

        userPattern = [];
        correctPattern = [];

        if(level > highscore){
            highscore = level;
            $("#highscore").text(level);
        }
        level = 0;
        numClick = -1;
    }
}

function nextSequence(){
    level++;
    $("#level").text(level);
    let rand = Math.floor(Math.random() * 4);
    let color = possibleColors[rand];
    correctPattern.push(color);
    playAudio(color);
    clickAnimation("#" + color);
}

function playAudio(color){
    let relPath = `sounds/${color}.mp3`;
    let audio = new Audio(relPath);
    audio.play();
}

function clickAnimation(id){
    $(id).fadeOut(100).fadeIn(100);
}

