const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_master'
});
connection.connect(function(err){
    if(!!err){
        console.log(err);
    }else{
        console.log('connection succes');
    }
    })

    module.exports = connection;
