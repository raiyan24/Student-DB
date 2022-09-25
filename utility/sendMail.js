const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const sendEmail = (to, sub) => {
  const transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    auth: {
        user : process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    
});

transporter.sendMail({
    from : process.env.EMAIL_HOST,
    to : to,
    subject : sub,
    html : `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Confirmation</title>
        <style>
    
            .main-wrapper{
                background-color: #e9e9e9;
                height: 100vh;
                width: 100%;
                padding-top: 250px;
            }
            body{
                background-color: #e9e9e9;
                margin: 0px;
                font-family: Arial, Helvetica, sans-serif;
            }
            .template-wrapper{
                background-color: #fff;
                width: 500px;
                margin: 100px auto 0px;
                border-radius: 5px;
            }
            .template-wrapper a{
                display: block;
                padding: 10px 0px;
            }
            .template-wrapper img{
                width: 100%;
            }
            .template-wrapper a img{
                width: 200px;
                display: block;
                margin: 10px auto;
            }
            .body{
                padding: 20px;
            }
            .body p{
                text-align: justify;
            }
            .body a{
                display: block;
                text-decoration: none;
                background-color:#2487ed;
                color: #fff;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="main-wrapper">
        <div class="template-wrapper">
        <div class="header">
            <a href="https://sorobindu.com">
                <img src="https://sorobindu.com/wp-content/uploads/2022/03/Sorobindu-logo-1.png" alt="">
            </a>
            <img src="https://c0.wallpaperflare.com/preview/737/862/336/woman-work-laptop-computer.jpg" alt="">
        </div>
        <div class="body">
            <h1>Wellcome to Sorobindu</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit in quasi deleniti eum officiis nulla! Fugiat ducimus porro, eligendi natus eos alias eum odit aperiam maxime, possimus ex, reprehenderit incidunt?</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus quasi dolores excepturi, quo iure id impedit earum eos vitae tenetur.</p>
            <a href="">Verify Your Account</a>
        </div>
    </div>
        </div>
    </body>
    </html>`
    
  });
}

module.exports = sendEmail