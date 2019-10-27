const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector(".navbar ul");
const navbarLinks = document.querySelectorAll(".navbar a");

navbarToggler.addEventListener("click", () => {
   navbarToggler.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
});

navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

const navbarLinkClick = () => {
  if(navbarMenu.classList.contains("open")) {
    navbarToggler.click();
  }
}