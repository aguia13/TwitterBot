console.log("The bot is starting up");

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

//allows us to execute command by using child process
var exec = require('child_process').exec;
//requires fileSync
var fs = require('fs');

function doIt(){

	//cmd is to execute processing app 'processing.org'

	var cmd = 'processing-java --sketch=`file/location`/imageName --run'
	exec(cmd,processing);

	function processing(){
		var filename = 'filename';
		var params = {
			encoding: 'base64'
		}
		var b64content = fs.readFilesSync(filename,params);

		T.post('media/upload',{media_data: b64 },uploaded);

		//function to handle image tweet after being uploaded, tweet hasn't sent
		function uploaded(err, data, response){
			//with this id you can reference image that has been uploaded
			var id = data.media_id_string;
			var tweet = {
				status: "Enter status to be tweeted here",
				media_ids: [id]
			}
			T.post('statuses/update',tweet,tweeted);
		}

		//this callback function not necessarily needed as the tweet has been posted
		//good for debugging purposes
		function tweeted(err,data,response){
			if(err){
				console.log("Something went wrong!");
			}else{
				console.log("It worked!");
			}
		}


		console.log('finished'); 
	}
}	
