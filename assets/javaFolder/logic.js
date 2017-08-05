	
var config = {
    apiKey: "AIzaSyCPpLzjdBWfoxrteVCbpbfyIhROqPERcj4",
    authDomain: "train-time-93940.firebaseapp.com",
    databaseURL: "https://train-time-93940.firebaseio.com",
    projectId: "train-time-93940",
    storageBucket: "",
    messagingSenderId: "983520617665"
  };
  firebase.initializeApp(config);

  var myDatabase = firebase.database();
  var trainName = "";
  var theDestination = "";	
  var theFrequency= "";
  var nextArrival = "";
  var minAway = "";
  var theFirstTrain = "";

//----------------here we grab user input------------+

   $("#submit").on("click", function(){
 	event.preventDefault();
 	console.log("the button works");
 	theTrainName = $("#trainName").val().trim();
 	theDestination = $("#destination").val().trim();

 	//theFrequency = moment.duration().asMinutes($("#frequency").val().trim(),"mm") 

	theFrequency = moment($("#frequency").val().trim(), "mm").format("X");	//need time in moment.js?
	
	theFirstTrain = moment($("#firstTrain").val().trim(), "hh,mmA").format("X");  //need time in moment.js
	console.log(theTrainName);
	console.log("here is the frequency" + theFrequency)
	console.log("here is the first Train" + theFirstTrain)


//----------this "pushes" it to the database making a new "random" key
	var newTrain = {
		trainName: theTrainName
		,destination: theDestination
		,frequency: theFrequency
		,firstTrain: theFirstTrain //start time
	}

	myDatabase.ref().push(newTrain);

	//alert("Yay!! a new train");

	// Clears all of the text-boxes
	$("#trainName").val("");
	$("#destination").val("");
	$("#frequency").val("");
	$("#firstTrain").val("");


 });//end of the on click function
//--------------debugging to see if things have been added
myDatabase.ref().on("child_added", function(childSnapshot,prevChildKey){
	console.log(childSnapshot.val());
	
	var startTime = childSnapshot.val().firstTrain
	var theName = childSnapshot.val().trainName;
	var theDest = childSnapshot.val().destination;
	var theFrequ = childSnapshot.val().frequency;
	var theNextA = "N/A"
	var minAwa = "N/A"

	console.log(theName);
	console.log(theDest);
	console.log(theFrequ);
	console.log(theNextA);
	console.log(minAwa);

//----------------------------------need to do math for time here-------------------------------

/*
	If train A starts at noon (12:00pm) and has a frequency of 1 hour
	The next train will arrive at 1:00pm
	Start time + frequency = next arrival
*/
	var currentTime = moment().format('LT');

	theNextA = moment().add(theFrequ, 'm').add(startTime, "m");
	console.log("here we go " + theNextA);
	
	var fixArival = moment.unix(theNextA).format("hh:mmA");
	console.log("here we go again " + fixArival);

	var something =	moment.unix(startTime).format("hh:mmA");
	console.log("beautified start time " + something);

	var beaytifyFrequency = moment.unix(theFrequ).format("mm");
	//console.log("heres the beauty " + beaytifyFrequency);
	

	console.log(currentTime);
/* time untill the the net arrival
time actual - time of next arrival = time remaining
*/



//----------------------------------------------------------------------------------------------

$("#trainTable > tbody").append("<tr><td>" + theName + "</td><td>" + theDest + "</td><td>" +
	beaytifyFrequency + "</td><td>" + fixArival + "</td><td>" + minAwa + "</td></tr>");


	},function(errorObject){
	console.log("Errors Handeled: " + errorObject.code);
});









