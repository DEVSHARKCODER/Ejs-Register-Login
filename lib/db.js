const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host:process.env.SQL_HOST,
    user:process.env.SQL_USER ,
    password:process.env.SQL_PASSWORD,
    database:process.env.SQL_DATABASE
});



async function GETCONNECTDB() {
    try{
        const conn = await pool.getConnection();

        console.log('MySQL Is Running...')
    }
    catch(error){
        console.log('MYSQL ERROR:' , error)
    }
}

GETCONNECTDB();

module.exports=pool;