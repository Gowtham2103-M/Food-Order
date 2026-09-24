<?php
session_start();
session_destroy(); // destroys all session data
header("Location: login.php"); // redirect to login page
exit;
?>
