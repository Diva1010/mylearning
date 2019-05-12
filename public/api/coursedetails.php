<?php
    require_once '../sqldbconnect.php';
    $courseId = $_GET["courseId"];
    $query = "SELECT * from courses where courseId='$courseId'";
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