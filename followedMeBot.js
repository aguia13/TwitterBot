console.log("The bot is starting up");

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

//sets up a user stream
var stream = T.stream('user');

//Anytime someone follows me
stream.on('follow',followed);

function followed(event){
	var name = event.source.name;
	var screenName = event.source.screenName;
}

