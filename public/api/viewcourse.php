<?php
    require_once '../sqldbconnect.php';
    $typeExist = isset($_GET["type"]);
    $type = $typeExist ? $_GET["type"] : null;
    $courseIdExist = isset($_GET["courseId"]);
    $courseId = $courseIdExist ? $_GET["courseId"] : null;
    $sectionExist = isset($_GET["section"]);
    $section = $sectionExist ? $_GET["section"] : null;
    if($type == 'section'){
        $query = "SELECT DISTINCT section from coursemodule WHERE courseId= $courseId";
    }
    else if($type == 'subsection'){
        $query = "SELECT * from coursemodule LEFT JOIN courseprogress on coursemodule.courseId = courseprogress.courseId and 
                coursemodule.subsecId = courseprogress.subsecId
                WHERE coursemodule.courseId= $courseId and coursemodule.section = '$section'
                GROUP BY coursemodule.courseId, coursemodule.subsecId";   


    }
    else{
        $query = "";
    }
    $res = mysqli_query($conn, $query);

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
