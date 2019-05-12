<?php header('Access-Control-Allow-Origin: *');
    require_once '../sqldbconnect.php';
    $stuId = $_REQUEST['studentId'];
    $courseId = $_REQUEST['courseId'];
    $user = $_REQUEST['user'];
    $assignmentId = $_REQUEST['assignmentId'];
    if($user == 'student'){        
        $assignname = $stuId.'_'.$_FILES["file"][ "name" ];
        $folder=  "/docs/answers/";
        move_uploaded_file($_FILES["file"]["tmp_name"],  $_SERVER['DOCUMENT_ROOT']."/docs/answers/".$stuId.'_'.$_FILES["file"]["name"]); 
        $query="UPDATE userassignment SET 
                answerfolder = '$folder', 
                answerfile = '$assignname',
                datesubmitted =  NOW() 
                WHERE
                stuId = '$stuId' and courseId = '$courseId' and  assignmentId = '$assignmentId'";          
    }
   else{
    $grade = $_REQUEST['grade'];
    $query = "UPDATE userassignment set grade='$grade' where assignmentId='$assignmentId' and stuId='$stuId' and courseId='$courseId'";
   }
    $res = mysqli_query($conn,$query);  
    if($res){
        echo ($res);
    }
    else{
    header('HTTP/1.1 401 Unauthorized', true, 401);
    }


?>