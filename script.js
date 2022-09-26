const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numbers = "01234567890123456789";
const symbols = "!@#$%^&*()>?/[]$%^#@&*";

const passwordResult = document.getElementById("password-result");
const copy = document.getElementById("copy");
const length = document.getElementById("length");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");
const generator = document.getElementById("generator");
const checkboxs = document.querySelectorAll("[type=checkbox]");

checkboxs.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    getPassword();
  });
});

generator.addEventListener("click", generatePassword);

function generatePassword() {
  const passwordLength = length.value;
  if (!passwordLength) {
    passwordResult.textContent = "Enter the length of the password";
  } else if (passwordLength <= 40 && passwordLength >= 6) {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      if (getPassword()) {
        password += getPassword();
      } else {
        password += notChecked();
      }
    }
    passwordResult.textContent = password;
  } else if (passwordLength < 6) {
    passwordResult.textContent = "Length must be atleast 6";
  } else {
    passwordResult.textContent = "Length must not be greaterthan 40";
  }
}

function notChecked() {
  let allChar = "";
  allChar += upperChars;
  allChar += lowerChars;
  allChar += numbers;
  allChar += symbols;
  return allChar[Math.floor(Math.random() * allChar.length)];
}

function getPassword() {
  let passwordArr = [];
  if (checked(upper)) {
    passwordArr.push(getUpper());
  }
  if (checked(lower)) {
    passwordArr.push(getLower());
  }
  if (checked(symbol)) {
    passwordArr.push(getSymbol());
  }
  if (checked(number)) {
    passwordArr.push(getNumber());
  }
  return passwordArr[Math.floor(Math.random() * passwordArr.length)];
}

function getUpper() {
  return upperChars[Math.floor(Math.random() * upperChars.length)];
}

function getLower() {
  return lowerChars[Math.floor(Math.random() * lowerChars.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function checked(item) {
  if (item.checked) return true;
  return false;
}

copy.addEventListener("click", () => {
  let password = passwordResult.innerText;
  let textarea = document.createElement("textarea");
  if (!password) return;
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
});
