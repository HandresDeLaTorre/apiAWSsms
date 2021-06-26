const AWS = require("aws-sdk");

const region = "us-west-1";

/* var mensaje = "** mensaje de prueba inicial fase 4";
var mobile = "+573115191207"; */

AWS.config.update({ region: region});

/* const parametros = {
    Message: mensaje,
    PhoneNumber: mobile
};
*/

var idMenssage;



function enviar(params) {
    
    const envioSms = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    envioSms
    .then((data) => {
        idMenssage = data.MessageId
        console.log('Mensaje ID: '+ idMenssage);
    }).catch((err) => {
        console.error(err, err.stack);
    }); 
    
}

//enviar(parametros)
/*  envioSms
    .then((data) => {
        console.log(`Mensaje ID: ${data.MessageId}`);
    }).catch((err) => {
        console.error(err, err.stack);
    });  */

module.exports = {
    enviar,
    idMenssage
}