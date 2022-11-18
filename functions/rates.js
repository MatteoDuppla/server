const express = require('express')
const path = require('path');
const cors = require('cors')
const session = require("express-session");
const cookies = require('cookie-parser');
const serverless = require('serverless-http')
const rateController = require('./controllers/rateController');

const app = express();
const router = express.Router();

app.use(cors())
app.use(cookies())
app.use(session({
    secret: "Esto es un secreto",
    resave: false,
    saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');


router.post('/addRate', rateController.addRate);
router.post('/addBankRate', rateController.addBankRate);

router.get('/getRate', rateController.getRate)
router.get('/getRateBank', rateController.getBankRate)
router.get('/remove/:id', rateController.borrar)

router.get('/home', rateController.home);
router.get('/getAll', rateController.getAll);

app.use('/.netlify/functions/rates',router);

module.exports.handler = serverless(app);