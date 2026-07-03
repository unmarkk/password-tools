const passwordInput = document.getElementById("passwordInput");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const feedbackList = document.getElementById("feedbackList");

const lengthInput = document.getElementById("lengthInput");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numbersCheck = document.getElementById("numbersCheck");
const symbolsCheck = document.getElementById("symbolsCheck");
const generateBtn = document.getElementById("generateBtn");
const generatedPassword = document.getElementById("generatedPassword");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

passwordInput.addEventListener("input", checkPasswordStrength);
togglePasswordBtn.addEventListener("click", togglePasswordVisibility);
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyGeneratedPassword);

function checkPasswordStrength() {
  const password = passwordInput.value;
  let score = 0;
  const feedback = [];

  if (password.length >= 12) {
    score++;
  } else {
    feedback.push("Use at least 12 characters.");
  }

  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push("Add lowercase letters.");
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push("Add uppercase letters.");
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    feedback.push("Add numbers.");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  } else {
    feedback.push("Add symbols.");
  }

  updateStrengthDisplay(score, feedback);
}

function updateStrengthDisplay(score, feedback) {
  let strength = "Very weak";
  let width = "20%";
  let color = "#ef4444";

  if (score === 0) {
    strength = "Very weak";
    width = "10%";
    color = "#ef4444";
  } else if (score <= 2) {
    strength = "Weak";
    width = "35%";
    color = "#f97316";
  } else if (score === 3) {
    strength = "Medium";
    width = "60%";
    color = "#eab308";
  } else if (score === 4) {
    strength = "Strong";
    width = "80%";
    color = "#22c55e";
  } else {
    strength = "Very strong";
    width = "100%";
    color = "#10b981";
  }

  strengthBar.style.width = width;
  strengthBar.style.background = color;
  strengthText.textContent = `Strength: ${strength}`;

  feedbackList.innerHTML = "";

  feedback.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    feedbackList.appendChild(li);
  });
}

function togglePasswordVisibility() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordBtn.textContent = "Hide password";
  } else {
    passwordInput.type = "password";
    togglePasswordBtn.textContent = "Show password";
  }
}

function generatePassword() {
  const length = Number(lengthInput.value);

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let characters = "";

  if (uppercaseCheck.checked) characters += uppercase;
  if (lowercaseCheck.checked) characters += lowercase;
  if (numbersCheck.checked) characters += numbers;
  if (symbolsCheck.checked) characters += symbols;

  if (characters.length === 0) {
    generatedPassword.value = "Select at least one option.";
    return;
  }

  if (length < 8 || length > 64) {
    generatedPassword.value = "Choose a length from 8 to 64.";
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = getSecureRandomNumber(characters.length);
    password += characters[randomIndex];
  }

  generatedPassword.value = password;
  passwordInput.value = password;
  checkPasswordStrength();

  copyMessage.textContent = "";
}

function getSecureRandomNumber(max) {
  const randomArray = new Uint32Array(1);
  crypto.getRandomValues(randomArray);
  return randomArray[0] % max;
}

async function copyGeneratedPassword() {
  if (!generatedPassword.value) {
    copyMessage.textContent = "Generate a password first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(generatedPassword.value);
    copyMessage.textContent = "Copied!";
  } catch (error) {
    copyMessage.textContent = "Could not copy password.";
  }
}
