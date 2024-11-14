const express = require('express')
const path = require('path')
const PORT = 8080;
const app = express();
const cookieParser = require('cookie-parser');


app.set('view engine' , 'ejs')

// conn db
require('./lib/db')

// Static File
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); 


// ALL Router
const Routers = require('./routes/routes')
app.use('/', Routers)



// ALL Router API
const RouterAPI = require('./routes/routerAPI')
app.use('/',RouterAPI)



app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}`)
} )