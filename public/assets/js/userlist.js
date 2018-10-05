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

const dbRef = firebase.database().ref();

const usersRef = dbRef.child('UserData');
  const userListUI = document.getElementById("userList");


  document.getElementById('Search-Data').addEventListener('submit',submitForm);


  function submitForm(e){
      e.preventDefault();


      //get values
      var search = getInputVal('search_name');

      console.log(search);

      // Search user by name.
      var ref = firebase.database().ref("UserData");

      ref.orderByChild("name").equalTo(search).once('value', function(snapshot) {

          if (snapshot.exists()) {

              userListUI.innerHTML = "";
             $("#found_data").classList.remove("hide");

              //hide found alert after 3 seconds
              setTimeout(function(){
                  $("#found_data").classList.add("hide");
              },3000);


              ref.orderByChild("name").equalTo(search).on("child_added", function(snapshot) {
                  let user = snapshot.val().name;
                  let $li = document.createElement("button");
                  $li.innerHTML = user;
                  $li.setAttribute("class", "btn btn-block");
                  $li.setAttribute("child-key", snapshot.key);
                  $li.addEventListener("click", userClicked);
                  userListUI.append($li);
              });

          }else {
              $("#not_found_data").classList.remove("hide");

              //hide found alert after 3 seconds
              setTimeout(function(){
                  $("#not_found_data").classList.add("hide");
              },3000);

              console.log("Data Not Found");
          }

      });

      //clear form
      document.getElementById('Search-Data').reset();


  }

  // function to get form values

  function getInputVal(id){
      return document.getElementById(id).value;
  }


usersRef.on("child_added", snap => {
   let user = snap.val().name;
   //console.log(user);
  //let $li =  ' <button class="btn btn-default btn-block"> </button><br />';
   let $li = document.createElement("button");
  $li.innerHTML = user;
   $li.setAttribute("class", "btn btn-block");
   $li.setAttribute("child-key", snap.key);
   $li.addEventListener("click", userClicked)
   userListUI.append($li);
});

function userClicked(e) {

    var userID = e.target.getAttribute("child-key");

    const userRef = dbRef.child('UserData/' + userID);
    const userDetailUI = document.getElementById("populatedUsers");

    userDetailUI.innerHTML = ""

    userRef.on("child_added", snap => {
        var content = '';
    var SnapKey = snap.key;
    var SnapVal = snap.val();

    content = "<tr>";
    content += "<td class=\"title\">" + SnapKey + "</td>"; //column1
    content += "<td class=\"title\">" + SnapVal + "</td>";//column2

    content += "</tr>";



    $("#populatedUsers").append(content);


    });

    $("#populatedUsers").append("<td class='mdl-data-table__cell--non-numeric' colspan='2'>" +
        "<div buttons style='float: right'>"+
        "<button class='btn btn-primary edit-btn' id=\'"+2+"\'><i class='material-icons'>Edit</i></button>"+" "+
        "<button class='btn btn-danger delete-btn'><i class='material-icons'>Delete</i></button>"+" "+
        "</div></td>");

    //Delete Function #Incomplete
    var removeCapital = cityRef.update({
        capital: firebase.firestore.FieldValue.delete()
    });


}
  function reload_page(){
      window.location.reload();
  }
