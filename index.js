const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); //as we use a MySQL database
const nodemailer = require('nodemailer'); //to send mails
var cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// app.

var transporter = nodemailer.createTransport({
    host: "smtp.deckpark.com.br",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "naoresponda@deckpark.com.br",
        pass: "Dkp!2022@"
    },
    tls: { rejectUnauthorized: false }
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening...url: " + Server);
});

app.get('/', (req, res) => {
    res.json({
        "message": "Hi this is mail tracker node server",
        "url": Server
    });
});

app.route('/sendmail/:email/:nome').get((req, res) => {

    const { email, nome } = req.params
    // let htmlBody = '<>';
    const mailOptions = {
        from: 'naoresponda@deckpark.com.br',
        to: email,
        subject: "NHAIM FION" + nome,
        html: '<p>NHAIM FIOM</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.send("data:image/png;base64,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");

        }
    });
})