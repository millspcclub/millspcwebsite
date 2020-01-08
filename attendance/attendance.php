

<?php


$raw_name = $_POST["name"];
$raw_email = $_POST["email"];
$name = filter_var($raw_name, FILTER_SANITIZE_STRING);
$email = filter_var($raw_email, FILTER_SANITIZE_EMAIL);
$my_file = 'attendance.csv';
$file = fopen($my_file, 'a') or die('Cannot open file:  '.$my_file);
fwrite($file, $name);
fwrite($file, ",");
fwrite($file, $email);
fwrite($file, "\n");
fclose($file);
$completed = true;


?>
<html>
<body>
  <script src="completed.js"></script>
</body>
</html>
