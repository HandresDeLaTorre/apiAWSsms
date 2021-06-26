
const fs = require('fs');

const ora = require('ora');
const chalk = require('chalk');

const { Client } = require('whatsapp-web.js');
//const qrcode = require('qrcode-terminal');

var QRCode = require('qrcode')

const SESSION_FILE_PATH = './sessionWa.json';
let client;
let sessionData;

let imgsvg = './api/componentes/whatsapp/imgsvg.svg';//D:\pruebas de codigo\whatsApp-dialogflow\api\componentes\whatsapp
 

function sendWhatsapp() {

const withSession = () => {
        // Si exsite cargamos el archivo con las credenciales
        const spinner = ora(`Cargando ${chalk.red('Validando session con Whatsapp...')}`);
        sessionData = require(`../../../../.${SESSION_FILE_PATH}`);
        spinner.start();
        client = new Client({
            session: sessionData
        });

        client.on('ready', () => {
            console.log('Client is ready!');
            spinner.stop();   
            connectionReady();
        });

         client.on('auth_failure', () => {
            spinner.stop();
            console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **');
        }) 
    
    
        client.initialize();
};

const connectionReady = () => {
    listenMessage();
    //readExcel();
}


const withOutSession = () => {
    console.log('No tenemos session guardada');
    client = new Client();
    client.on('qr', qr => {
        let opts = {type:'svg', width:500}
        QRCode.toString(qr, opts, async (err, url) =>{
            console.log(url)
           await fs.writeFile(imgsvg, url, function (err) {
                if (err) {
                    console.log(err);
                }
            });

          });
    });

     client.on('ready', () => {
        console.log('Client is ready!');
        connectionReady();
    });

    client.on('auth_failure', () => {
        console.log('** Error de autentificacion vuelve a generar el QRCODE **');
    });

    client.on('authenticated', (session) => {
        // Guardamos credenciales de de session para usar luego
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

    client.initialize();
};

/**
 * Escuchamos cuando entre un mensaje
 */
 const listenMessage = () => {
    client.on('message',  (msg) => {
        const { from, to, body } = msg;
        console.log(from, to, body );

        sendMessage(from, 'El chat bot contesta!!!')

    });
}

 const sendMessage = (number = null, text = null) =>{
    number = number.replace('@c.us', '');
    number = `${number}@c.us`
    client.sendMessage(number, text);
} 


(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();

}


module.exports = sendWhatsapp
   
