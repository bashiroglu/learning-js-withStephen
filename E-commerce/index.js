const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['mysecretkey']
  })
);

app.get('/signup', (req, res) => {
  res.send(`
    <div>
    ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});
app.get('/signin', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>
  `);
});

app.post('/signup', async (req, res) => {
  const { password, email, passwordConfirmation } = req.body;

  const existingUser = await usersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send('email in use');
  }
  if (password !== passwordConfirmation) {
    return res.send('password should be the same');
  }
  const user = await usersRepo.create({ email, password });

  req.session.userId = user.id;

  res.send('account created');
});

app.post('/signin', async (req, res) => {
  const { password, email } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('we could not find email');
  }
  if (user.password !== password) {
    return res.send('password invalid');
  }

  req.session.userId = user.id;

  res.send('signed in');
});

app.get('/signout', (req, res) => {
  req.session = null;

  res.send('you logged out');
});

app.listen(3000, () => {
  console.log('Listening');
});
