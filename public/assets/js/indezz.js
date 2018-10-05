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

   var amOnline = new Firebase('https://lishe360app.firebaseio.com/.info/connected');
   var userRef = new Firebase('https://lishe360app.firebaseio.com/presence/' + userid);
   amOnline.on('value', function(snapshot) {
    if (snapshot.val()) {
        userRef.onDisconnect().remove();
        userRef.set(true);
      }
});