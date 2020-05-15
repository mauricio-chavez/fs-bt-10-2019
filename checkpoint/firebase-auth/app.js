const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

admin.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await admin.auth();
  const idToken = await user.getIdToken();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await admin
    .auth()
    .createSessionCookie(idToken, { expiresIn });
  const options = { maxAge: expiresIn, httpOnly: true, secure: true };
  res.cookie('session', sessionCookie, options);
  res.redirect('/private');
});

app.get('/private', async (req, res) => {
  const sessionCookie = req.cookies.session || '';
  try {
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    console.log(decodedClaims);
    res.send('logged in');
  } catch {
    res.redirect('/');
  }
});

const server = app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`Listening on ${server.address().port}`);
});
