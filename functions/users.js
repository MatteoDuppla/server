const express = require('express')
const path = require('path');
const cors = require('cors')
const session = require("express-session");
const cookies = require('cookie-parser');
const serverless = require('serverless-http')
const usersController = require('./controllers/userController');

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


router.post('/register', usersController.register);

router.get('/update/:id', usersController.update)
router.get('/remove/:id', usersController.borrar)
router.get('/login', usersController.login)
router.post('/login',usersController.loginProcess)


app.use('/.netlify/functions/users',router);

module.exports.handler = serverless(app);