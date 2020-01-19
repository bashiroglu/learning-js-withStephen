- We can get data from public api by using below code

```
const FetchSearchResult = async () => {
  const response = await axios.get(
    'http://www.omdbapi.com/',
    {
      params: {
        apikey: '41e8565e', // this obtions depend on api which we send request
        s: 'avengers' // this obtions depend on api which we send request
      }
    }
  );
  console.log(response.data);
};

```

- After added event listener to our input, whenever we enter the text, the fetch function send request immediately. But this is not efficient, instead we want to send request after waiting 1 sec from last input action. For the we used code or concept below 
called debouncing input

```
let timeOutId;
const onInput = event => {
  if (timeOutId) {/*  after first time pressing key,
     everytime we press key again this works and clearTimeout function below
     but in last action, this wont be called, instead setTimeout will work.
     So we get what we want*/
    clearTimeout(timeOutId);
  }
  timeOutId = setTimeout(() => {
    FetchSearchResult(event.target.value);
  }, 500);
};
```

The term reusablity, we can think if we move that code to another project, would it work? (with only changing kinda arguments which we give function)
