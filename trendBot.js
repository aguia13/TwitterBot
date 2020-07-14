console.log("The bot is starting up");

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var fs = require('fs');

//id:1 is worldwide
//id: woeid#
var params = {
	id: 1
	//id : 2352824

}

var countryList = [];
var woeidList = [];
var trendList = [];

var trendName = [];
var urlList = [];
var promotedList = [];
var queryList = [];
var tweetVolumeList = [];



//gets the available locations twitter has trend data for
//T.get('trends/available',getLocations);

//This callback function is used parse the location data that 'trends/available' returns.
//US cities range is 335-397 in alpha order
function getLocations(err,data,response){
	//fs.writeFile('example.txt',data,errorHandling);
	//console.log(data);
		for(var i=335; i<=397; i++){
		var name = data[i].name;
		var placeType = data[i].placeType;
		var url = data[i].url;
		var parentid = data[i].parentid;
		var country = data[i].country;
		var woeid = data[i].woeid;
		var countryCode = data[i].countryCode;

		countryList.push(name);
		woeidList.push(woeid);
	}

	console.log(countryList,woeidList);
}


T.get('trends/place',params,getTrends);

//This call back function is used to parse the trend data from params location
function getTrends(err,data,response){
	i=0;
	while(data[0].trends[i]!=null){
		var name = data[0].trends[i].name;
		var url = data[0].trends[i].url;
		var promoted_content = data[0].trends[i].promoted_content;
		var query = data[0].trends[i].query;
		var tweetVolume = data[0].trends[i].tweetVolume;
		
		trendName.push(name);
		urlList.push(url);
		promotedList.push(promoted_content);
		queryList.push(query);
		tweetVolumeList.push(tweetVolume);

		i++;
	}

	//console.log(data[0]);
}

var file = fs.createWriteStream('trendNames_7-13-2020.txt');
file.on('error',errorHandling);
trendName.forEach(function(v) {file.write(v.join(', ')+'\n'); });
file.end();

function errorHandling(err){
	if(err){
		return console.log(err);
	}else{
		console.log('Success!');
	}
}