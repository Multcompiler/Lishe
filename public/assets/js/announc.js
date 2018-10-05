  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBi-bpTrfljY78j4lvN62vLlWzqXMTciMM",
    authDomain: "lishe360app.firebaseapp.com",
    databaseURL: "https://lishe360app.firebaseio.com",
    projectId: "lishe360app",
    storageBucket: "lishe360app.appspot.com",
    messagingSenderId: "922855494610"
  };
  firebase.initializeApp(config);

  var messageRef = firebase.database().ref('feed');
  var photo;
      //get values

  var time =formatDate(new Date());
 
  var fileButton = document.getElementById('fileButton');
  var elem = document.getElementById("myBar");  

  fileButton.addEventListener("change",function(e){
   var file= e.target.files[0];
  
   //create storage ref to the firebase storage
   var storageRef = firebase.storage().ref('announce').child(file.name);
   var task = storageRef.put(file);


   task.on("state_changed",function(snapshot){
      var percentage= (snapshot.bytesTransferred/snapshot.totalBytes) *100;

      elem.style.width = parseInt(percentage) + '%'; 
      elem.innerHTML=parseInt(percentage)+'%';
      if(percentage==100){
             storageRef.getDownloadURL().then(function (photourl) {
             // You will get the Url here.
            photo = photourl;
          });
      }
   });
  });

  
  document.getElementById('Announce').addEventListener('submit',submitForm);
  function submitForm(e){
  e.preventDefault();



  var Maintitle = getInputVal('Maintitles');
  var url= getInputVal('url');
  var description = getInputVal('descriptions');
	//save message
	saveMessage(Maintitle,url,description,time,photo);

      //shoe alert
      $("#success_sms").classList.remove("hide");


      //hide alert after 3 seconds
      setTimeout(function(){
          $("#success_sms").classList.add("hide");
      },3000);

	//clear form
	document.getElementById('Announce').reset();
  document.getElementById('myProgress').reset();
  document.getElementById('file').reset();
  document.getElementById('fileButton').reset();
  document.getElementById("myBar").reset();

  reload_page();

}

// function to get form values

  function getInputVal(id){
  	return document.getElementById(id).value;
  }


  function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


  function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = addZero(date.getHours());
  var minutes = addZero(date.getMinutes());
  var seconds = addZero(date.getSeconds());
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' at ' + hours + ':' + minutes + ':' + seconds +' ' +  am_pm;
}


  //save message to firebase

  function saveMessage(Maintitle,url,description,time,photo){
  	var newMessageRef = messageRef.push();
  	newMessageRef.set({
  	
  		Maintitle:Maintitle,
  		url:url,
      description:description,
      time:time,
      photo:photo

  	});
  }

 function reload_page(){
        window.location.reload();
    }
