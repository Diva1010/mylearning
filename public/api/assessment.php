<?php header('Access-Control-Allow-Origin: *');
    require_once '../sqldbconnect.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $courseId = $_GET["courseId"];
    $user = $_GET["user"];
    if($user=='student'){
        $stuId = $_GET["userId"];
        $query = "SELECT * from assigment LEFT JOIN userassignment on assigment.assignmentId = userassignment.assignmentId where 
            assigment.courseId=$courseId and userassignment.stuId = $stuId";
    }
    else{
        $query = "SELECT * from userassignment where courseId=$courseId";   
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