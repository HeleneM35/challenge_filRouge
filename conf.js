const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost' , // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'aZertY*1308', // le mot de passe
database :  'challenge_FilRouge'
});
module.exports = connection;