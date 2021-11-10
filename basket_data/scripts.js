
//configuration
const startKeyCodeDefault = " ";
const stopKeyCodeDefault = "Escape";
const bouncingTimeDefault = 1500;
const roundTimeDefault = 50;
const clickSideDefault = "right";
const oppositeClickStartDefault = true;

var bouncingTime = bouncingTimeDefault;
var roundTime = roundTimeDefault;
var startKeyCode = startKeyCodeDefault;
var stopKeyCode = stopKeyCodeDefault;
var clickSide = clickSideDefault;
var oppositeClickStart = oppositeClickStartDefault;

//html objects
const timerObj = document.querySelector('.timer');
const scoreObj = document.querySelector('.counter');
const maxScoreObj = document.querySelector('.max-score');
const configObj = document.querySelector('.config');
const bounceInputObj = document.querySelector('#bounceTime');
const roundInputObj = document.querySelector('#roundTime');
const startKeyCodeObj = document.querySelector('#startKeyCode');
const stopKeyCodeObj = document.querySelector('#stopKeyCode');
const oppositeClickStartObj = document.querySelector('#oppositeClickStart');
const submitConfigObj = document.querySelector('.submit-config');

//state
var timerInterval; 
var resting;
var score = 0;
var maxScore = 0;
var isRunning = false;
var darkMode = false;


function startTimer(){
  clearInterval(timerInterval);
  score = 0;
  scoreObj.innerHTML = score;
  maxScoreObj.style.fontSize="0vh";

  var sec = roundTime;
  timerObj.innerHTML= "YA!!";
  sec--;
  isRunning = true;

  timerInterval = setInterval( function(){
      timerObj.innerHTML= "00:" + sec.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      sec--;
      if (sec < 1) {
        timerObj.style.fontSize="10vh";
      }
      if (sec < 0) {
        endRound("TIEMPO");
      }
    }, 1000);
}

function endRound(message){
  clearInterval(timerInterval);
  isRunning = false;
  updateMaxScore(scoreObj.innerHTML);
  timerObj.innerHTML=message;
  timerObj.style.fontSize="23vh";
  maxScoreObj.innerHTML="Más alto: " + maxScore;
  maxScoreObj.style.fontSize="10vh";
}

function incorporateConf(){
  timerObj.innerHTML = "00:" + roundTime;
  roundInputObj.value = roundTime;
  bounceInputObj.value = bouncingTime;
  startKeyCodeObj.value = startKeyCode;
  stopKeyCodeObj.value = stopKeyCode;
  oppositeClickStartObj.checked = oppositeClickStart;
  document.querySelector(`input[name="clickSide"][value=${clickSide}]`).checked = true;
}

function updateMaxScore(newScore){
  maxScore = parseInt(newScore) > maxScore ? newScore : maxScore;
  maxScoreObj.innerHTML = maxScore;
}

function scoreInc(){
  if(isRunning && !resting){
    score++;
    scoreObj.innerHTML = score;
    resting = true;
    setTimeout( () => { resting = false; }, bouncingTime)
  }
}

function openConf(){
  scoreObj.classList.add("deactivated");
  if(configObj.classList.contains("collapsed")){
    configObj.classList.remove("hidden");
    configObj.classList.remove("collapsed");
  }
  clearEvtListeners();
}

function saveAndCloseConf(){
  newBounce = parseInt(bounceInputObj.value);
  newRound = parseInt(roundInputObj.value);
  if( !isNaN(newBounce) ){
    bouncingTime = newBounce;
  }
  if( !isNaN(newRound) ){
    roundTime = newRound;
  }
  startKeyCode = startKeyCodeObj.value || startKeyCodeDefault;
  stopKeyCode = stopKeyCodeObj.value || stopKeyCodeDefault;
  clickSide = document.querySelector('input[name="clickSide"]:checked').value;
  oppositeClickStart = oppositeClickStartObj.checked;
  setTimeout(setupEvtListeners, 100); //Delayed so that the click is not counted
  incorporateConf();

  configObj.classList.add("collapsed");
  setTimeout( () => {configObj.classList.add("hidden")}, 100);
  scoreObj.classList.remove("deactivated");
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

function keydownHandler(evt){
  if( evt.key == startKeyCode && !isRunning){
    startTimer();
  }
  else if( evt.key == stopKeyCode && isRunning){
    endRound("STOP");
  }
  else if (evt.key == "d"){
    changeMode("dark");
  }
  else if (evt.key == "s"){
    changeMode("light");
  }
  else if (evt.key == "a"){
    changeMode("board");
  }
  else if (evt.key == "c"){
    openConf();
  }
}

function incrementHandler(evt){
  evt.preventDefault();
  scoreInc();
}

function startHandler(evt){
  evt.preventDefault();
  if(!isRunning){
    startTimer();
  }
}

//Event listeners

function setupEvtListeners(){
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener( clickSide == "right" ? "contextmenu" : "click", incrementHandler);
  if(oppositeClickStart){
    document.addEventListener( clickSide == "right" ? "click" : "contextmenu", startHandler);
  }
}

function clearEvtListeners(){
  document.removeEventListener("keydown", keydownHandler);
  document.removeEventListener( "contextmenu", incrementHandler);
  document.removeEventListener( "click", incrementHandler);
  document.removeEventListener( "contextmenu", startHandler);
  document.removeEventListener( "click", startHandler);
}

window.addEventListener("load", incorporateConf);
submitConfigObj.addEventListener("click", saveAndCloseConf);
setupEvtListeners();

