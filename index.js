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