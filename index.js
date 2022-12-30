const navToggloeBtn = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".my-nav");

navToggloeBtn.addEventListener("click", () => {
  const visibility = navigation.getAttribute("data-visible");
  console.log(visibility);

  if (visibility === "false") {
    navigation.setAttribute("data-visible", "true");
    navToggloeBtn.classList.remove("fa-bars");
    navToggloeBtn.classList.add("fa-circle-xmark");
  } else {
    navigation.setAttribute("data-visible", "false");
    navToggloeBtn.classList.add("fa-bars");
    navToggloeBtn.classList.remove("fa-circle-xmark");
  }
});

/**
 * Hero type effect
 */
const typed = select(".typed");
if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}
