var config = {
	apiKey: "AIzaSyAXWDuvfvz9nzsbXLfBvrOgRI_87QSoZcM",
	authDomain: "fir-c505d.firebaseapp.com",
	databaseURL: "https://fir-c505d.firebaseio.com",
	projectId: "fir-c505d",
	storageBucket: "fir-c505d.appspot.com",
	messagingSenderId: "930932591042"
};

firebase.initializeApp(config);

var db = firebase.database().ref();

db.on("child_added", function(snapshot) {
	console.log("child_added", snapshot.val());
	var i = $("<tr>");
	var tdName = $("<td>");
	tdName.html(snapshot.val().Name);
	i.append(tdName);
	var tdDestination = $("<td>");
	tdDestination.html(snapshot.val().Destination);
	i.append(tdDestination);

var tdFrequency = $("<td>");
	tdFrequency.html(snapshot.val().Frequency);
	i.append(tdFrequency);
	var tdArrival = $("<td>");
	tdArrival.html(snapshot.val().Arrival);
	i.append(tdArrival);
	var tdAway = $("<td>");
	tdAway.html(snapshot.val().Away);
	i.append(tdAway);
	$("#trains").append(i);
});

$("#submit").on("click", function(event){
	event.preventDefault();
	
	var Name = $("#Train-Name").val().trim();
	var Destination = $("#Destination").val().trim();
	var FirstTime = $("#Time").val().trim();
	var Frequency = $("#Frequency").val().trim();
	var firstTimeConverted = moment(FirstTime, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % Frequency;
	var minutesTillTrain = Frequency - tRemainder;
	var nextTrain = moment().add(minutesTillTrain, "minutes");
	var nextTrainFormatted = moment(nextTrain).format("hh:mm");

	db.push({
		Name: Name,
		Destination: Destination,
		FirstTime: FirstTime,
		Frequency: Frequency,
		Arrival: nextTrainFormatted,
		Away: minutesTillTrain
	});

	alert("Your train has been addded!");

	$("#trainForm").children('input').val('');
	
});