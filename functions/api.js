const express = require('express')
const path = require('path');
const serverless = require('serverless-http')

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
app.use(express.static(path.join(__dirname, '../public')));

router.get('/',(req,res)=>{
    res.json({
        'path':'home',
        'fistName':"Matteo",
        'lastName':'Saha'
    });
});

router.get('/json',(req,res)=>{
    res.json({
        'path':'json',
        'autonr':"Matteo"
    });
});

app.use('/.netlify/functions/api',router);

module.exports.handler = serverless(app);