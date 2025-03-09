(function () {
    var accessCode = prompt("Admin Access Required -- Enter the access code to manage functions:");

    if (accessCode !== "ADMIN2025") {
        console.log("Unauthorized access! JavaScript functions are hidden.");
        return;
    }

    console.log("Access granted! Admin functions are now active.");

    /* -------------- Condition for submit button to show -------------- */
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

    /* -------------- When form is submitted -------------- */
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
            alert("Sorry, You can't register twice. If you wish to change the program, contact the Admin for help. Thanks.");
            return;
        }

        // Generate Examination Number
        var count = storedData.length + 1; // Ensure uniqueness
        var ExamNumber = "";

        if (programme === "Web Design") { 
            ExamNumber = `TEV/DES/2025/${String(count).padStart(5, '0')}`;
        } else if (programme === "Web Development") { 
            ExamNumber = `TEV/DEV/2025/${String(count).padStart(5, '0')}`;
        }

        formObject.ExamNumber = ExamNumber; // Store matric number

        // Save new submission
        storedData.push(formObject);
        localStorage.setItem("allSubmissions", JSON.stringify(storedData));

        alert("Registration successful! Your Entrance Number is: " + ExamNumber + " Kindly save it as it will be required for the training. Click OK to be redirected to the general group platform. Thanks.");

        // Redirect based on selected program
        if (programme === "Web Design" || programme === "Web Development") {
            window.location.href = "https://t.me/+FzHej-9trupiN2Y0"; // Redirect to Telegram group
        } 
    });

    /* -------------- Function to download PDF only if correct code is entered -------------- */
    function secureDownload() {
        var accessCode = prompt("Admin Access Only -- Enter the access code to download the PDF:");
        
        if (accessCode !== "WEB2025") {
            alert("Invalid access code! It shows that you're not an Admin.");
            return;
        }

        generateAllPDF(); // If correct code, generate PDF
    }

    /* -------------- Function to generate a PDF of all submissions -------------- */
    function generateAllPDF() {
        var { jsPDF } = window.jspdf;
        var doc = new jsPDF();

        var storedData = JSON.parse(localStorage.getItem("allSubmissions"));
        if (!storedData || storedData.length === 0) {
            alert("No submissions found!");
            return;
        }

        let y = 10;
        doc.text("All Submission", 10, y);
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

    /* -------------- Function to reset stored data with access code verification -------------- */
    function resetStoredData() {
        var accessCode = prompt("Admin Access Only -- Enter the access code to reset all data:");

        if (accessCode !== "RESET2025") {
            alert("Invalid access code! You are not authorized to reset the data.");
            return;
        }

        localStorage.removeItem("allSubmissions"); // Clear stored data
        alert("All stored data has been successfully reset.");
    }

    /* -------------- Attach event listener to the reset button -------------- */
    document.getElementById("resetData").addEventListener("click", resetStoredData);

})();
