const express = require('express')
const serverless = require('serverless-http')

const app = express();
const router = express.Router();

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