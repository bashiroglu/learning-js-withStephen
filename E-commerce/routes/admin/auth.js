const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});
router.get('/signin', (req, res) => {
  res.send(signinTemplate());
});

router.post('/signup', async (req, res) => {
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

router.post('/signin', async (req, res) => {
  const { password, email } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send('we could not find email');
  }
  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send('passworddadda invalid');
  }

  req.session.userId = user.id;

  res.send('signed in');
});

router.get('/signout', (req, res) => {
  req.session = null;

  res.send('you logged out');
});

module.exports = router;
