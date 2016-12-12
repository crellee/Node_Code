var express = require('express');
var app = express();
var http = require('http');

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    res.render('index');
});


app.get('/players', function(req,res){
    var url = 'http://soccerapi.herokuapp.com/api/players';
    http.get(url, function(response){
        console.log("Her");
        var body = '';
        response.on('data', function(chunk){
            body+=chunk;
        });

        response.on('end', function(){
            console.log("Der");
            res.render('overview', JSON.parse(body));
        })
    })

});



app.get('/teams', function(req, res){

});


app.listen(3000);