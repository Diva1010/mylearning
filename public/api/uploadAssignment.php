<?php header('Access-Control-Allow-Origin: *');
    require_once '../sqldbconnect.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $courseId = $_REQUEST['courseId'];
    $duedate = $_REQUEST['duedate'];
    $assignname = $_FILES["file"][ "name" ];
    $folder=  "/docs/assignment/";
    move_uploaded_file($_FILES["file"]["tmp_name"],  $_SERVER['DOCUMENT_ROOT']."/docs/assignment/".$_FILES["file"]["name"]); 
    $query="INSERT INTO assigment(courseId, assignfolder, assignfile, duedate)           
           VALUES('$courseId', '$folder','$assignname','$duedate')";
     $res = mysqli_query($conn,$query);  
     if($res){
        $last_id = mysqli_insert_id($conn);
        $assignIdQuery = "SELECT DISTINCT stuId from courseprogress WHERE courseId=$courseId";
        $assignIdres = mysqli_query($conn,$assignIdQuery);
        if($assignIdres){
            $assignmentQuery = "INSERT into userassignment(stuId, courseId, assignmentId) VALUES";
            $assignLength = mysqli_num_rows($assignIdres);
            $assignIndex = 0;
            while ($row = mysqli_fetch_assoc($assignIdres)) {  
                $stuId = $row['stuId'];
                $assignmentQuery .= "('$stuId','$courseId','$last_id')";
                if($assignIndex < ($assignLength)-1 ){
                    $assignmentQuery .= ",";
                }          
                $assignIndex++;
            }
            $finalRes = mysqli_query($conn,$assignmentQuery);
            if($finalRes){
                echo ($finalRes);
            }
            else{
                header('HTTP/1.1 401 Unauthorized', true, 401);
            }
           
        }

       
     }
     else{
     header('HTTP/1.1 401 Unauthorized', true, 401);
     }
 
 
 ?>

