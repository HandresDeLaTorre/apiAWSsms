const express = require('express');
const path = require('path');

const router = express.Router();


const whatsappIndex = require('./controller')

const sendWhatsapp = require('./controller')

const SESSION_FILE_PATH = './sessionWa.json';
let sessionData;
sessionData = require(`../../../../.${SESSION_FILE_PATH}`);

/* var QRCode = require('qrcode')
QRCode.toString('I am a pony!', function (err, url) {
  console.log(url)
}) */


router.get('/', async (req, res) => {

  if (!sessionData) {
    res.send('Hola este es un buen servidor y es el whatsapp')
  }else{
    await res.sendFile(path.join(__dirname+'/public/imgsvg.svg'));
  }
  //await sendWhatsapp();
    //res.send('Hola este es un buen servidor y es el whatsapp')
    
    //sendMessage()
    //sendWhatsapp()
    
});

module.exports = router;