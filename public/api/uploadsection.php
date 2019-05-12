<?php
    require_once '../sqldbconnect.php';
    $courseId = $_REQUEST['courseId'];
    $sectionname = $_REQUEST['sectionName'];
    $subsection = $_REQUEST['subsectionName'];
    $folder="/img/videos/";
    $upload_image=$_FILES["file"][ "name" ];
    move_uploaded_file($_FILES["file"]["tmp_name"], $_SERVER['DOCUMENT_ROOT']."/img/videos/".$_FILES["file"]["name"]); 
    $query="INSERT INTO coursemodule(courseId, section, subsection, folderpath, video)
            VALUES('$courseId', '$sectionname','$subsection', '$folder','$upload_image')";

    $res = mysqli_query($conn,$query);  
    if($res){
        echo json_encode($res);
    }
    else{
    header('HTTP/1.1 401 Unauthorized', true, 401);
    }

?>