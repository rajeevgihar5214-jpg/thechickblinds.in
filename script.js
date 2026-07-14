document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  document.querySelectorAll("#faq .faq-list").forEach(function (faqList) {
    const faqItems = faqList.querySelectorAll(":scope > .faq-item");

    faqItems.forEach(function (item, index) {
      const question = item.querySelector("h3");
      const answer = item.querySelector("p");
      if (!question || !answer) return;

      question.style.cursor = "pointer";
      question.style.userSelect = "none";
      question.setAttribute("tabindex", "0");
      question.setAttribute("role", "button");

      const setOpen = function (open) {
        answer.style.display = open ? "block" : "none";
        item.classList.toggle("active", open);
        question.setAttribute("aria-expanded", open ? "true" : "false");
      };

      setOpen(index === 0);

      const toggle = function () {
        const currentlyOpen = question.getAttribute("aria-expanded") === "true";
        faqItems.forEach(function (otherItem) {
          const otherQuestion = otherItem.querySelector("h3");
          const otherAnswer = otherItem.querySelector("p");
          if (otherQuestion && otherAnswer) {
            otherAnswer.style.display = "none";
            otherItem.classList.remove("active");
            otherQuestion.setAttribute("aria-expanded", "false");
          }
        });
        if (!currentlyOpen) setOpen(true);
      };

      question.addEventListener("click", toggle);
      question.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });
  });

  const heroRight = document.querySelector(".hero-right");
  const card1 = document.querySelector(".card-1");
  const card2 = document.querySelector(".card-2");
  const floatingBox = document.querySelector(".floating-box");

  if (heroRight && card1 && card2 && floatingBox) {
    heroRight.addEventListener("mousemove", function (event) {
      const rect = heroRight.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const moveX = (x / rect.width - 0.5) * 20;
      const moveY = (y / rect.height - 0.5) * 20;
      card1.style.transform = `rotate(-7deg) translate(${moveX * 0.6}px, ${moveY * 0.6}px)`;
      card2.style.transform = `rotate(8deg) translate(${moveX * -0.7}px, ${moveY * -0.7}px)`;
      floatingBox.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    });
    heroRight.addEventListener("mouseleave", function () {
      card1.style.transform = "rotate(-7deg) translate(0, 0)";
      card2.style.transform = "rotate(8deg) translate(0, 0)";
      floatingBox.style.transform = "translate(0, 0)";
    });
  }

  const animatedItems = document.querySelectorAll(
    ".product-card, .faq-item, .stat-box, .inspection-box, .cta-box, .hero-left, .hero-right, .site-location-links"
  );

  if (!("IntersectionObserver" in window)) {
    animatedItems.forEach(function (item) {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });
    return;
  }

  animatedItems.forEach(function (item) {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.7s ease";
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedItems.forEach(function (item) { observer.observe(item); });
});
