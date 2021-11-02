//configuration
var bouncingTime = 1000;
var roundTime = 20;

//html objects
const timerObj = document.querySelector('.timer');
const scoreObj = document.querySelector('.counter');
const maxScoreObj = document.querySelector('.max-score');
const configObj = document.querySelector('.config');
const bounceInputObj = document.querySelector('#bounceTime');
const roundInputObj = document.querySelector('#roundTime');
const submitConfigObj = document.querySelector('.submit-config');

//state
var timerInterval; 
var resting;
var score = 0;
var maxScoreNum = 0;
var isRunning = false;
var darkMode = false;



function startTimer(){
  var sec = roundTime;
  clearInterval(timerInterval);
  timerObj.innerHTML= "YA!!";
  sec--;
  isRunning = true;
  maxScoreObj.style.fontSize="0vh";
  score = 0;
  scoreObj.innerHTML = "" + score;

  timerInterval = setInterval( function(){
      timerObj.innerHTML= "00:" + sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      sec--;
      if (sec < 1) {
        timerObj.style.fontSize="10vh";
      }
      if (sec < 0) {
        endRound();
      }
    }, 1000);
}

function endRound(){
  clearInterval(timerInterval);
  isRunning = false;
  updateMaxScore(scoreObj.innerHTML);
  timerObj.innerHTML="TIEMPO";
  timerObj.style.fontSize="23vh";
  maxScoreObj.innerHTML="Más alto: " + maxScoreNum;
  maxScoreObj.style.fontSize="10vh";
}

function renderTimer(){
  timerObj.innerHTML = "00:" + roundTime;
}

function updateMaxScore(newScore){
  maxScoreNum = parseInt(newScore) > maxScoreNum ? newScore : maxScoreNum;
  maxScoreObj.innerHTML = maxScoreNum;
}

function scoreInc(){
  if(isRunning && !resting){
    score++;
    scoreObj.innerHTML = "" + score;
    resting = true;
    var bounce = setInterval( function () {
      resting = false;
      bounce = clearInterval(bounce);
    }, bouncingTime)
  }
}

function openConf(){
  if(configObj.classList.contains("collapsed")){
    configObj.classList.remove("hidden");
    configObj.classList.remove("collapsed");
  }
}

function saveAndCloseConf(){
  newBounce = parseInt(bounceInputObj.value);
  newRound = parseInt(roundInputObj.value);
  if( !isNaN(newBounce) ){
    bouncingTime = newBounce;
  }
  if( !isNaN(newRound) ){
    roundTime = newRound;
    renderTimer();
  }

  configObj.classList.add("collapsed");
  setTimeout( () => {configObj.classList.add("hidden")}, 100);
}

function changeMode( mode ){
  if(mode === "dark"){
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    darkMode = false;
  }
  else if(mode === "light"){
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    darkMode = true;
  }
  else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "red";
    darkMode = false;
  }
}

//Event listeners
document.body.addEventListener("click", scoreInc);

window.addEventListener("load", renderTimer);

submitConfigObj.addEventListener("click", saveAndCloseConf);

document.addEventListener("keydown", (event) => {
  if( event.key == " " && !isRunning){
    startTimer();
  }
  if( event.key == "Escape" && isRunning){
    stopTimer();
  }
  else if (event.key == "d"){
    changeMode("dark");
  }
  else if (event.key == "s"){
    changeMode("light");
  }
  else if (event.key == "a"){
    changeMode("board");
  }
  else if (event.key == "c"){
    openConf();
  }
});
