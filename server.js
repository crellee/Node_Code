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
                content: JSON.parse(body),
                type: 'player'
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
				content: JSON.parse(body),
				type: 'team'
			};
			res.render('overview', array);
		})
	})

});

app.get('/player/:id', function(req, res) {
    var url = 'http://soccerapi.herokuapp.com/api/players/' + req.params.id;
    http.get(url, function(response) {
        var player = '';
        response.on('data', function(chunk){
            player += chunk;
        });

        response.on('end', function(){

            res.render('detailedplayer', JSON.parse(player));
        })
    })
});

app.get('/team/:id', function(req, res) {
    var url = 'http://soccerapi.herokuapp.com/api/clubs/' + req.params.id;
    http.get(url, function(response) {
        var club = '';
        response.on('data', function(chunk){
            club += chunk;
        });

        response.on('end', function(){

            res.render('detailedteam', JSON.parse(club));
        })
    })
});


app.listen(3000);