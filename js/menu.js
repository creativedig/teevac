document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Retrieve active link from localStorage
    const activePage = localStorage.getItem('activePage');
    if (activePage) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === activePage) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            localStorage.setItem('activePage', this.getAttribute('href'));
        });
    });
});



/*---------- Menu Click function**/


document.addEventListener("DOMContentLoaded", function () {
    const headMenu = document.getElementById("head-menu");
    const nav = document.getElementById("nav");

    headMenu.addEventListener("click", function () {
        if (nav.classList.contains("show")) {
            nav.classList.remove("show");
            headMenu.innerHTML = "MENU";
        } else {
            nav.classList.add("show");
            headMenu.innerHTML = "CLOSE";
        }
    });

    nav.addEventListener("click", function () {
        nav.classList.remove("show");
        headMenu.innerHTML = "MENU";
    });
});
