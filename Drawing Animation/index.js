class Timer {
  constructor(durationInput, startButton, pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    this.startButton.addEventListener(
      'click',
      this.start
    ); /* 2
    but when we call this one */
  }

  start() {
    this.anothermethod(); /* 3 this won't work because in here this points to button and 
    it cannot find anothermethod in button */
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
// timer.start();
/*1 this code will work immitiately and without problem because this in here 
has refernce, it knows it should point to timer. */

// console.log(this); /* both will be window */
// const sayhello = () => {
//   console.log(
//     this
//   ); /*  because this is arrow, when we have arrow,
//   this inside of it is the same with what is this outside of function */
// };
// sayhello();

// const hello = {
//   saybye() {
//     console.log(this); /* both points to hello object  */
//     const saybye2 = () => {
//       console.log(this); /* both points to hello object  */
//     };
//     saybye2();
//   }
// };
// hello.saybye();

// function sayhello() {
//   console.log(this);
// }

// sayhello.call({
//   a: '2'
// }); /* if we use call, bind, apply
// we say this inside of call points to first parametr of call method
//  */

// function sayhello() {
//   console.log(this);
// }

// // sayhello(); /* global window object */

// const color = {
//   method: sayhello
// };

// color.method(); /* this points to color */

const color = {
  sayhello() {
    console.log(this.a);
  }
};
// const color = {
//   sayhello() {
//     console.log(this);
//   }
// };
const anotherObject = {
  a: 'hello'
};
anotherObject.sayhelloatleast = color.sayhello;

anotherObject.sayhelloatleast(); /* this points to anotherObject because it is left of function */
