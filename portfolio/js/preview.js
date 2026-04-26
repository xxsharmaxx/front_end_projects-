function createSkillItem(name, percent) {
  return `
    <div class="glass skill-item">
      <div class="skill-top">
        <span>${name}</span>
        <span>${percent}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-width="${percent}%"></div>
      </div>
    </div>
  `;
}

function animateSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");
  setTimeout(() => {
    fills.forEach(fill => {
      fill.style.width = fill.getAttribute("data-width");
    });
  }, 200);
}

function createProjectCard(title, desc, image) {
  return `
    <div class="project-card glass">
      <img src="${image}" alt="${title}" class="project-image" />
      <div class="project-content">
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    </div>
  `;
}

function goToFinalPortfolio() {
  window.location.href = "portfolio.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const data = getPortfolioData();

  if (!data) {
    alert("No portfolio data found. Please fill the builder first.");
    return;
  }

  document.getElementById("pageBody").className = localStorage.getItem("portfolioTheme") || "theme-dark";

  document.getElementById("outName").innerText = data.name || "";
  document.getElementById("outRole").innerText = data.role || "";
  document.getElementById("outTagline").innerText = data.tagline || "";
  document.getElementById("outAbout").innerText = data.about || "";
  document.getElementById("outEmail").innerText = data.email || "";
  document.getElementById("outPhone").innerText = data.phone || "";
  document.getElementById("outLocation").innerText = data.location || "";
  document.getElementById("outEducation").innerText = data.education || "";

  document.getElementById("outGithub").href = data.github || "#";
  document.getElementById("outLinkedin").href = data.linkedin || "#";

  if (data.profileImage) {
    document.getElementById("outProfileImage").src = data.profileImage;
  }

  const skillsContainer = document.getElementById("skillsContainer");
  skillsContainer.innerHTML = "";

  const skillPairs = (data.skills || "").split(",");
  skillPairs.forEach(item => {
    const parts = item.split(":");
    const skillName = parts[0] ? parts[0].trim() : "";
    const percent = parts[1] ? parseInt(parts[1].trim()) : 70;
    if (skillName) {
      skillsContainer.innerHTML += createSkillItem(skillName, percent);
    }
  });

  document.getElementById("projectsContainer").innerHTML = `
    ${createProjectCard(data.project1Title, data.project1Desc, data.project1Image)}
    ${createProjectCard(data.project2Title, data.project2Desc, data.project2Image)}
    ${createProjectCard(data.project3Title, data.project3Desc, data.project3Image)}
  `;

  const githubUsername = extractGithubUsername(data.github);
  if (githubUsername) {
    document.getElementById("githubStats").src =
      `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true`;
  }

  animateSkillBars();
});