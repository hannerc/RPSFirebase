// Initialize Firebase
var config = {
	apiKey: "AIzaSyAXWDuvfvz9nzsbXLfBvrOgRI_87QSoZcM",
	authDomain: "fir-c505d.firebaseapp.com",
	databaseURL: "https://fir-c505d.firebaseio.com",
	projectId: "fir-c505d",
	storageBucket: "fir-c505d.appspot.com",
	messagingSenderId: "930932591042"
};

firebase.initializeApp(config);

var db = firebase.database();
var connectionsRef = db.ref("/connections");

console.log(connectionsRef);

// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = db.ref(".info/connected");
console.log(connectedRef)

connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();

    
    console.log(con);
    };


  
});

// connectionsRef.on("value", function(snap) {

//   // Display the viewer count in the html.
//   // The number of online users is the number of children in the connections list.
//   $("#watchers").text(snap.numChildren());
// });

// var Player_1_Name = "";
// var Player_1_Choice = "";
// var Player_1_wins  = "";
// var Player_1_lost  = "";
// var Player_2_Name  = "";
// var Player_2_Choice = "";
// var Player_2_wins = "";
// var Player_2_lost = "";

var playernumber;

var Player_Name;

$("#Player1").empty();
$("#Player2").empty();

db.ref().on("child_added", function(snapshot) {
	console.log(snapshot.val());
	var i = 1;
	do{
		console.log("hey"+i);
		i++;

	}
	while(snapshot.val()===true);
	

	//$("#Chat_Screen_Here").append(snapshot.val().Player_Name+" says "+snapshot.val().ChatValue);
	// $("#Player1").html(snapshot.val().Player1Name+" picked "+snapshot.val().Player1Choice);
	// $("#Player2").html(snapshot.val().Player2Name+" picked "+snapshot.val().Player2Choice);
});



$("#Start_Button").on("click", function(event){
	event.preventDefault();
	
	Player_Name = $("#Player_Name").val()
	console.log(Player_Name);
	$(this).hide();
	$("#Start_Button").hide();
	$("#Player_Information_Here").html("<h1>"+Player_Name+"</h1>");
	db.ref().push({
		Player_Name: Player_Name
	});

	//return Player_Name;
});


$(".Player_1_Choices").on("click", function(){
	var PlayerPicks = $(this).text();
	console.log(Player_Name + " picks: " + PlayerPicks);
	db.ref().update({
		PlayerChoice: PlayerPicks
	});

	$(".Player_1_Choices").hide();
	$("#Player_1_Choice").html("<h2>"+PlayerPicks+"</h2>");
});


// $(".Player_2_Choices").on("click", function(){
// 	var Player_2_Picks = $(this).text();
// 	console.log(Player_Name + " picks: " + Player_2_Picks);
// 	db.push({
// 		Player2Choice: Player_2_Picks,
// 		Player2Name: Player_Name
// 	});

// 	$(".Player_2_Choices").hide();
// 	$("#Player_2_Choice").html("<h2>"+Player_2_Picks+"</h2>");
// });


$("#Chat_Submit_Button").on("click", function(){
	var ChatValue = $("#Chat_Text").val();
	// $("#Chat_Screen_Here").append(ChatValue);
	db.push({
		
		ChatValue: ChatValue
	});


});


// var user = firebase.auth().currentUser;
// console.log("You are user "+snapshot.val());





