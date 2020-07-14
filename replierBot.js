console.log('The replier bot is starting');

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

//sets up a user stream
var stream = T.stream('user');

//anytime someone follows user
stream.on('tweet',tweetEvent);

function tweetEvent(event){
	//var fs = require('fs');
	//var json = JSON.stringify(event,null,2);
	//fs.writeFile("exampleTweet.json",json);

	var replyto = event.in_reply_to_screen_name;
	var text = event.text;
	var from = event.user.screen_name;

	console.log(replyto + ' ' + from);

	if(replyto == 'userBeingRepliedTo'){
		var newTweet = '@'+ from +' enter reply message here!'
		tweetIt(newTweet);
	}

}


function tweetIt(txt){

	var tweet = {
		status: txt
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
