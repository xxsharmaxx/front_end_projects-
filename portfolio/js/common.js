function applySavedTheme() {
  const body = document.getElementById("pageBody");
  if (!body) return;
  const savedTheme = localStorage.getItem("portfolioTheme") || "theme-dark";
  body.className = savedTheme;
}

function toggleTheme() {
  const body = document.getElementById("pageBody");
  if (!body) return;

  if (body.classList.contains("theme-dark")) {
    body.className = "theme-light";
    localStorage.setItem("portfolioTheme", "theme-light");
  } else if (body.classList.contains("theme-light")) {
    body.className = "theme-purple";
    localStorage.setItem("portfolioTheme", "theme-purple");
  } else {
    body.className = "theme-dark";
    localStorage.setItem("portfolioTheme", "theme-dark");
  }
}

window.addEventListener("DOMContentLoaded", applySavedTheme);