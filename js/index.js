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
        alert("Sorry, You can't registered twice. Wait for the Exam date, and If you wish to change the program, contact the Admin for help. Thanks.");
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

    alert("Registration successful! Your Examination Number is: " + " " + ExamNumber + " " + "Kindly Save it as it will be required to write the Exam. We hope to see you progress.");

    // Redirect based on selected program
    if (programme === "Web Design" || programme === "Web Development") {
         window.location.href = "#";
    } 
});

// Function to download PDF only if correct code is entered
function secureDownload() {
    var accessCode = prompt("Enter the Download Code to get all the submission:");
    
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



//JavaScript Function to show animation of about us section
document.addEventListener("DOMContentLoaded", function () {
    const coreValueBoxes = document.querySelectorAll(".core-value-box");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });
    }, { threshold: 0.3 });

    coreValueBoxes.forEach(box => {
        observer.observe(box);
    });
});



// Function to Download EXAM HANDOUT
document.getElementById("Exam-Handout").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    let userExamNumber = prompt("Please enter your Exam Number to access the handout:");
    
    if (!userExamNumber) {
        alert("Exam Number is required to download the handout.");
        return;
    }
    
    // Generate Examination Number (assuming programme and storedData are defined)
    var count = storedData.length + 1; // Ensure uniqueness
    var ExamNumber = "";
    
    if (programme === "Web Design") { 
        ExamNumber = `TEV/DES/2025/${String(count).padStart(5, '0')}`;
    } else if (programme === "Web Development") { 
        ExamNumber = `TEV/DEV/2025/${String(count).padStart(5, '0')}`;
    }
    
    if (userExamNumber === ExamNumber) {
        window.location.href = "/doc/handout.pdf"; // Redirect to the document
    } else {
        alert("Sorry, you can’t download the Exam Handout. Kindly register first to download. Thanks");
    }
});








//TRIGGER ANIMATION HERE
// Trigger CSS Animations when elements are scrolled into view

// This JS uses the Intersection Observer API to determine if objects are within the viewport
// It addes an 'in-view' class to elements when they come into view (and removes the class when not on screen)
// Use to add @keyframe or transition animations to elements so they animate once they are on screen

//TO USE
// Simply add the .animate class to those HTML elements that you wish to animate. For example, <h1 class="animate">
// Once in the viewport, the JS will add the 'in-view' class to those elements. For example, <h1 class="animate in-view">
// Define your CSS to enable animations once that element is in view. For example, h1.in-view { }

//Check if the document is loaded (so that this script can be placed in the <head>)
document.addEventListener("DOMContentLoaded", () => {

	// Use Intersection Observer to determine if objects are within the viewport
	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.classList.add('in-view');
		  return;
		}
		entry.target.classList.remove('in-view');
	  });
	});

	// Get all the elements with the .animate class applied
	const allAnimatedElements = document.querySelectorAll('.animate');

	// Add the observer to each of those elements
	allAnimatedElements.forEach((element) => observer.observe(element));

}); 
