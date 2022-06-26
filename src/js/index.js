gsap.registerPlugin(ScrollTrigger);
// Mouse pointer
gsap.set(".ball", { xPercent: -50, yPercent: -50 });
const ball = document.querySelector(".ball");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speedX = 0.08;
const speedY = 0.15;

const xSet = gsap.quickSetter(ball, "x", "px");
const ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

gsap.ticker.add(() => {
  pos.x += (mouse.x - pos.x) * speedX;
  pos.y += (mouse.y - pos.y) * speedY;
  xSet(pos.x);
  ySet(pos.y);
});

function magnetMouseMove(e, ele) {
  // x translate
  const eleXPos = ele.getBoundingClientRect().left;
  const xPos = e.clientX - eleXPos;
  const xPosRelativeToCenter = xPos - ele.offsetWidth / 2;

  // y translate
  const eleYPos = ele.getBoundingClientRect().top;
  const yPos = e.clientY - eleYPos;
  const yPosRelativeToCenter = yPos - ele.offsetHeight / 2;

  const spanContent = ele.querySelector(".magnet-content");

  gsap.to(spanContent, {
    x: xPosRelativeToCenter,
    y: yPosRelativeToCenter,
    ease: "power1",
  });
}

function magnetMouseLeave(e, ele) {
  const spanContent = ele.querySelector(".magnet-content");

  gsap.to(spanContent, {
    x: 0,
    y: 0,
    ease: "power1",
    duration: 0.5,
  });
}

// nav anim links
const navLiElements = document.getElementsByClassName("nav-li-container");
[...navLiElements].forEach((ele) => {
  ele.addEventListener("mousemove", (e) => magnetMouseMove(e, ele));
  ele.addEventListener("mouseleave", (e) => magnetMouseLeave(e, ele));
});

const aboutBtnContainer = document.getElementsByClassName("abt-btn-container");
[...aboutBtnContainer].forEach((ele) => {
  ele.addEventListener("mousemove", (e) => magnetMouseMove(e, ele));
  ele.addEventListener("mouseleave", (e) => magnetMouseLeave(e, ele));
});

// Top dot scale on scroll
let briefAboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".brief-about",
    start: "top bottom",
    end: "top 20%",
    scrub: 4,
  },
});

briefAboutTl.to(".dot", {
  scale: "1200",
  duration: "1",
});

// Works
// Company pin

const companyTl = gsap.timeline();
companyTl.to(".infy", { yPercent: -100 });

ScrollTrigger.create({
  animation: companyTl,
  trigger: ".company-container",
  start: "top top",
  end: "bottom bottom",
  pin: true,
  snap: 1,
  scrub: 1,
  anticipatePin: 1,
  pinSpacing: false,
});

const worksTitleTl = gsap.timeline();
const worksCategoryTitle = document.querySelector(".works-category-title");

worksTitleTl
  .from(".works-category-title", { opacity: 0 })
  .to(".works-category-title", { opacity: 0.8 });

ScrollTrigger.create({
  animation: worksTitleTl,
  trigger: ".qb",
  start: "top 80%",
  end: "bottom top",
  scrub: 1,
  anticipatePin: 1,
  pinSpacing: false,
  onEnter: (self) => (worksCategoryTitle.innerText = "Experience"),
});

let personalWorkSections = gsap.utils.toArray(".panel");

let horizontalScrollSection = gsap.to(personalWorkSections, {
  xPercent: -100 * (personalWorkSections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".hori-scroll-container",
    pin: true,
    scrub: 1,
    snap: 1 / (personalWorkSections.length - 1),
    end: () =>
      "+=" + document.querySelector(".hori-scroll-container").offsetWidth,
  },
});

ScrollTrigger.create({
  containerAnimation: horizontalScrollSection,
  trigger: ".amplication",
  start: "left left",
  onEnter: (self) => (worksCategoryTitle.innerText = "Opensource"),
  onLeaveBack: (self) => (worksCategoryTitle.innerText = "Experience"),
});

ScrollTrigger.create({
  containerAnimation: horizontalScrollSection,
  trigger: ".photograph-agency",
  start: "left center",
  onEnter: (self) => (worksCategoryTitle.innerText = "Personal"),
  onLeaveBack: (self) => (worksCategoryTitle.innerText = "Opensource"),
});

// Footer ball
let footerDotTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".footer-section",
    start: "top 95%",
  },
});

footerDotTl.to("#footer-dot", {
  y: "98vh",
  duration: 2.5,
  ease: Bounce.easeOut,
});

function goToWorks() {
  document.querySelector(".qb").scrollIntoView({
    behavior: "smooth",
  });
}

function goToContact() {
  document.querySelector("#contact").scrollIntoView({
    behavior: "smooth",
  });
}
