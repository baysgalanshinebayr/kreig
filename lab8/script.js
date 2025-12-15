const questions = [
  'Хамгийн том амьтан?',
  'Хамгийн хурдан тээврийн хэрэгсэл?',
  'Монголын нийслэл?',
  'Хамгийн өндөр уул?',
  'Махчин амьтан?',
  'Далайн амьтан?',
  'Агаар мандлын хурдасгалалттай төхөөрөмж?'
];

const answers = [
  'СҮЛД',
  'ЖЕТ',
  'УЛААНБААТАР',
  'ХУВАНЦАР',
  'ЧОНГОР',
  'ЗАГАС',
  'РИКША'
];

let selectedWord = '';
let displayWord = [];
let wrong = 0;
let score = 0;
let time = 60;
let timer;

const maxWrong = 6;

const hangman = [
` 
 +---+
 |   |
     |
     |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
     |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
 |   |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
/|   |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
/|\\  |
     |
     |
=========`,
`
 +---+
 |   |
 O   |
/|\\  |
/    |
     |
=========`,
`
 +---+
 |   |
 O   |
/|\\  |
/ \\  |
     |
=========`
];

const mongolLetters = [
  'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','Ө','П','Р','С','Т','У','Ү','Ф','Х','Ц','Ч','Ш','Щ','Ы','Э','Ю','Я'
];

document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
  clearInterval(timer);
  wrong = 0;
  time = 60;

  document.getElementById('result').textContent = '';
  document.getElementById('time').textContent = time;

  const index = Math.floor(Math.random() * questions.length);
  selectedWord = answers[index].toUpperCase();
  displayWord = Array(selectedWord.length).fill('_');

  document.getElementById('question').textContent = questions[index];
  updateWord();
  createLetters();
  updateHangman();
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    document.getElementById('time').textContent = time;

    if (time === 0) {
      endGame(false);
    }
  }, 1000);
}

function updateWord() {
  document.getElementById('word').textContent = displayWord.join(' ');
}

function createLetters() {
  const div = document.getElementById('letters');
  div.innerHTML = '';

  mongolLetters.forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.onclick = () => guess(btn);
    div.appendChild(btn);
  });
}

function guess(btn) {
  btn.disabled = true;
  const letter = btn.textContent;
  let found = false;

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      displayWord[i] = letter;
      found = true;
      score += 10;
    }
  }

  if (!found) {
    wrong++;
    score -= 5;
    updateHangman();
  }

  document.getElementById('score').textContent = score;
  updateWord();
  checkStatus();
}

function updateHangman() {
  document.getElementById('hangman').textContent = hangman[wrong];
}

function checkStatus() {
  if (!displayWord.includes('_')) {
    endGame(true);
  }

  if (wrong === maxWrong) {
    endGame(false);
  }
}

function endGame(win) {
  clearInterval(timer);
  disableButtons();

  if (win) {
    document.getElementById('result').textContent = 'ТА ЯЛСАН!';
    score += 50;
  } else {
    document.getElementById('result').textContent =
      'ТОГЛООМ ДУУСЛАА | Зөв хариулт: ' + selectedWord;
  }

  document.getElementById('score').textContent = score;
}

function disableButtons() {
  document.querySelectorAll('#letters button')
    .forEach(b => b.disabled = true);
}

