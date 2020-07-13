console.log("The bot is starting up");

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

var params = {
	q: 'banana since:2011-11-11', //query term
	count: 100	//number of tweets to get
	//more params in documentation
}

T.get('search/tweets',params,gotData)


//function to be called once we have gotten data from api call
function gotData(err,data,response){
	console.log(data)
}