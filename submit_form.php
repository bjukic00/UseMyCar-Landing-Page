<?php
header('Content-Type: application/json');

// Database credentials (prilagodi prema Hostinger podacima)
require_once 'db_config.php';

// Create connection
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get POST data (JSON)
if (stripos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
    $input = json_decode(file_get_contents('php://input'), true);
} else {
    $input = $_POST;
}

$data = [
    'email' => filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL),
    'car_model' => htmlspecialchars($input['carModel'] ?? ''),
    'car_year' => intval($input['carYearInput'] ?? 0),
    'location' => htmlspecialchars($input['locationInput'] ?? ''),
];


// Validate required fields
$required = ['email', 'car_model', 'car_year', 'location'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO car_owners (email, car_model, car_year, location) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssis", $data['email'], $data['car_model'], $data['car_year'], $data['location']);

// Execute query
if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Data saved successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
