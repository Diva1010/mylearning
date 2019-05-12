<?php header('Access-Control-Allow-Origin: *');
    require_once '../sqldbconnect.php';

    $data = json_decode(file_get_contents('php://input'), true);
    $coursename = $_REQUEST['coursename'];
    $extraDesc = $_REQUEST['extraDesc'];
    $description = $_REQUEST['description'];
    $coursedetails = $_REQUEST['coursedetails'];
    $coursecategory = $_REQUEST['coursecategory'];
    $courseImg = $_FILES["file"][ "name" ];
    $folder=  "/img/";
    move_uploaded_file($_FILES["file"]["tmp_name"],  $_SERVER['DOCUMENT_ROOT']."/img/".$_FILES["file"]["name"]); 
    $query="INSERT INTO courses(coursename, description, extraDesc, folderPath, courseImg, coursedetails, coursecategory)           
           VALUES('$coursename', '$description', '$extraDesc', '$folder','$courseImg','$coursedetails', '$coursecategory')";
    $res = mysqli_query($conn,$query);  
    if($res){
        $last_id = mysqli_insert_id($conn);
        echo ($last_id);
    }
    else{
    header('HTTP/1.1 401 Unauthorized', true, 401);
    }


?>