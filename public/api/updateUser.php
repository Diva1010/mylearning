<?php
    require_once '../sqldbconnect.php';
    $data = json_decode(file_get_contents('php://input'), true);
    $type= $_GET['type'];
    if($type=='register'){
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $username = $data['username'];
        $gender = $data['gender'];
        $password = $data['password'];
        $userrole =  $data['userrole'];
        $query = "INSERT INTO users(username, firstname, lastname, gender, password, userrole) 
        VALUES ('$username','$firstname', '$lastname' , '$gender' , '$password', '$userrole')";
    }
    else{
        $stuId= $_GET['stuId'];
        $query = "DELETE FROM users WHERE stuId= $stuId";
    }
   
    if ($conn->query($query) === TRUE) {
        header('Status: 200');
        } else {
        echo "Error: " . $query . "<br>" . $conn->error;
        }$conn->close();
   

?>