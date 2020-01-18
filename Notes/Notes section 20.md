In order to determine this we need to ask 3 question.

1. Do we use arrow function, if yes it means this points to where we can write console.log(this) validly this points there in above arrow function. it can be window, cna be any object etc

2. Do we use call, bind, apply? if yes what is first argument of call, bind, apply. I
   It means this point there.
3. the rest cases, this points left of function

- When we define arrow function in class, babel put that in constructor under the hood.

```
sayhello() <!-- this ponits to global -->
color.sayhello() <!-- this ponits to color object -->
```

- when we use getter method we don't have to execute the function

```
  start = () => {
    let remainingTime = this.timeRemaining;
  };
```

- when we use setter method we don't have to give argument in normal syntax

```
  start = () => {
    this.timeRemaining = this.timeRemaining - 1;
  };
```

we can communicate with our class by adding aditional function arguments to our class in process of creating instance of it.

```
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log('Timer started');
  },
  onTick() {
    circle.setAttribute('stroke-dashoffset', currentOffset);
    currentOffset = currentOffset - 50;
  },
  onComplete() {
    console.log('Timer is completed');
  }
});
```
