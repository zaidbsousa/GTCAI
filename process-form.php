<?php
// Prevent direct access to this file
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 403 Forbidden');
    exit('Direct access not permitted');
}

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'form_errors.log');

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to validate phone number (basic validation)
function is_valid_phone($phone) {
    return preg_match('/^[0-9+\-\s()]{8,20}$/', $phone);
}

try {
    // Check if all required fields are present
    $required_fields = ['name', 'email', 'phone', 'category', 'course', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Sanitize and validate input
    $name = sanitize_input($_POST['name']);
    $email = sanitize_input($_POST['email']);
    $phone = sanitize_input($_POST['phone']);
    $category = sanitize_input($_POST['category']);
    $course = sanitize_input($_POST['course']);
    $message = sanitize_input($_POST['message']);

    // Validate email
    if (!is_valid_email($email)) {
        throw new Exception("Invalid email format");
    }

    // Validate phone
    if (!is_valid_phone($phone)) {
        throw new Exception("Invalid phone number format");
    }

    // Prepare email content
    $to = 'ai@galaxy.ps';
    $subject = "New Course Inquiry from Galaxy AI Website";
    
    $email_content = "New course inquiry received:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Category: $category\n";
    $email_content .= "Course: $course\n";
    $email_content .= "Message: $message\n";
    
    // Email headers
    $headers = array(
        'From: Galaxy AI Website <noreply@galaxy.ps>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    );

    // Send email
    $mail_sent = mail($to, $subject, $email_content, implode("\r\n", $headers));

    if (!$mail_sent) {
        throw new Exception("Failed to send email");
    }

    // Log successful submission
    error_log("Form submitted successfully - Name: $name, Email: $email");

    // Return success response
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you for your inquiry. We will contact you shortly.'
    ]);

} catch (Exception $e) {
    // Log error
    error_log("Form submission error: " . $e->getMessage());

    // Return error response
    header('HTTP/1.1 400 Bad Request');
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'There was an error processing your request. Please try again later.'
    ]);
}
?> 