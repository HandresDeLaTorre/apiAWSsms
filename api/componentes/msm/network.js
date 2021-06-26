const express = require('express');
//const path = require('path');
const router = express.Router();

const sms = require('./index')
const enviarNet = require('./controller')

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));



router.get('/', (req, res) => {
    res.send('sms.dataResult')
   
})

router.post('/cods',  (req, res) => {
    const data = req.body;
    //console.log(data);
    const mensaje = data['menssage'];
    const mobile = data['mobile'];
    const parametros = {
        Message: mensaje,
        PhoneNumber: mobile
    };
    enviarNet.enviar(parametros); 
    //enviarNet.idSms()
    const idsms = enviarNet.idMenssage
     res.send(idsms);
})

module.exports = router