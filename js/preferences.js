const themes = ["greenBlack", "blueBlack", "BlueWhite"]; // add more themes here

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
  if (themes.includes(savedTheme)) {
    applyTheme(savedTheme);
  } else {
    applyTheme("greenBlack"); // default theme
  }
}

// Optional: cycle through themes
function cycleTheme() {
  const current = localStorage.getItem("theme") || "greenBlack";
  const index = themes.indexOf(current);
  const nextTheme = themes[(index + 1) % themes.length];
  applyTheme(nextTheme);
}

loadSavedTheme();

  