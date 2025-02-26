/*  Condition for submit button to show **/
function checkConditions() {
    var practical = document.getElementById("practical").value;
    var laptops = document.getElementById("laptops").value;
    var tools = document.getElementById("tools").value;
    var submitBtn = document.getElementById("submitBtn");
    var notice = document.getElementById("notice");

    if (practical === "Yes" && laptops === "Yes" && tools === "Yes") {
        submitBtn.style.display = "block";
        notice.style.display = "none";
    } else {
        submitBtn.style.display = "none";
        notice.style.display = "block";
    }
}

document.getElementById("practical").addEventListener("change", checkConditions);
document.getElementById("laptops").addEventListener("change", checkConditions);
document.getElementById("tools").addEventListener("change", checkConditions);





/** -------------------- When form is submitted---------------------* */

document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    var programme = document.getElementById("programme").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("telephone").value;
    
    var formData = new FormData(this);
    var formObject = {};

    // Convert FormData to an object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Retrieve existing submissions
    var storedData = JSON.parse(localStorage.getItem("allSubmissions")) || [];

    // Check if email or phone already exists
    var userExists = storedData.some(entry => entry.email === email || entry.telephone === phone);
    
    if (userExists) {
        alert("You have already registered with this email or phone number.");
        return;
    }

    // Generate Matric Number
    var count = storedData.length + 1; // Ensure uniqueness
    var matricNumber = "";

    if (programme === "Web Design") {
        matricNumber = `WEB/DES/2015/${String(count).padStart(5, '0')}`;
    } else if (programme === "Web Development") {
        matricNumber = `WEB/DEV/2015/${String(count).padStart(5, '0')}`;
    }

    formObject.matricNumber = matricNumber; // Store matric number

    // Save new submission
    storedData.push(formObject);
    localStorage.setItem("allSubmissions", JSON.stringify(storedData));

    alert("Registration successful! Your Matric No: " + matricNumber);

    // Redirect based on selected program
    if (programme === "Web Design") {
        window.location.href = "https://www.google.com.ng";
    } else if (programme === "Web Development") {
        window.location.href = "https://www.google-new.com.ng";
    }
});

// Function to download PDF only if correct code is entered
function secureDownload() {
    var accessCode = prompt("Enter the access code to download submissions:");
    
    if (accessCode !== "WEB2025") {
        alert("Invalid access code! You cannot download the PDF.");
        return;
    }

    generateAllPDF(); // If correct code, generate PDF
}

// Function to generate a PDF of all submissions
function generateAllPDF() {
    var { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    var storedData = JSON.parse(localStorage.getItem("allSubmissions"));
    if (!storedData || storedData.length === 0) {
        alert("No submissions found!");
        return;
    }

    let y = 10;
    doc.text("All Registration Submissions", 10, y);
    y += 10;

    storedData.forEach((submission, index) => {
        doc.text(`Submission ${index + 1}`, 10, y);
        y += 7;

        for (const [key, value] of Object.entries(submission)) {
            doc.text(`${key}: ${value}`, 10, y);
            y += 7;
        }

        y += 10; // Add space between entries
        if (y > 270) { // Create new page if needed
            doc.addPage();
            y = 10;
        }
    });

    doc.save("All_Registrations.pdf"); // Save as PDF
}


// Function to display carousel




//Function to toggle menu to show

let Menu_Icon = document.getElementById('Menu_toggler'),
    P_Menu = document.getElementById('Menu_Lists'),
    Menu_text = document.getElementById('Menu_Items');


// Show P_Menu when Menu_Icon is clicked
Menu_Icon.addEventListener('click', () => {
    P_Menu.style.right = '0'; // Show the P_Menu element
});

// Hide P_Menu when any text inside P_Menu is clicked
P_Menu.addEventListener('click', (event) => {
    if (event.target !== P_Menu) {
        P_Menu.style.right = '-100%'; // Hide the P_Menu element
    }
});
