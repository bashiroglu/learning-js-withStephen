In order to determine this we need to ask 3 question.

1. Do we use arrow function, if yes it means this points to where in above line this
   points. it can be window, cna be any object etc
2. Do we use call, bind, apply? if yes what is first argument of call, bind, apply. I
   It means this point there.
3. the rest cases, this points left of function

```
sayhello() <!-- this ponits to global -->
color.sayhello() <!-- this ponits to color object -->
```
