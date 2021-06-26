const express = require('express');

const configServer = require('../config');
const app = express();

const dialogCx = require('./componentes/dialogflow/network')
const home = require('./componentes/inicio/network')
const wha = require('./componentes/whatsapp/network')
const SMS = require('./componentes/msm/network')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/home', home);
app.use('/api/w', wha);
app.use('/api/sms', SMS);


app.listen(configServer.api.port, () => {
    console.log(`El servidor esta funcionando en el puerto ${configServer.api.port}`);
})