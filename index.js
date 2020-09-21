function UI() {
  this.winnerCont = document.querySelector(".winner");
  this.wrapperBoard = document.querySelector(".wrapper");

  this.renderBoard = function renderBoard(currentDataBoard) {
    currentDataBoard.forEach((dataBox, i) => {
      const boxElement = this.createDomElement(
        "div",
        dataBox,
        [{ name: "data-position", value: i }],
        "wrapper__box"
      );
      this.wrapperBoard.appendChild(boxElement);
    });
  };
  this.createDomElement = function createDomElement(
    tag,
    content,
    attributes = [],
    className = "dfdf"
  ) {
    const element = document.createElement(tag);
    element.textContent = content;
    element.classList.add(className);
    attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value);
    });
    return element;
  };
  this.renderWinner = function renderWinner(
    currentDataBoard,
    turn,
    handleClick
  ) {
    this.wrapperBoard.removeEventListener("click", handleClick);
    this.winnerCont.appendChild(
      this.createDomElement("h2", "EL GANADOR ES " + turn)
    );
    const button = this.createDomElement("button", "Reiniciar");
    button.addEventListener("click", () => {
      this.clearContentWrapper(this.wrapperBoard);
      this.renderBoard(currentDataBoard);
      this.clearContentWrapper(this.winnerCont);
      this.wrapperBoard.addEventListener("click", handleClick);
    });
    this.winnerCont.appendChild(button);
  };
  this.clearContentWrapper = function clearWrapper(wrapper) {
    wrapper.innerHTML = "";
  };
  this.renderDraw = function renderDraw(currentDataBoard, handleClick) {
    this.wrapperBoard.removeEventListener("click", handleClick);
    const drawElement = this.createDomElement("div", "Emplate", [], "winner");
    const button = this.createDomElement("button", "Reiniciar");
    button.addEventListener("click", () => {
      this.clearContentWrapper(this.wrapperBoard);
      this.renderBoard(currentDataBoard);
      this.clearContentWrapper(this.winnerCont);
      wrapper.addEventListener("click", handleClick);
    });
    drawElement.appendChild(button);
    this.winnerCont.appendChild(drawElement);
  };
}

function Game(UI) {
  this.currentDataBoard = ["", "", "", "", "", "", "", "", ""];
  this.turn = "x";
  this.UI = UI;
  this.handleClick = (event) => {
    const box = event.target;
    const position = Number(box.getAttribute("data-position"));
    this.changeValueBox(this.turn, position);
    this.UI.clearContentWrapper(this.UI.wrapperBoard);
    this.UI.renderBoard(this.currentDataBoard);
    if (this.checkDraw()) {
      this.resetBoard();
      this.UI.renderDraw(this.currentDataBoard);
    }
    if (this.checkWinner()) {
      this.resetBoard();
      this.UI.renderWinner(this.currentDataBoard, this.turn);
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
  this.checkWinner = function checkWinner(currentDataBoard) {
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
const interface = new UI();
const ticTacToe = new Game(interface);
ticTacToe.init();
