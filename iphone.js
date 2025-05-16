// 简单的滚动触发动画：进入视野就显示
document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".time-block");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  blocks.forEach(block => {
    observer.observe(block);
  });
});