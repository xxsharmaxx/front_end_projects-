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

function animateSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");
  setTimeout(() => {
    fills.forEach(fill => {
      fill.style.width = fill.getAttribute("data-width");
    });
  }, 200);
}

window.addEventListener("DOMContentLoaded", () => {
  const data = getPortfolioData();

  if (!data) {
    alert("No portfolio data found. Please fill the builder first.");
    return;
  }

  document.getElementById("pageBody").className = localStorage.getItem("portfolioTheme") || "theme-dark";

  document.getElementById("finalName").innerText = data.name || "";
  document.getElementById("finalRole").innerText = data.role || "";
  document.getElementById("finalTagline").innerText = data.tagline || "";
  document.getElementById("finalAbout").innerText = data.about || "";
  document.getElementById("finalEmail").innerText = data.email || "";
  document.getElementById("finalPhone").innerText = data.phone || "";
  document.getElementById("finalLocation").innerText = data.location || "";
  document.getElementById("finalEducation").innerText = data.education || "";
  document.getElementById("contactIntroText").innerText = data.contactIntro || "";

  document.getElementById("finalGithub").href = data.github || "#";
  document.getElementById("finalLinkedin").href = data.linkedin || "#";

  if (data.profileImage) {
    document.getElementById("finalProfileImage").src = data.profileImage;
  }

  const skillsContainer = document.getElementById("finalSkillsContainer");
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

  document.getElementById("finalProjectsContainer").innerHTML = `
    ${createProjectCard(data.project1Title, data.project1Desc, data.project1Image)}
    ${createProjectCard(data.project2Title, data.project2Desc, data.project2Image)}
    ${createProjectCard(data.project3Title, data.project3Desc, data.project3Image)}
  `;

  const githubUsername = extractGithubUsername(data.github);
  if (githubUsername) {
    document.getElementById("finalGithubStats").src =
      `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true`;
  }

  animateSkillBars();

  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const visitorName = document.getElementById("visitorName").value;
    const visitorEmail = document.getElementById("visitorEmail").value;
    const visitorMessage = document.getElementById("visitorMessage").value;

    const subject = encodeURIComponent(`Portfolio Contact from ${visitorName}`);
    const body = encodeURIComponent(
      `Name: ${visitorName}\nEmail: ${visitorEmail}\n\nMessage:\n${visitorMessage}`
    );

    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
  });
});