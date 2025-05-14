let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_master',
});
connection.connect(function(erroe){
    if(!!error){
        console.log(error);
    }else{
        console.log('connection succes');
    }
    })

    module.exports = connection;
