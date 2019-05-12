<?php 
    require_once '../sqldbconnect.php';
    $data = json_decode(file_get_contents('php://input'), true);
        $myusername = $data['username'];
        $mypassword = $data['password']; 
        $query = "SELECT stuId , username, firstname, lastname, userrole, template from users WHERE username = '$myusername' and password = '$mypassword'";
        $res = mysqli_query($conn,$query);  
        $result = null;
        if(mysqli_num_rows($res)){
            while ($row = mysqli_fetch_assoc($res)) {
                $result[] = $row;
            }
            echo json_encode($result);
        }
      else{
        header('HTTP/1.1 401 Unauthorized', true, 401);
      }
       
 
?>