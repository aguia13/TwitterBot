console.log("The bot is starting up");

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

function tweetIt(){

	var tweet = {
		status: 'nothing to see here'
	}

	T.post('statuses/update',tweet,tweeted);

	function tweeted(err,data,response){
		if(err){
			console.log("Something went wrong!");
		}
		else{
			console.log("It worked!");
		}
		console.log(data)
	}
}