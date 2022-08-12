<?php

  include('database.php');
  
  if(isset($_POST['contact_name'])) {
    $contact_name = $_POST['contact_name'];
    $contact_number = $_POST['contact_number'];
    $contact_type = $_POST['contact_type'];
    $contact_relationship = $_POST['contact_relationship'];
   

      #$query = "UPDATE user SET name = 'name', lastName = '$lastName' date = '$date', gender='$gender' WHERE id = '$id'";
      $query = "UPDATE contacts SET contact_name = '$contact_name', contact_type = '$contact_type', contact_relationship='$contact_relationship' WHERE contact_number = '$contact_number'";
      $result = mysqli_query($connection, $query);

      if (!$result) {
        die('Query Failed.');
      }
      echo "Task Update Successfully";  
  }

?>