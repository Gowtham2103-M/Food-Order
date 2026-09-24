<?php
session_start();
header('Content-Type: application/json'); // ensures JSON response

// Check if user is logged in
$user_email = $_SESSION['user_email'] ?? '';
if (!$user_email) {
    echo json_encode(['status'=>'error','message'=>'User not logged in']);
    exit;
}

// Database connection
$conn = mysqli_connect("localhost", "root", "", "shopurfood");
if (!$conn) {
    echo json_encode(['status'=>'error','message'=>'DB connection failed']);
    exit;
}

// Only handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $items_json = $_POST['items'] ?? '';
    $items = json_decode($items_json, true);

    if (!is_array($items) || count($items) === 0) {
        echo json_encode(['status'=>'error','message'=>'No items selected']);
        exit;
    }

    // Escape inputs
    $user_email_safe = mysqli_real_escape_string($conn, $user_email);
    $items_db = mysqli_real_escape_string($conn, json_encode($items));
    $total_items = count($items);
    $order_time = date('Y-m-d H:i:s');

    // Insert order into database
    $sql = "INSERT INTO orders (user_email, items, total_items, order_time) 
            VALUES ('$user_email_safe', '$items_db', $total_items, '$order_time')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(['status'=>'success']);
    } else {
        echo json_encode(['status'=>'error','message'=>mysqli_error($conn)]);
    }

    mysqli_close($conn);
    exit;
} else {
    echo json_encode(['status'=>'error','message'=>'Invalid request method']);
}
?>
