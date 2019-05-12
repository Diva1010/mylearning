<?php
    require_once '../sqldbconnect.php';
    $typeExist = isset($_GET["type"]);
    $type = $typeExist ? $_GET["type"] : null;
    $popularExist = isset($_GET["popular"]);
    $popular = $popularExist ? $_GET["popular"] : null;
    $query = "";
    if($popular){
        $query = "SELECT * from courses WHERE popular='$popular'";
    }
    else{
        $query = "SELECT * from courses WHERE coursecategory='$type'";
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