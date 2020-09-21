this.winnerCont = document.querySelector(".wrapper-winner");
this.wrapperBoard = document.querySelector(".wrapper-board");

function UI(wrapperBoard, wrapperWinner) {
  this.winnerCont = wrapperWinner;
  this.wrapperBoard = wrapperBoard;
  this.calculateClassNameBox = function calculateClassNameBox(indexBox) {
    let className = "wrapper-board__box";
    if (Number(indexBox) === 0 || Number(indexBox) === 3)
      className =
        "wrapper-board__box wrapper-board__box--border-right wrapper-board__box--border-bottom";
    if (Number(indexBox) === 1 || Number(indexBox) === 4)
      className = "wrapper-board__box wrapper-board__box--border-bottom";
    if (Number(indexBox) === 2 || Number(indexBox) === 5)
      className =
        "wrapper-board__box wrapper-board__box--border-left wrapper-board__box--border-bottom";
    if (Number(indexBox) === 6)
      className = "wrapper-board__box wrapper-board__box--border-right ";
    if (Number(indexBox) === 8)
      className = "wrapper-board__box wrapper-board__box--border-left";
    return className;
  };
  this.renderBoard = function renderBoard(currentDataBoard) {
    currentDataBoard.forEach((dataBox, i) => {
      const boxElement = this.createDomElement(
        "div",
        dataBox,
        [{ name: "data-position", value: i }],
        this.calculateClassNameBox(i)
      );
      this.wrapperBoard.appendChild(boxElement);
    });
  };
  this.createDomElement = function createDomElement(
    tag,
    content,
    attributes = [],
    className
  ) {
    const element = document.createElement(tag);
    element.textContent = content;
    element.className = className;
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value);
    });
    return element;
  };
  this.renderResult = function renderWinner(
    currentDataBoard,
    handleClick,
    turn = "",
    type
  ) {
    this.wrapperBoard.removeEventListener("click", handleClick);

    const button = this.createDomElement(
      "button",
      type.textButton,
      [],
      "wrapper-winner__button"
    );
    button.addEventListener("click", () => {
      this.clearContentWrapper(this.wrapperBoard);
      this.renderBoard(currentDataBoard);
      this.clearContentWrapper(this.winnerCont);
      this.winnerCont.style.opacity = 1;
      this.wrapperBoard.addEventListener("click", handleClick);
    });
    this.winnerCont.appendChild(
      this.createDomElement(
        "h2",
        type.message + turn,
        [],
        "wrapper-winner__texto"
      )
    );
    this.winnerCont.appendChild(button);
  };
  this.winnerCont.style.opacity = 1;
  this.clearContentWrapper = function clearWrapper(wrapper) {
    wrapper.innerHTML = "";
  };
}

function Game(UI) {
  this.currentDataBoard = ["", "", "", "", "", "", "", "", ""];
  this.turn = "";
  this.UI = UI;
  this.handleClick = (event) => {
    const box = event.target;
    const position = Number(box.getAttribute("data-position"));
    this.changeValueBox(this.turn, position);
    this.UI.clearContentWrapper(this.UI.wrapperBoard);
    this.UI.renderBoard(this.currentDataBoard);
    if (this.checkDraw()) {
      this.resetBoard();
      this.UI.renderResult(this.currentDataBoard, this.handleClick, "", {
        message: "Empate!!",
        textButton: "Reiniciar",
      });
    }
    if (this.checkWinner()) {
      this.resetBoard();
      this.UI.renderResult(this.currentDataBoard, this.handleClick, this.turn, {
        message: "HA GANADO ",
        textButton: "Reiniciar",
      });
    }
    this.turn = this.turn === "x" ? "o" : "x";
  };
  this.init = function init() {
    this.UI.wrapperBoard.addEventListener("click", this.handleClick);
    this.UI.renderBoard(this.currentDataBoard);
  };
  this.resetBoard = function resetBoard() {
    this.currentDataBoard.fill("", 0);
  };
  this.changeValueBox = function changeValueBox(newValue, index) {
    this.currentDataBoard.forEach((value, i, arrayAll) => {
      if (i === index && value === "") arrayAll[i] = newValue;
    });
  };
  this.checkDraw = function checkDraw() {
    return this.checkWinner() === false && !this.currentDataBoard.includes("")
      ? true
      : false;
  };
  this.checkWinner = function checkWinner() {
    if (
      (this.currentDataBoard[0] === this.currentDataBoard[1] &&
        this.currentDataBoard[0] === this.currentDataBoard[2] &&
        this.currentDataBoard[0] !== "") ||
      (this.currentDataBoard[0] === this.currentDataBoard[3] &&
        this.currentDataBoard[0] === this.currentDataBoard[6] &&
        this.currentDataBoard[0] !== "") ||
      (this.currentDataBoard[0] === this.currentDataBoard[4] &&
        this.currentDataBoard[0] === this.currentDataBoard[8] &&
        this.currentDataBoard[0] !== "") ||
      (this.currentDataBoard[1] === this.currentDataBoard[4] &&
        this.currentDataBoard[1] === this.currentDataBoard[7] &&
        this.currentDataBoard[1] !== "") ||
      (this.currentDataBoard[2] === this.currentDataBoard[5] &&
        this.currentDataBoard[2] === this.currentDataBoard[8] &&
        this.currentDataBoard[2] !== "") ||
      (this.currentDataBoard[2] === this.currentDataBoard[4] &&
        this.currentDataBoard[2] === this.currentDataBoard[6] &&
        this.currentDataBoard[2] !== "") ||
      (this.currentDataBoard[3] === this.currentDataBoard[4] &&
        this.currentDataBoard[3] === this.currentDataBoard[5] &&
        this.currentDataBoard[3] !== "") ||
      (this.currentDataBoard[6] === this.currentDataBoard[7] &&
        this.currentDataBoard[6] === this.currentDataBoard[8] &&
        this.currentDataBoard[6] !== "")
    )
      return true;
    return false;
  };
}
const interface = new UI(wrapperBoard, winnerCont);
const ticTacToe = new Game(interface);
ticTacToe.init();
