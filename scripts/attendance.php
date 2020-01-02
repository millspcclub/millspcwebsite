

<?php

if (basename($_SERVER['SCRIPT_FILENAME']) === 'attendance.php')
{
    exit('You have arrived here in error, please return.');
}
header("Content-Transfer-Encoding: UTF-8");


$raw_name = $_POST["name"];
$raw_email = $_POST["email"];
$name = filter_var($raw_name, FILTER_SANITIZE_STRING);
$email = filter_var($raw_email, FILTER_SANITIZE_EMAIL);
$my_file = '/srv/dev-disk-by-label-raid/www/attendance.csv';
$file = fopen($my_file, 'a') or die('Cannot open file:  '.$my_file);
fwrite($file, $name);
fwrite($file, ",");
fwrite($file, $email);
fwrite($file, "\n");
fclose($file);

?>
<body>
<script type="text/javascript">alert("Data accepted! Thanks for coming!");</script>
<script type="text/javascript">location.href = '/';</script>
</body>
