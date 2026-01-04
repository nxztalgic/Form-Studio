import { lerp } from "./utils.js";
import { createProjects, createBlogposts } from "./projects.js";

// Utility to detect touch devices
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

// Initialize Lenis for <main> scroll container
const lenis = new Lenis({
  wrapper: document.querySelector("main"),
  content: document.querySelector("main"),
  smooth: true,
  duration: 2.0,
  touchMultiplier: 1
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const cursor = document.querySelector(".cursor");

if (cursor && isTouchDevice()) {
  // Remove the cursor on touch devices
  cursor.parentNode.removeChild(cursor);
} else if (cursor) {
  let cursorTarget = { x: 0, y: 0 };
  let cursorCurrent = { x: cursorTarget.x, y: cursorTarget.y };

  window.addEventListener("mousemove", (e) => {
    cursorTarget.x = e.clientX;
    cursorTarget.y = e.clientY;
  });

  function animateCursor() {
    cursorCurrent.x = lerp(cursorCurrent.x, cursorTarget.x, 0.18);
    cursorCurrent.y = lerp(cursorCurrent.y, cursorTarget.y, 0.18);
    cursor.style.left = cursorCurrent.x + "px";
    cursor.style.top = cursorCurrent.y + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

document.querySelectorAll(".content__container").forEach((container) => {
  const inv = container.querySelector(".invChar__Container");
  if (!inv) return;
  const fullWidth = inv.scrollWidth;
  container.addEventListener("mouseenter", () => {
    inv.style.width = fullWidth + "px";
    inv.style.opacity = "1";
  });
  container.addEventListener("mouseleave", () => {
    inv.style.width = "0px";
    inv.style.opacity = "0";
  });
});

document.querySelectorAll('.footer__link a, .hero__cta h4, .projects__title h4')
  .forEach(parent => {
    const text = parent.textContent.trim();
    parent.textContent = '';
    text.split('').forEach((letter, i) => {
      const span = document.createElement('span');
      span.dataset.letter = letter;
      span.style.setProperty('--data-index', i);
      span.textContent = letter;
      parent.appendChild(span);
    });
  });

const videoFix = document.querySelector(".videoFixBottom video");
if (videoFix) {
  document.querySelectorAll("[data-media]").forEach((li) => {
    li.addEventListener("mouseenter", () => {
      videoFix.src = li.getAttribute("data-media");
    });
    li.addEventListener("mouseleave", () => {
      videoFix.src = "";
    });
  });
}

const cta = document.querySelector(".hero__cta h4");
const main = document.querySelector("main");
const video = document.querySelector(".main__video");
const videoSection = document.querySelector("#video");

createProjects();
createBlogposts();

main.addEventListener("scroll", () => {
  animateVideo();
});

const headerLeft = document.querySelector(".text__header__left");
const headerRight = document.querySelector(".text__header__right");

function animateVideo() {
  if (!videoSection || !video || !headerLeft || !headerRight) return;
  let { bottom } = videoSection.getBoundingClientRect();
  let scale = 1 - (bottom - window.innerHeight) * 0.0005;
  scale = Math.max(0.2, Math.min(scale, 1));
  video.style.transform = `scale(${scale})`;

  let textTrans = Math.max(0, bottom - window.innerHeight);
  headerLeft.style.transform = `translateX(${-textTrans}px)`;
  headerRight.style.transform = `translateX(${textTrans}px)`;
}

const projectsSticky = document.querySelector(".projects__sticky");
const projectsSlider = document.querySelector(".projects__slider");

let projectTargetX = 0;
let projectCurrentX = 0;

const percentages = {
  small: 700,
  medium: 300,
  large: 100,
};

let limit =
  window.innerWidth <= 600
    ? percentages.small
    : window.innerWidth <= 1100
    ? percentages.medium
    : percentages.large;

function setLimit() {
  limit =
    window.innerWidth <= 600
      ? percentages.small
      : window.innerWidth <= 1100
      ? percentages.medium
      : percentages.large;
}
window.addEventListener("resize", setLimit);

function animateProjects() {
  if (!projectsSticky || !projectsSlider || !main) return;
  let offsetTop = projectsSticky.parentElement.offsetTop;
  let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100;
  percentage = Math.max(0, Math.min(percentage, limit));
  projectTargetX = percentage;
  projectCurrentX = lerp(projectCurrentX, projectTargetX, 0.1);
  projectsSlider.style.transform = `translate3d(${-projectCurrentX}vw, 0, 0)`;
}

const blogSection = document.getElementById("blog");
const blogPosts = [...document.querySelectorAll(".post")];

function scrollBlogPosts() {
  if (!blogSection || blogPosts.length === 0) return;
  let blogSectionTop = blogSection.getBoundingClientRect().top;
  for (let i = 0; i < blogPosts.length; i++) {
    const postParent = blogPosts[i].parentElement;
    if (!postParent) continue;
    if (postParent.getBoundingClientRect().top <= 1) {
      let offset = (blogSectionTop + window.innerHeight * (i + 1)) * 0.0005;
      offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;
      blogPosts[i].style.transform = `scale(${1 + offset})`;
    }
  }
}

const circleSection = document.getElementById("circle__section");
const circle = document.querySelector(".circle");

function scrollCircle() {
  if (!circleSection || !circle) return;
  let { top } = circleSection.getBoundingClientRect();
  let scaleTop = Math.abs(top);
  let scale = Math.max(0, Math.min(scaleTop / window.innerHeight, 1));
  circle.style.transform =
    top <= 0
      ? `translate(-50%, -50%) scale(${scale})`
      : `translate(-50%, -50%) scale(0)`;
}

const dContainer = document.querySelector(".discover__container");
const leftText = document.querySelector(".text__left");
const rightText = document.querySelector(".text__right");

function scrollDiscover() {
  if (!dContainer || !leftText || !rightText) return;
  let { bottom } = dContainer.getBoundingClientRect();
  let textTrans = Math.max(0, bottom - window.innerHeight);
  leftText.style.transform = `translateX(${-textTrans}px)`;
  rightText.style.transform = `translateX(${textTrans}px)`;
}

// Text reveal
const textReveals = [...document.querySelectorAll(".text__reveal")];

let revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        [...entry.target.querySelectorAll("span")].forEach((span, idx) => {
          setTimeout(() => {
            span.style.transform = `translateY(0)`;
          }, (idx + 1) * 50);
        });
        observer.unobserve(entry.target); // unobserve after reveal for efficiency
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.6,
  }
);

textReveals.forEach((text) => {
  const str = text.innerText;
  text.innerHTML = Array.from(str)
    .map((chr) => `<span>${chr}</span>`)
    .join("");
  revealObserver.observe(text);
});

// === About section: intersection observer animation for about p ===
const aboutContainer = document.querySelector("#about");
if (aboutContainer) {
  const aboutP = aboutContainer.querySelector("p");
  if (aboutP) {
    aboutP.style.opacity = "0";
    aboutP.style.transform = "translateY(40px)";
    aboutP.style.transition =
      "opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)";
    const aboutObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutP.style.opacity = "1";
            aboutP.style.transform = "translateY(0)";
            observer.disconnect(); // Use disconnect to stop observing all targets to avoid leaks
          }
        });
      },
      { threshold: 0.6 }
    );
    aboutObserver.observe(aboutContainer);
  }
}

function animate() {
  animateProjects();
  requestAnimationFrame(animate);
}

main.addEventListener("scroll", () => {
  scrollBlogPosts();
  scrollCircle();
  scrollDiscover();
});

animate();
