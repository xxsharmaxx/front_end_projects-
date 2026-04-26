function getPortfolioData() {
  const data = localStorage.getItem("portfolioData");
  return data ? JSON.parse(data) : null;
}

function setPortfolioData(data) {
  localStorage.setItem("portfolioData", JSON.stringify(data));
}

function extractGithubUsername(url) {
  if (!url) return "";
  const cleaned = url.trim().replace(/\/+$/, "");
  const parts = cleaned.split("/");
  return parts[parts.length - 1] || "";
}