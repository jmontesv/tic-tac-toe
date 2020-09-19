const wrapper = document.querySelector(".wrapper");
const winnerCont = document.querySelector(".winner");
const boxesData = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
let turn = "x";

function handleClick(event) {
  const box = event.target;
  const position = Number(box.getAttribute("data-position"));
  changeValueBox(turn, position);
  clearBoxes();
  renderBoard(boxesData);
  if (checkWinner()) renderWinner(turn);
  turn = turn === "x" ? "o" : "x";
}
wrapper.addEventListener("click", handleClick);

function renderWinner(turn) {
  wrapper.removeEventListener("click", handleClick);
  const textElement = document.createElement("h2");
  textElement.textContent = "EL GANADOR ES " + turn;
  winnerCont.innerHTML = "";
  winnerCont.appendChild(textElement);
  const button = document.createElement("button");
  button.textContent = "Reiniciar";
  button.addEventListener("click", () => {
    clearBoxes();
    boxesData.fill("-", 0);
    renderBoard(boxesData);
    winnerCont.innerHTML = "";
    wrapper.addEventListener("click", handleClick);
  });
  winnerCont.appendChild(button);
}

function clearBoxes() {
  wrapper.innerHTML = "";
}

function renderBoard(boxesData) {
  boxesData.forEach((dataBox, i) => {
    const boxElement = document.createElement("div");
    boxElement.textContent = dataBox;
    boxElement.setAttribute("data-position", i);
    boxElement.classList.add("wrapper__box");
    wrapper.appendChild(boxElement);
  });
}

function changeValueBox(newValue, index) {
  boxesData.forEach((value, i, arrayAll) => {
    if (i === index && value === "-") arrayAll[i] = newValue;
  });
}
function checkWinner() {
  if (
    (boxesData[0] === boxesData[1] &&
      boxesData[0] === boxesData[2] &&
      boxesData[0] !== "-") ||
    (boxesData[0] === boxesData[3] &&
      boxesData[0] === boxesData[6] &&
      boxesData[0] !== "-") ||
    (boxesData[0] === boxesData[4] &&
      boxesData[0] === boxesData[8] &&
      boxesData[0] !== "-") ||
    (boxesData[1] === boxesData[4] &&
      boxesData[1] === boxesData[7] &&
      boxesData[1] !== "-") ||
    (boxesData[2] === boxesData[5] &&
      boxesData[2] === boxesData[8] &&
      boxesData[2] !== "-") ||
    (boxesData[2] === boxesData[4] &&
      boxesData[2] === boxesData[6] &&
      boxesData[2] !== "-") ||
    (boxesData[3] === boxesData[4] &&
      boxesData[3] === boxesData[5] &&
      boxesData[3] !== "-") ||
    (boxesData[6] === boxesData[7] &&
      boxesData[6] === boxesData[8] &&
      boxesData[6] !== "-")
  )
    return true;
}

renderBoard(boxesData);
