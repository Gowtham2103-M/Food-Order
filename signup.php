<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email    = $_POST['email'];
    $password = $_POST['password'];
    $phone    = $_POST['phone'];
    $address  = $_POST['address'];
    $gender   = $_POST['gender'];
    $dob      = $_POST['dob'];

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Use prepared statement for security
    $stmt = $conn->prepare("INSERT INTO users (fullname,email,password,phone,address,gender,dob) VALUES (?,?,?,?,?,?,?)");
    $stmt->bind_param("sssssss", $fullname, $email, $hashed_password, $phone, $address, $gender, $dob);

    if ($stmt->execute()) {
        echo "<script>
                alert('Signup successful! Please login.');
                window.location.href='h1.html';
              </script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
