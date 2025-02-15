document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".hidden");

    function checkVisibility() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

            if (isVisible) {
                element.classList.add("visible");
            } else {
                element.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});
