/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// 1. Initialize Firebase

  var trainData = new Firebase("https://train-time-c0330.firebaseio.com/");

  var config = {
    apiKey: "AIzaSyDWZuC1h7bqWJpjA9TKoUaATmVIBmoaWH4",
    authDomain: "train-time-c0330.firebaseapp.com",
    databaseURL: "https://train-time-c0330.firebaseio.com",
    projectId: "train-time-c0330",
    storageBucket: "train-time-c0330.appspot.com",
  };

// 2. Button for adding 
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Gets user input
  var trnName = $("#train-name-input").val().trim();
  var trnDest = $("#destination-input").val().trim();
  var trnTrack = $("#track-num-input").val().trim();
  var trnFreq = $("#freq-input").val().trim();
  var trnTime =  moment($("#trainTime-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  // Creates local "temporary" object for holding data
  var newTrn = {
    name: trnName,
    destination: trnDest,
    track: trnTrack,
    frequency: trnFreq,
    ftt: trnTime
  }
  // Push data to the database
  trainData.push(newTrn);
  // Logs everything to console
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.track);
  console.log(newTrn.frequency);
  console.log(newTrn.ftt);
  // Alert
  alert("Train " +trnName+ " successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#freq-input").val("");
  $("#trnTime-input").val("");

  return false;
});
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDest = childSnapshot.val().destination;
  var trnTrack = childSnapshot.val().track;
  var trnFreq = childSnapshot.val().frequency;
  var trnTime = childSnapshot.val().ftt;
  // Train Info
  console.log(trnName);
  console.log(trnDest);
  console.log(trnFreq);
  console.log(trnTime);
  // Prettify the train frequency

    var diffTime = moment().diff(moment.unix(trnTime), "minutes");
    var timeRemainder = moment().diff(moment.unix(trnTime), "minutes") % trnFreq ;
    var minutes = trnFreq - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
  
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName+ "</td><td>" + trnDest + "</td><td>" +
  trnFreq + "</td><td>" + trnTrack + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
});
