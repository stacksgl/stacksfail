// thanks https://t.me/uvxsq / https://github.com/boing1337 for help with js
// passwords
const generatePassword = () => {
  const lengthInput = document.querySelector('#passwordLength');
  const includeLettersInput = document.querySelector('#passwordIncludeLetters');
  const includeDigitsInput = document.querySelector('#passwordIncludeDigits');
  const includeSymbolsInput = document.querySelector('#passwordIncludeSymbols');
  const pismena = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const cisla = '0123456789';
  const symboly = '!@#$%^&*()_-+={}[];\',.<>/?ß<>Ł';
  let charset = '';
  
  if (includeLettersInput.checked) 
  {
    charset += pismena;
  }
  if (includeDigitsInput.checked) 
  {
    charset += cisla;
  }
  if (includeSymbolsInput.checked) 
  {
    charset += symboly;
  }
  
  const passwordLength = parseInt(lengthInput.value);
  let password = '';
  
  for (let i = 0; i < passwordLength; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    let randomChar = charset.charAt(randomIndex);
    password = password + randomChar;
}

  
  document.querySelector('#passwordOUT').value = password;
};

// copy pass
const copyPassword = () => {
  const passwordInput = document.querySelector('#passwordOUT');
  const password = passwordInput.value;
  
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    }
    );
  }
};

// evnt listeners
const generatePasswordBtn = document.querySelector('#generatePasswordBtn');
generatePasswordBtn.addEventListener('click', generatePassword);

const copyPasswordBtn = document.querySelector('#copyPasswordBtn');
copyPasswordBtn.addEventListener('click', copyPassword);



// usernames 
function getWordList(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => text.split('\n').filter(word => word.length > 0));
}

async function generateUsername() {
  const type = document.getElementById('usernameType').value;
  let wordList;
  
  if (type === 'noun') {
    wordList = await getWordList('https://raw.githubusercontent.com/david47k/top-english-wordlists/master/top_english_nouns_lower_10000.txt');
  } else if (type === 'adjective') {
    wordList = await getWordList('https://raw.githubusercontent.com/david47k/top-english-wordlists/master/top_english_adjs_mixed_10000.txt');
  } else if (type === 'noun+number') {
    wordList = await getWordList('https://raw.githubusercontent.com/david47k/top-english-wordlists/master/top_english_nouns_lower_10000.txt');
  } else if (type === 'adjective+number') {
    wordList = await getWordList('https://raw.githubusercontent.com/david47k/top-english-wordlists/master/top_english_adjs_mixed_10000.txt');
  }
  
  let username = '';
  
  if (type === 'noun' || type === 'adjective') {
    username += wordList[Math.floor(Math.random() * wordList.length)];
  } else if (type === 'noun+number' || type === 'adjective+number') {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const number = Math.floor(Math.random() * 100);
    username += word + number;
  }
  
  document.getElementById('usernameOUT').value = username;
}

function copyUsername() {
  const username = document.getElementById('usernameOUT').value;
  if (username) {
    navigator.clipboard.writeText(username).then(() => {
      alert('Username copied');
    });
  }
}

document.getElementById('generateUsernameBtn').addEventListener('click', generateUsername);
document.getElementById('copyUsernameBtn').addEventListener('click', copyUsername);
