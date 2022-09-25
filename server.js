const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const expressLayout = require('express-ejs-layouts');
const studentRoute = require('./routes/student');

//environment variable
dotenv.config();
const PORT = process.env.PORT || 4000;

//init express
const app = express();

//manage data
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//manage static folder
app.use(express.static('public'))

// ejs init
app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout' , 'layouts/app');

//routes
app.use('/student', studentRoute);

//listening server
app.listen( PORT, () =>{
    console.log(`Server is running on port ${PORT}`.bgGreen.black);
});