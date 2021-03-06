
//configuration
const startKeyCodeDefault = " ";
const stopKeyCodeDefault = "Escape";
const bouncingTimeDefault = 1500;
const roundTimeDefault = 50;
const clickSideDefault = "right";
const oppositeClickStartDefault = true;
const filenameBase = "basketCounter";

var conf = new Object;
conf.bouncingTime = bouncingTimeDefault;
conf.roundTime = roundTimeDefault;
conf.startKeyCode = startKeyCodeDefault;
conf.stopKeyCode = stopKeyCodeDefault;
conf.clickSide = clickSideDefault;
conf.oppositeClickStart = oppositeClickStartDefault;

//downloadJson("basketCounter_config.json", JSON.stringify(conf));

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
const saveButton = document.querySelector('#save-btn');
const loadButton = document.querySelector('#load-btn');
const submitConfigObj = document.querySelector('.submit-config');

//state
var timerInterval; 
var resting;
var score = 0;
var maxScore = 0;
var isRunning = false;
var darkMode = false;

function twoDigits( numberToFormat ){
  return numberToFormat.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
}

function startTimer(){
  clearInterval(timerInterval);
  score = 0;
  scoreObj.innerHTML = score;
  maxScoreObj.style.fontSize="0vh";

  var sec = conf.roundTime;
  timerObj.innerHTML= "YA!!";
  sec--;
  isRunning = true;

  timerInterval = setInterval( function(){
      timerObj.innerHTML= "00:" + twoDigits(sec);
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
  maxScoreObj.innerHTML="M??s alto: " + maxScore;
  maxScoreObj.style.fontSize="10vh";
}

function incorporateConf(){
  timerObj.innerHTML = "00:" + conf.roundTime;
  roundInputObj.value = conf.roundTime;
  bounceInputObj.value = conf.bouncingTime;
  startKeyCodeObj.value = conf.startKeyCode;
  stopKeyCodeObj.value = conf.stopKeyCode;
  oppositeClickStartObj.checked = conf.oppositeClickStart;
  document.querySelector(`input[name="clickSide"][value=${conf.clickSide}]`).checked = true;
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
    setTimeout( () => { resting = false; }, conf.bouncingTime)
  }
}

function openConf(){
  scoreObj.classList.add("deactivated");
  if(configObj.classList.contains("collapsed")){
    configObj.classList.remove("hidden");
    configObj.classList.remove("collapsed");
  }
  clearEvtListeners();
  setupConfigEvtListeners();
}

function saveAndCloseConf(){
  saveConf();
  closeConf();
}

function saveConf(){
  newBounce = parseInt(bounceInputObj.value);
  newRound = parseInt(roundInputObj.value);
  if( !isNaN(newBounce) ){
    conf.bouncingTime = newBounce;
  }
  if( !isNaN(newRound) ){
    conf.roundTime = newRound;
  }
  conf.startKeyCode = startKeyCodeObj.value || startKeyCodeDefault;
  conf.stopKeyCode = stopKeyCodeObj.value || stopKeyCodeDefault;
  conf.clickSide = document.querySelector('input[name="clickSide"]:checked').value;
  conf.oppositeClickStart = oppositeClickStartObj.checked;
  incorporateConf();
}

function closeConf(){
  configObj.classList.add("collapsed");
  setTimeout( () => {configObj.classList.add("hidden")}, 100);
  scoreObj.classList.remove("deactivated");
  clearConfigEvtListeners();
  setTimeout(setupEvtListeners, 100); //Delayed so that the click is not counted
}

function getConfFilename(){
  now = new Date();
  return filenameBase + "_" + (now.getMonth()+1) + "_" + now.getDay() + 
    "_" + twoDigits(now.getHours()) + twoDigits(now.getMinutes()) + ".json";
}

function downloadJson(filename, jsonInput) {
  var element = document.createElement('a');
  element.setAttribute('href','data:application/json;charset=utf-8, ' + encodeURIComponent(jsonInput));
  element.setAttribute('download', filename);
  document.body.appendChild(element);
  element.click();
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
  if( evt.key == conf.startKeyCode && !isRunning){
    startTimer();
  }
  else if( evt.key == conf.stopKeyCode && isRunning){
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

function closeConfigHandler(evt){
  if(evt.key == "Escape"){
    closeConf();
  }
}

//Event listeners

function setupEvtListeners(){
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener( conf.clickSide == "right" ? "contextmenu" : "click", incrementHandler);
  if(conf.oppositeClickStart){
    document.addEventListener( conf.clickSide == "right" ? "click" : "contextmenu", startHandler);
  }
}

function setupConfigEvtListeners(){
  document.addEventListener("keydown", closeConfigHandler);
}

function clearConfigEvtListeners(){
  document.removeEventListener("keydown", closeConfigHandler);
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

saveButton.addEventListener("click", () => {
  saveConf();
  downloadJson(getConfFilename(), JSON.stringify(conf));
} );

loadButton.addEventListener("input", () => {
  let files = loadButton.files;
  if (files.length == 0) return;
  const file = files[0];
  let reader = new FileReader();

  reader.onload = (e) => {
      const file = e.target.result;
      conf = JSON.parse(file);
      incorporateConf();
  };
  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
} );

setupEvtListeners();


