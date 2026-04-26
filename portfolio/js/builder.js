const fields = [
  "name", "role", "tagline", "about", "email", "phone", "location",
  "github", "linkedin", "skills", "education",
  "project1Title", "project1Desc", "project1Image",
  "project2Title", "project2Desc", "project2Image",
  "project3Title", "project3Desc", "project3Image",
  "contactIntro"
];

const profileImageInput = document.getElementById("profileImage");
let currentProfileImage = localStorage.getItem("portfolioProfileImage") || "";

function collectFormData() {
  const data = {};
  fields.forEach(field => {
    const element = document.getElementById(field);
    data[field] = element ? element.value : "";
  });
  data.profileImage = currentProfileImage;
  return data;
}

function renderMiniSkills(skillsText) {
  const previewSkills = document.getElementById("previewSkills");
  previewSkills.innerHTML = "";
  const skills = skillsText.split(",");
  skills.forEach(skill => {
    const label = skill.split(":")[0]?.trim();
    if (label) {
      const chip = document.createElement("span");
      chip.className = "mini-skill-chip";
      chip.innerText = label;
      previewSkills.appendChild(chip);
    }
  });
}

function updateMiniPreview() {
  document.getElementById("previewName").innerText = document.getElementById("name").value;
  document.getElementById("previewRole").innerText = document.getElementById("role").value;
  document.getElementById("previewTagline").innerText = document.getElementById("tagline").value;

  document.getElementById("previewProjects").innerHTML = `
    <li>${document.getElementById("project1Title").value}</li>
    <li>${document.getElementById("project2Title").value}</li>
    <li>${document.getElementById("project3Title").value}</li>
  `;

  renderMiniSkills(document.getElementById("skills").value);

  const imageEl = document.getElementById("miniProfileImage");
  if (currentProfileImage) {
    imageEl.src = currentProfileImage;
  }
}

function savePortfolio() {
  const data = collectFormData();
  setPortfolioData(data);
  alert("Portfolio data saved successfully.");
}

function loadPortfolio() {
  const data = getPortfolioData();
  if (!data) {
    alert("No saved portfolio data found.");
    return;
  }

  fields.forEach(field => {
    const element = document.getElementById(field);
    if (element && data[field] !== undefined) {
      element.value = data[field];
    }
  });

  currentProfileImage = data.profileImage || localStorage.getItem("portfolioProfileImage") || "";
  if (currentProfileImage) {
    document.getElementById("miniProfileImage").src = currentProfileImage;
  }

  updateMiniPreview();
  alert("Portfolio data loaded successfully.");
}

function clearPortfolio() {
  localStorage.removeItem("portfolioData");
  localStorage.removeItem("portfolioProfileImage");
  currentProfileImage = "";
  alert("Saved portfolio data cleared.");
}

function goToPreview() {
  savePortfolio();
  window.location.href = "preview.html";
}

if (profileImageInput) {
  profileImageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      currentProfileImage = e.target.result;
      localStorage.setItem("portfolioProfileImage", currentProfileImage);
      document.getElementById("miniProfileImage").src = currentProfileImage;
    };
    reader.readAsDataURL(file);
  });
}

fields.forEach(field => {
  const element = document.getElementById(field);
  if (element) {
    element.addEventListener("input", updateMiniPreview);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const savedData = getPortfolioData();
  if (savedData) {
    fields.forEach(field => {
      const element = document.getElementById(field);
      if (element && savedData[field] !== undefined) {
        element.value = savedData[field];
      }
    });
    currentProfileImage = savedData.profileImage || localStorage.getItem("portfolioProfileImage") || "";
  }

  if (currentProfileImage) {
    document.getElementById("miniProfileImage").src = currentProfileImage;
  }

  updateMiniPreview();
});