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











/*=============== SCROLL SECTIONS ACTIVE LINK ===============
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav-list a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* If you do not require the indicator activated by scrolling sections. 
   Delete the main tag code in HTML and the scroll sections code in 
   JavaScript.

   And uncomment the active link code in JavaScript 👇.
*/

/*=============== ACTIVE LINK ===============*/
// const navlink = document.querySelectorAll('.nav__link')

// function activeLink(){
//     navlink.forEach((item) => item.classList.remove('active-link'))
//     this.classList.add('active-link')
// }

// navlink.forEach((item) => item.addEventListener('click', activeLink))