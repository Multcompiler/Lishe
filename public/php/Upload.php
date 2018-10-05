<?php
//This is the directory where images will be saved
$target = "https://barbershopsaloon.000webhostapp.com/Announcement_images/";
$target = $target . basename( $_FILES['Filename']['name']);

//This gets all the other information from the form
$Filename=basename( $_FILES['Filename']['name']);
$name = $_POST['name'];
$image = $_POST['image'];	 
$status = $_POST['status'];
$timeStamp = $_POST['timeStamp'];
$url = $_POST['url'];


//Writes the Filename to the server
if(move_uploaded_file($_FILES['Filename']['tmp_name'], $target)) {
    //Tells you if its all ok
    echo "The file ". basename( $_FILES['Filename']['name']). " has been uploaded, and your information has been added to the directory";
    
     //open connection to mysql db
    $connection = mysqli_connect("localhost","id1290987_barber","pie3141592654","id1290987_barbershop") 
    or die("Error " . mysqli_error($connection));
    
    //Writes the information to the database
    mysql_query("INSERT into Anauncement(name,image, status,  profilPic,url,timeStamp)
    VALUES ('$name','$Filename','$status','https://barbershopsaloon.000webhostapp.com/Announcement_images/home.png','$url',NOW())") ;
} else {
    //Gives and error if its not
    echo "Sorry, there was a problem uploading your file.";
}



?>