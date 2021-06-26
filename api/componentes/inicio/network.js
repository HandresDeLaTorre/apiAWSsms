const express = require('express');

const router = express.Router();

/* var QRCode = require('qrcode')

 
QRCode.toString('I am a pony!', function (err, url) {
  console.log(url)
}) */


router.get('/', (req, res) => {
    res.send('Hola este es un buen servidor y es el home')
});

module.exports = router;