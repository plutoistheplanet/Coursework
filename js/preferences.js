const themes = ["defaultMode", "lightMode"]; // add more themes here

function applyTheme(theme) {
  // Remove all known themes
  themes.forEach(t => document.body.classList.remove(t));
  // Apply the selected theme
  document.body.classList.add(theme);
  // Save it
  localStorage.setItem("theme", theme);
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  console.log(savedTheme);
  if (themes.includes(savedTheme)) {
    applyTheme(savedTheme);
  } else {
    applyTheme("defaultMode"); // default theme
  }
}

loadSavedTheme();
  