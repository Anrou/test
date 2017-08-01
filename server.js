var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    next();
});

app.post('/', function (req, res) {
    res.send('ok');
});

app.listen(4545, function(){
    console.log('app running on 4545')
});
