//configuration
  const bouncingTime = 500;

//html objects
  const timerObj = document.querySelector('.timer');
  const scoreObj = document.querySelector('.counter');
  const maxScoreObj = document.querySelector('.max-score');

//state
  var timerInterval; 
  var resting;
  var score = 0;
  var maxScoreNum = 0;
  var isRunning = false;
  var darkMode = false;

  function changeMode( mode ){
    if(mode === "dark"){
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      darkMode = false;
    }
    else if(mode === "light"){
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      darkMode = true;
    }
    else {
      document.body.style.backgroundColor = "red";
      document.body.style.color = "black";
      darkMode = false;
    }
  }

  function timer(){
    var sec = 20;
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
            clearInterval(timerInterval);
            isRunning = false;
            timerObj.innerHTML="TIEMPO";
            timerObj.style.fontSize="23vh";
            updateMaxScore(scoreObj.innerHTML);
            maxScoreObj.innerHTML="Más alto: " + maxScoreNum;
            maxScoreObj.style.fontSize="10vh";
        }
    }, 1000);
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

  document.body.addEventListener("click", scoreInc);

  document.addEventListener("keydown", (event) => {
    if( event.key == " " ){
      timer();
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
});
