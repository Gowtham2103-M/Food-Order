<?php
session_start();
include 'db_connect.php'; // Make sure this file sets $conn properly

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get and sanitize input
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($password)) {
        echo "<script>alert('Please enter both email and password'); window.location.href='login.html';</script>";
        exit();
    }

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("SELECT id, fullname, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($user_id, $user_name, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            // Login success, store user info in session
            $_SESSION['user_id'] = $user_id;
            $_SESSION['user_name'] = $user_name;
            $_SESSION['user_email'] = $email; // store email for order.php

            // Redirect to your landing page
            header("Location: h3.html");
            exit();
        } else {
            echo "<script>alert('Invalid password'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('Invalid email'); window.location.href='login.html';</script>";
    }

    $stmt->close();
    $conn->close();
} else {
    // If someone accesses this page directly
    header("Location: login.html");
    exit();
}
?>
