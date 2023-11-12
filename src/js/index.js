const cells = document.querySelectorAll(".container-cell");
const info = document.querySelector(".info");
const restart = document.querySelector(".restart");

// Данные о местоположении крестиков и ноликов
// Сюда будет текст currentPlayer

let STATE = {
  gameData: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "Крестики",
  isPlayingNow: false,
};

// будем сравнивать по тексту currentPlayer
// три в ряд
const win = [
  // в строке
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // в столбце
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //   по диагонали
  [0, 4, 8],
  [6, 4, 2],
];

// Определяем начало игры
const LS = JSON.parse(localStorage.getItem("tic-tac-toe"));

cells.forEach((item) => item.removeEventListener("click", handleMove));

cells.forEach((item) => item.addEventListener("click", handleMove));
restart.addEventListener("click", restartGame);

if (LS) {
  STATE = LS;
  // Интерпретируем и рендерим стейт из LS
  if (
    STATE.isPlayingNow === false &&
    STATE.gameData.every((item) => item.length > 0)
  ) {
    info.textContent = "Ничья!";
  } else if (STATE.isPlayingNow === true) {
    info.textContent = `Ходят ${STATE.currentPlayer}`;
  } else {
    info.textContent = `${STATE.currentPlayer} победили!`;
  }
  updateImages();
} else {
  // Если в LS ничего нет, инициализируем первую игру
  gameInit();
}

function pushToLS(data) {
  localStorage.setItem("tic-tac-toe", JSON.stringify(data));
}

function gameInit() {
  STATE.isPlayingNow = true;
  info.textContent = `Ходят ${STATE.currentPlayer}`;
}

function handleMove() {
  //Выбираем id ячейки, который связан со STORE.gameData
  const cellIndex = this.id.split("-")[1];

  // Если крестик или нолик уже поставлен
  // Либо же игра окончена, то ничего делать не нужно
  if (STATE.gameData[Number(cellIndex)] || !STATE.isPlayingNow) return;

  // Обрабатываем пустую клетку, по которой кликнул игрок
  updateCellUI(this, cellIndex);
  // Проверяем, выиграл ли игрок
  checkWin();
}

function updateImages() {
  cells.forEach((item) => {
    const cellIndex = item.id.split("-")[1];
    if (STATE.gameData[Number(cellIndex)] === "Крестики") {
      const image = new Image();
      image.src = "/assets/x.svg";
      image.onload = () => item.append(image);
    } else if (STATE.gameData[Number(cellIndex)] === "Нолики") {
      const image = new Image();
      image.src = "/assets/o.svg";
      image.onload = () => item.append(image);
    } else return;
  });
}

function updateCellUI(cell, index) {
  const image = new Image();
  image.src =
    STATE.currentPlayer === "Крестики" ? "/assets/x.svg" : "/assets/o.svg";
  image.onload = () => cell.append(image);

  STATE.gameData[index] = STATE.currentPlayer;
}

function changePlayer() {
  STATE.currentPlayer =
    STATE.currentPlayer === "Крестики" ? "Нолики" : "Крестики";
  info.textContent = `Ходят ${STATE.currentPlayer}`;
}

function checkWin() {
  let flag = false;
  win.map((item) => {
    if (
      // Смотрим чтобы в одном подмассиве было три одинаковых значения
      item.every((element) => STATE.gameData[element] === STATE.currentPlayer)
    ) {
      // Если такой случай есть, переводим флаг
      flag = true;
    }
  });

  if (flag === true) {
    info.textContent = `${STATE.currentPlayer} победили!`;
    STATE.isPlayingNow = false;
  } else if (
    // Если все клетки заполнены и при этом никто не выиграл
    flag === false &&
    STATE.gameData.every((item) => item.length > 0)
  ) {
    info.textContent = `Ничья!`;
    STATE.isPlayingNow = false;
  } else {
    // Если не выиграл и не ничья, то передаём ход
    changePlayer();
  }
  // После каждого хода, вне зависимости выигрыш, ничья или просто ход
  // Пушим измененное состояние в LS
  pushToLS(STATE);
}

// Обнуляем все значения до начальных
function restartGame(e) {
  e.preventDefault();
  STATE.gameData.fill("");
  STATE.currentPlayer = 'Крестики'
  cells.forEach((item) => (item.innerHTML = ""));
  info.textContent = "Ходят Крестики";
  STATE.isPlayingNow = true;
  // И пушим это в LS
  pushToLS(STATE);
}
