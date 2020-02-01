const express = require('express');
const bodyParser = require('body-parser');
const repo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/', async (req, res) => {
  const { password, email, passwordConfirmation } = req.body;

  const existingUser = await repo.getOneBy({ email });

  if (existingUser) {
    return res.send('email in use');
  }
  if (password !== passwordConfirmation) {
    return res.send('password should be the same');
  }
  res.send('account created');
});

app.listen(3000, () => {
  console.log('Listening');
});
