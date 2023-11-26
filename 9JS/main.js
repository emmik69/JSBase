document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.start-btn');
  const endBtn = document.querySelector('.end-game-btn');
  const newGmeBtn = document.querySelector('.new-game-btn');
  const mainContainer = document.querySelector('.main-container');
  const gameWindow = document.querySelector('.game');
  const winGameWindow = document.querySelector('.win-game');

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function showCard(e) {
    const firstCard = e.target.closest('.game__block');
    if (count >= 2) {
      return;
    }

    count += 1;
    if (firstCard.classList.contains('showCard')) {
      firstCard.classList.remove('showCard');
      count = 0;
      secondCard = 0;
      data = -1;
    } else {
      firstCard.classList.add('showCard');
    }

    if (count === 2) {
      if (data === firstCard.textContent) {
        countPair += 1;
        firstCard.removeEventListener('click', showCard);
        secondCard.removeEventListener('click', showCard);
      } else {
        await delay(700);
        firstCard.classList.remove('showCard');
        secondCard.classList.remove('showCard');
      }
      count = 0;
    } else if (count === 1) {
      secondCard = firstCard;
      data = firstCard.textContent;
    }
    if (countPair === 8) {
      winGameWindow.style.display = 'flex';
      newGmeBtn.addEventListener('click', newGame);
    }
  }

  function createCard(number) {
    let block = document.createElement('div');
    let blockContent = document.createElement('div');
    block.className = 'game__block';
    blockContent.className = 'content';
    let text = document.createTextNode(number);
    blockContent.appendChild(text);
    block.appendChild(blockContent);
    gameWindow.appendChild(block);
  }

  function shuffleList(list) {
    list.sort(() => Math.random() - 0.5);
    return list;
  }

  function pairsNumbers() {
    let listNumbers = [];
    while (listNumbers.length < 16) {
      let number = Math.round(Math.random() * 8) + 1;
      if (!listNumbers.includes(number)) {
        listNumbers.push(number, number);
      }
    }
    return shuffleList(listNumbers);
  }

  function showGame() {
    countPair = 0;
    startBtn.style.display = 'none';
    mainContainer.style.display = 'flex';
    let shuffList = pairsNumbers();
    shuffList.map((el) => createCard(el));
    const cards = document.querySelectorAll('.game__block');
    cards.forEach((el) => el.addEventListener('click', showCard));
  }

  function endGame() {
    mainContainer.style.display = 'none';
    gameWindow.innerHTML = '';
    startBtn.style.display = 'block';
  }

  function newGame() {
    countPair = 0;
    gameWindow.innerHTML = '';
    winGameWindow.style.display = 'none';
    let shuffList = pairsNumbers();
    shuffList.map((el) => createCard(el));
    const cards = document.querySelectorAll('.game__block');
    cards.forEach((el) => el.addEventListener('click', showCard));
  }

  startBtn.addEventListener('click', showGame);
  endBtn.addEventListener('click', endGame);
  let count = 0;
  let data = -1;
  let secondCard = 0;
  let countPair = 0;

  CSS.registerProperty({
    name: '--gradientColor1',
    syntax: '<color>',
    inherits: true,
    initialValue: '#09ec3a',
  });

  CSS.registerProperty({
    name: '--gradientColor2',
    syntax: '<color>',
    inherits: true,
    initialValue: '#040c27',
  });

  CSS.registerProperty({
    name: '--gradientColor3',
    syntax: '<color>',
    inherits: true,
    initialValue: '#37a5ee',
  });
});
