const themes = ["defaultMode", "lightMode"]; // add more themes here

function applyTheme(theme) {
  themes.forEach(t => document.body.classList.remove(t));
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  console.log(savedTheme);
  applyTheme(savedTheme);
}

loadSavedTheme();
  