<?php 
require_once 'dbconfig.php';
//try{
    $conn = mysqli_connect($host, $username, $password);
    $db = mysqli_select_db($conn, $database);
  /*   if (!$db) {
     die ('DB Not available :' . mysqli_error());
    } */
   
/* } catch (PDOException $pe) {
    die("Could not connect to the database $dbname :" . $pe->getMessage());
} */