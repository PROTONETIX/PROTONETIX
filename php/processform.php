<?php
// Allow cross-origin requests (adjust this for security in production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get the posted data
$postData = file_get_contents("php://input");
$request = json_decode($postData);

// Check if we have all required data
if (!$request || !isset($request->name) || !isset($request->email)) {
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields'
    ]);
    exit;
}

// Sanitize inputs
$name = htmlspecialchars($request->name);
$email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
$company = isset($request->company) ? htmlspecialchars($request->company) : 'Not provided';
$phone = isset($request->phone) ? htmlspecialchars($request->phone) : 'Not provided';
$service = isset($request->service) ? htmlspecialchars($request->service) : 'Not provided';
$message = isset($request->message) ? htmlspecialchars($request->message) : 'Not provided';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address'
    ]);
    exit;
}

// Set up email
$to = "info@protonetix.com"; // CHANGE THIS TO YOUR EMAIL ADDRESS
$subject = "New Pricing Request from $name";

// Create email body
$emailBody = "
<html>
<head>
    <title>New Pricing Request</title>
</head>
<body>
    <h2>New Pricing Request Details</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Company:</strong> $company</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Service Interested In:</strong> $service</p>
    <p><strong>Message:</strong><br>$message</p>
    <p><em>This request was submitted on " . date("Y-m-d H:i:s") . "</em></p>
</body>
</html>
";

// Set up email headers
$headers = "From: $email" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

// Send email
$mailSent = mail($to, $subject, $emailBody, $headers);

// Return response
if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Your request has been sent successfully!'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'There was an error sending your request. Please try again later.'
    ]);
}
?>