## Node JS

- In node we don't have access different files inside of each other, we make access by using special functions. When we create a function in Node JS environment, it will automatically wrapped by a function which provide access us arguments like __dirname, __filename, require, module. Because of this function we can access different files. 

- When we require function first time, we get it and store in RequireCache, after first require we will only get from RequireCache. Every file in our system just run once. 

- process.cwd() return current working directory

## Finally understand middleware function and body parser function as a bonus. 

What we send data from will be sent chunk by chunk and that is why we need to wait to get all of it but this is not all after that we will get the data in buffer type, that is why we need parse it and convert it to understandable object and we assign that object to req body. For this purpose I have been using :) body parser function. 
```
if (req.method === 'POST') {
    req.on('data', data => {
      const parsed = data.toString('utf8').split('&');
      const formData = {};
      for (let pair of parsed) {
        const [key, value] = pair.split('=');
        formData[key] = value;
      }
      req.body = formData;
      next();
    });
  } else {
    next();
  }
```