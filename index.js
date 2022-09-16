require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const valid = require('is-url');
// Basic Configuration
const port = process.env.PORT || 3000;

let counter = 0;
const shortendUrls = {};

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }))

app.post('/api/shorturl', function (req, res) {

  
  const url = req.body.url;

  if (valid(url)) {
    counter += 1;
    shortendUrls[counter] = url;
    console.log(shortendUrls);
    res.send({ original_url: url, short_url: counter });
  } else {
   res.send({
     error: 'invalid url'
   });
 }
});

app.get('/api/shorturl/:id', function(req, res) {
  const id = req.params.id;
  const url = shortendUrls[id];
  res.redirect(url);
});


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
