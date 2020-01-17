class Timer {
  constructor(durationInput, startButton, pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    this.startButton.addEventListener('click', this.start);
  }
  /* start: function() {
    this.anothermethod();
    console.log('Time to start the timer!');
  } THIS IS HOW THE ENGINE SHOW THIS FUNCTION */

  /* we can solve this issue in 2 ways. 
  start=() => {
    this.anothermethod(); this will work because under the hood babel
     put this code to construcor and call there, as a result this will be class in there
    console.log('Time to start the timer!');
  } */

  /* another way is below */

  /* this.startButton.addEventListener('click', this.start.bind(this)); */

  start() {
    this.anothermethod();
    console.log('Time to start the timer!');
  }
  
  anothermethod() {
    console.log('we need this method');
  }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton);
