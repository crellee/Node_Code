var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
app.set('view engine', 'ejs');
var os = require('os');


app.get('/', function(req, res){
        fs.readFile('menuitems.json', 'utf-8', function(err, data) {
            res.render('index', JSON.parse(data));

        });
});

app.use('/css',express.static(__dirname + '/css'));


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
            var playerJSON = JSON.parse(player);
            var url = 'http://soccerapi.herokuapp.com/api/clubs/' + playerJSON.clubId;
            http.get(url, function(resp){
                var team = '';
                resp.on('data', function(data){
                    team += data;
                });

                resp.on('end', function(){

                    //Write to file
                    var date = new Date();
                    fs.appendFile(__dirname + "/log.txt", "Request was made at " + date + " by " + os.hostname() + " for: \n" + JSON.stringify(playerJSON) + "\n-------\n", function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });

                    var clubJSON = JSON.parse(team);
                    playerJSON.clubName = clubJSON.name;
                    playerJSON.clubImage = clubJSON.image;
                    res.render('detailedplayer', playerJSON);
                });
            });

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

app.get('/createplayerform', function(req, res){
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
            console.log(array);
            res.render('createplayerform', array);
        })
    })

});










app.listen(3000);