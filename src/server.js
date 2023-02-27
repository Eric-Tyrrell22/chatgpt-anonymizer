require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static( 'public' ) );

// routes
const router = require('./routes')();
app.use('/api', router);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
