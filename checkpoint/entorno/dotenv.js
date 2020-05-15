if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const message = process.env.MESSAGE;

console.log(message);
