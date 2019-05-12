<?php
    require_once '../sqldbconnect.php';
    $courseId= $_GET['courseId'];
    $stuId = $_GET['stuId'];
    $subsecQuery = "SELECT subsecId from coursemodule WHERE courseId='$courseId'";
    $res = mysqli_query($conn,$subsecQuery);
    if($res){
        $query = "INSERT into courseprogress(stuId, courseId, subsecId, completed) VALUES";
        $length = mysqli_num_rows($res);
        $index = 0;
        while ($row = mysqli_fetch_assoc($res)) {          
            $subsecId = $row['subsecId'];
            $query .= "('$stuId','$courseId','$subsecId','0')";
            if($index < ($length)-1 ){
                $query .= ",";
            }          
            $index++;
        }
         $result = mysqli_query($conn,$query);
        if($res){
            $assignIdQuery = "SELECT assignmentId from assigment WHERE courseId=$courseId";
            $assignIdres = mysqli_query($conn,$assignIdQuery);
            if($assignIdres){
                $assignmentQuery = "INSERT into userassignment(stuId, courseId, assignmentId) VALUES";
                $assignLength = mysqli_num_rows($assignIdres);
                $assignIndex = 0;
                while ($row = mysqli_fetch_assoc($assignIdres)) {  
                    $assignmentId = $row['assignmentId'];
                    $assignmentQuery .= "('$stuId','$courseId','$assignmentId')";
                    if($assignIndex < ($assignLength)-1 ){
                        $assignmentQuery .= ",";
                    }          
                    $assignIndex++;
                }
                $finalRes = mysqli_query($conn,$assignmentQuery);
            }

            echo json_encode($finalRes);
        }
        else{
            header('HTTP/1.1 401 Unauthorized', true, 401);
        }
    }
    else{
        header('HTTP/1.1 401 Unauthorized', true, 401);
    }
    

?>