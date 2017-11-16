// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

import express from 'express';

const app = express();

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3000);