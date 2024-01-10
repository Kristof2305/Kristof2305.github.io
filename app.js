const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const words = [
  "JAVASCRIPT",
  "PROGRAMMING",
  "HANGMAN",
  "DEVELOPER",
  "CODING",
  "COMPUTER",
  "ALGORITHM",
  "WEB",
  "HTML",
  "CSS",
  "PYTHON",
  "FUNCTION",
  "ARRAY",
  "VARIABLE",
  "LOOP",
  "CONDITIONAL",
  "SOFTWARE",
  "ENGINEER",
  "DEBUGGING",
  "INTERFACE",
  "BACKEND",
  "FRONTEND",
  "DATABASE",
  "RESPONSIVE",
  "ASYNCHRONOUS",
  "OBJECT",
  "ORIENTED",
  "INHERITANCE",
  "PROTOTYPE",
  "NODE",
  "EXPRESS",
  "REACT",
  "ANGULAR",
  "VUE",
  "TYPESCRIPT",
  "FRAMEWORK",
  "LIBRARY",
  "REPOSITORY",
  "GIT",
  "VERSION",
  "CONTROL",
  "DEBUGGER",
  "CONSOLE",
  "RESPONSIVE",
  "MOBILE",
  "DESKTOP",
  "RESPONSIVE",
  "SERVER",
  "CLIENT",
  "AUTHENTICATION",
  "AUTHORIZATION",
  "MIDDLEWARE",
  "DEPLOYMENT",
  "TESTING",
  "UNIT",
  "INTEGRATION",
  "END-TO-END",
  "DEBUG",
  "ERROR",
  "EXCEPTION",
  "VARIABLE",
  "CONSTANT",
  "PARAMETER",
  "ARGUMENT",
  "RETURN",
  "PROMISE",
  "CALLBACK",
  "EVENT",
  "LISTENER",
  "ANIMATION",
  "TEMPLATE",
  "COMPONENT",
  "STATE",
  "PROPS",
  "ROUTER",
  "REDUX",
  "STATE",
  "MANAGEMENT",
  "VIRTUAL",
  "DOM",
  "API",
  "ENDPOINT",
  "REQUEST",
  "RESPONSE",
  "STATUS",
  "CODE",
  "AUTHENTICATION",
  "ENCRYPTION",
  "DECRYPTION",
  "SECURITY",
  "VULNERABILITY",
  "PATCH",
  "UPDATE",
  "RELEASE",
  "PATCH",
  "BUG",
  "FEATURE",
  "ITERATION",
  "INCREMENTAL",
  "AGILE",
  "SCRUM",
  "KANBAN",
  "SPRINT",
  "USER",
  "STORY",
  "PRODUCT",
  "OWNER",
  "STAKEHOLDER",
  "BACKLOG",
  "REPOSITORY",
  "MERGE",
];

const body = document.querySelector("body");
const letterArea = document.querySelector(".letters");
const secretWordUI = document.querySelector(".secret-word");
const hangmanImg = document.querySelector(".hangman-image");
let letterHolders = document.querySelectorAll('.letter-holder');
let mistake = 0;
let secretWord = "";
const images = [];

//selecting the secret word
function generateRandomNumber(array) {
  return Math.floor(Math.random() * array.length);
}

function updateImg() {
  hangmanImg.setAttribute("src", images[mistake]);
}

function gameReset() {
  secretWord = words[generateRandomNumber(words)];
  secretWordUI.textContent = '';

  letterHolders = document.querySelectorAll('.letter-holder');
  letterHolders.forEach((element) =>{
    element.style.backgroundColor='#9381ff';
    element.classList.remove('clicked');
  })
  // secretword UI starting position
  for (let i = 0; i < secretWord.length - 1; i++) {
    secretWordUI.textContent += "_ ";
  }
  secretWordUI.textContent += "_";
  //mistake for endgame
  mistake = 0;
}

function imagesIntoArray() {
  // images into array
  for (let i = 0; i < 10; i++) {
    const imageUrl = `./assets/${i}.png`;
    images.push(imageUrl);
  }
}

function game() {
  // letters UI
  alphabet.forEach((element) => {
    const letterHolder = document.createElement("div");
    const letter = document.createElement("span");
    letter.textContent = element;
    letterHolder.classList.add("letter-holder");
    letter.classList.add("letter");

    letterHolder.addEventListener("click", (e) => {
      if (secretWord.includes(letter.textContent)) {
        letterHolder.style.backgroundColor = "green";
        letterHolder.classList.add("clicked");
        for (let i = 0; i < secretWord.length; i++) {
          if (String(secretWord[i]) === String(letter.textContent)) {
            let secretWordArray = secretWordUI.textContent.split("");
            secretWordArray[i * 2] = letter.textContent;
            if (!i === secretWordArray.length - 1) {
              secretWordArray[i + 2] = " ";
            }
            secretWordUI.textContent = secretWordArray.join("");
            if (!secretWordArray.includes('_')) {
                alert('You win! Congratulation!');
                gameReset();
            }
          }
        }
      } else {
        letterHolder.style.backgroundColor = "red";
        if (!letterHolder.classList.contains("clicked")) {
          if (mistake < 9) {
            mistake++;
          }
          else {
            alert(`You lost! The word was ${secretWord}`);
            gameReset();
          }
          updateImg();
        }
        letterHolder.classList.add("clicked");
      }
    });

    letterHolder.append(letter);
    letterArea.append(letterHolder);
  });
}

imagesIntoArray();
gameReset();
game();
