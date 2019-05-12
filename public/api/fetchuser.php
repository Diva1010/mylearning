<?php
    require_once '../sqldbconnect.php';
    $data = json_decode(file_get_contents('php://input'), true);
    $type= $_REQUEST['type'];
    if($type=='get'){
        $stuId = $_REQUEST['userId'];
        $query = "SELECT username, firstname, lastname, password, gender from users where stuId = '$stuId'";
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
    }
    else if($type == 'update' ){
        $stuId = $data['stuId'];
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];
        $gender = $data['gender'];
        $password = $data['password'];
        $query = "UPDATE users set firstname='$firstname', lastname='$lastname',
                    gender='$gender', password='$password' where stuId='$stuId'";
        $res = mysqli_query($conn,$query);      
        if($res){
            echo ($res);
        }
        else{
            header('HTTP/1.1 401 Unauthorized', true, 401);
        }
    }
    else{
        $templateId = $data['template'];
        $stuId = $data['stuId'];
        $query = "UPDATE users set template='$templateId' where stuId='$stuId'";
        $res = mysqli_query($conn,$query);      
        if($res){
            echo ($res);
        }
        else{
            header('HTTP/1.1 401 Unauthorized', true, 401);
        }
    }
   
?>