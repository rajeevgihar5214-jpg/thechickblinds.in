document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item, index) => {
    const question = item.querySelector("h3");
    const answer = item.querySelector("p");

    if (!question || !answer) return;

    question.style.cursor = "pointer";
    question.style.userSelect = "none";

    if (index !== 0) {
      answer.style.display = "none";
    } else {
      item.classList.add("active");
    }

    question.addEventListener("click", function () {
      const isOpen = answer.style.display === "block";

      faqItems.forEach((otherItem) => {
        const otherAnswer = otherItem.querySelector("p");
        if (otherAnswer) {
          otherAnswer.style.display = "none";
        }
        otherItem.classList.remove("active");
      });

      if (!isOpen) {
        answer.style.display = "block";
        item.classList.add("active");
      }
    });
  });

  const heroRight = document.querySelector(".hero-right");
  const card1 = document.querySelector(".card-1");
  const card2 = document.querySelector(".card-2");
  const floatingBox = document.querySelector(".floating-box");

  if (heroRight && card1 && card2 && floatingBox) {
    heroRight.addEventListener("mousemove", function (e) {
      const rect = heroRight.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

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
    ".product-card, .faq-item, .stat-box, .inspection-box, .cta-box, .hero-left, .hero-right"
  );

  animatedItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.7s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
});
