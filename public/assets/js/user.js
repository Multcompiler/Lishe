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



var messageRef = firebase.database().ref('UserData')

document.getElementById('RegisterForm').addEventListener('submit',submitForm);


function submitForm(e){
	e.preventDefault();


	//get values
	var name = getInputVal('name');
	var lastname = getInputVal('lastname');
	var email = getInputVal('email');
	var username = getInputVal('username');
	var password = getInputVal('password');
	var phone = getInputVal('phone');
	var region = getInputVal('region');
	var number_of_child = getInputVal('number_of_child');
	var description = getInputVal('description');


firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
   console.log(error.message);
  });

	//save message
	saveMessage(name,lastname,username,email,password,phone,region,number_of_child,description);
	 

	//shoe alert
    $("#success_sms").classList.remove("hide");
	

	//hide alert after 3 seconds
	setTimeout(function(){
        $("#success_sms").classList.add("hide");
	},3000);

	//clear form
	document.getElementById('RegisterForm').reset();

	
}

// function to get form values

  function getInputVal(id){
  	return document.getElementById(id).value;
  }



  //save message to firebase

  function saveMessage(name,lastname,username,email,password,phone,region,number_of_child,description){
  	var newMessageRef = messageRef.push();
  	newMessageRef.set({
		name:name,
		lastname:lastname,
  	username:username,
		email:email,
		password:password,
  	phone:phone,
  	region:region,
  	number_of_child:number_of_child,
    description:description
  	});
  }

   function reload_page(){
        window.location.reload();
    }


	