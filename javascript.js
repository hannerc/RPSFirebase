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

var db = firebase.database().ref();



var Player_Name;

$("#Player1").hide();
$("#Player2").hide();

db.on("child_added", function(snapshot) {
	console.log("child_added", snapshot.val());
	//$("#Chat_Screen_Here").append(snapshot.val().Player_Name+" says "+snapshot.val().ChatValue);
	$("#Player1").html(snapshot.val().Player1Name+" picked "+snapshot.val().Player1Choice);
	$("#Player2").html(snapshot.val().Player2Name+" picked "+snapshot.val().Player2Choice);
});

$("#Start_Button").on("click", function(event){
	event.preventDefault();
	Player_Name = $("#Player_Name").val()
	console.log(Player_Name);
	$(this).hide();
	$("#Start_Button").hide();
	$("#Player_Information_Here").html("<h1>"+Player_Name+"</h1>")
	db.push({
		PlayerName: Player_Name
	});

	// return Player_Name;
});


$(".Player_1_Choices").on("click", function(){
	var PlayerPicks = $(this).text();
	console.log(Player_Name + " picks: " + PlayerPicks);
	db.push({
		PlayerChoice: PlayerPicks,
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





