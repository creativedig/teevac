<?php
require 'vendor/autoload.php'; // Load Composer dependencies for PHPMailer & TCPDF

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use TCPDF;

// Database connection
$host = 'localhost';  // Change if using a remote server
$db = 'teevac_db';    // Your database name
$user = 'root';       // Your MySQL username (default: root for localhost)
$pass = '';           // Your MySQL password (leave empty for localhost)

try {
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Form successfully submitted";  // Remove this after testing
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>

// Process form data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $telephone = $_POST['telephone'];
    $whatsapp = $_POST['whatsapp'];
    $location = $_POST['location'];
    $programme = $_POST['programme'];
    $experience = $_POST['experience'];
    $tools = $_POST['tools'];
    $practical = $_POST['practical'];
    $reason = $_POST['reason'];
    $expectation = $_POST['expectation'];
    $laptops = $_POST['laptops'];

    // Store in database
    $stmt = $conn->prepare("INSERT INTO registrations (name, gender, email, telephone, whatsapp, location, programme, experience, tools, practical, reason, expectation, laptops) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $gender, $email, $telephone, $whatsapp, $location, $programme, $experience, $tools, $practical, $reason, $expectation, $laptops]);

    // Generate PDF
    $pdf = new TCPDF();
    $pdf->AddPage();
    $pdf->SetFont('helvetica', '', 12);
    $pdf->Write(5, "Registration Details:\n\n");
    $pdf->Write(5, "Name: $name\nGender: $gender\nEmail: $email\nPhone: $telephone\nWhatsApp: $whatsapp\nLocation: $location\nProgramme: $programme\nExperience: $experience\nTools Ready: $tools\nPractical Ready: $practical\nReason: $reason\nExpectation: $expectation\nLaptop Access: $laptops\n");
    
    $pdfFile = 'registration_' . time() . '.pdf';
    $pdf->Output($pdfFile, 'F');

    // Send Email with PDF attachment
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'your@example.com'; // Replace with your email
        $mail->Password = 'yourpassword'; // Replace with your email password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('your@example.com', 'TEEVAC Academy');
        $mail->addAddress($email);
        $mail->Subject = 'TEEVAC Registration Confirmation';
        $mail->Body = "Dear $name,\n\nThank you for registering for our web training program! Please find attached your registration details.\n\nBest Regards,\nTEEVAC Academy";
        $mail->addAttachment($pdfFile);
        $mail->send();
    } catch (Exception $e) {
        error_log("Email could not be sent. Mailer Error: {$mail->ErrorInfo}");
    }

    // Redirect based on programme
    if ($programme == 'Web Design') {
        header("Location: https://www.google.com");
    } elseif ($programme == 'Web Development') {
        header("Location: https://www.goo.com.ng");
    }
    exit();
}
