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

  var db = firebase.database();
    // CREATE REWIEW
    var reviewForm = document.getElementById('reviewForm');
    var maintitle   = document.getElementById('maintitle');
    var descption    = document.getElementById('descption');
    var hiddenId   = document.getElementById('hiddenId');

    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
    
      if (!maintitle.value || !descption.value ) return null
    
      var id = hiddenId.value || Date.now()
    
      db.ref('masomo/' + id).set({
        maintitle: maintitle.value,
        descption: descption.value
      });
      maintitle.value = '';
      descption.value  = '';
      hiddenId.value = '';
    });

     // READ REVEIWS
  
  var reviews = document.getElementById('reviews');
  var reviewsRef = db.ref('/masomo');
  
  reviewsRef.on('child_added', (data) => {
    var li = document.createElement('li')
    li.id = data.key;
    li.innerHTML = reviewTemplate(data.val())
    reviews.appendChild(li);
  });
  
  reviewsRef.on('child_changed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.innerHTML = reviewTemplate(data.val());
  });
  
  reviewsRef.on('child_removed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.parentNode.removeChild(reviewNode);
  });
  
  reviews.addEventListener('click', (e) => {
    var reviewNode = e.target.parentNode
  
    // UPDATE REVEIW
    if (e.target.classList.contains('edit')) {
      maintitle.value = reviewNode.querySelector('.maintitle').innerText;
      descption.value  = reviewNode.querySelector('.descption').innerText;
      hiddenId.value = reviewNode.id;
    }
  
    // DELETE REVEIW
    if (e.target.classList.contains('delete')) {
      var id = reviewNode.id;
      db.ref('masomo/' + id).remove(); }
  });
  function reviewTemplate({maintitle, descption}) {
    return `
      <div class='maintitle'>${maintitle}</div>
      <div class='descption'>${descption}</div>
      <button class='delete'>Delete</button>
      <button class='edit'>Edit</button> 
    `
  };