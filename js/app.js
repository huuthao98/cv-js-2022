const header = document.querySelector("header");

// --------------StickyNavbar----------------
function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);  
   
};

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

// --------------Reveal Animation----------------
let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcaseInfo", {deplay: 300});
sr.reveal(".showcaseImage", {origin: "top",deplay: 300});