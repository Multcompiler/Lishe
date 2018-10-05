
<script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCwOfnyvAtegBMTtWr2pLgqvjBH2nA8iRw",
    authDomain: "lishe360-3a44a.firebaseapp.com",
    databaseURL: "https://lishe360-3a44a.firebaseio.com",
    projectId: "lishe360-3a44a",
    storageBucket: "lishe360-3a44a.appspot.com",
    messagingSenderId: "1072557982583"
  };
  firebase.initializeApp(config);

  var bigheader = document.getElementById('bigheader');
  var dbRef = firebase.database().ref().child('text');
  dbRef.on('value',snap => bigheader.innerText = snap.val());
  
  
</script>


