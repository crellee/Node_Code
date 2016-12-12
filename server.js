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
        var body = '';
        response.on('data', function(chunk){
            body+=chunk;
        });

        response.on('end', function(){
            var array = {
                content: JSON.parse(body)
            };
            res.render('overview', array);
        })
    })
});



app.get('/teams', function(req, res){
	var url = 'http://soccerapi.herokuapp.com/api/clubs';
	http.get(url, function(response){
		var body = '';
		response.on('data', function(chunk){
			body+=chunk;
		});
		response.on('end', function(){
			var array = {
				content: JSON.parse(body)
			};
			res.render('overview', array);
		})
	})

});


app.listen(3000);