<?php
    require_once '../sqldbconnect.php';
    $data = json_decode(file_get_contents('php://input'), true);
    $userID = $data["stuId"];
    $type = $data["type"];
    if($type == "view"){
        $query = "SELECT c.*, cp.*  from courses c JOIN courseprogress cp on c.courseId = cp.courseId WHERE cp.stuId='$userID'";
    }
    else{
        $courseId = $data["courseId"];
        $updateQuery = "UPDATE courseprogress SET completed=1 where courseId='$courseId' and stuId='$userID'";
    }
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