const wrapper = document.querySelector(".wrapper");
const boxesData = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
let turn = "x";
// TODO: Hacer algun elemento por pantalla cuando gane un jugador y que se resetee el juego

wrapper.addEventListener("click", (event) => {
  const box = event.target;
  const position = Number(box.getAttribute("data-position"));
  changeValueBox(turn, position);
  if (checkWinner()) console.log("EL ganador es", turn);
  clearBoxes();
  renderBoard(boxesData);
  turn = turn === "x" ? "o" : "x";
});

function clearBoxes() {
  wrapper.querySelectorAll(".wrapper__box").forEach((box) => {
    wrapper.removeChild(box);
  });
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
  boxesData.forEach((_, i, arrayAll) => {
    if (i === index) arrayAll[i] = newValue;
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
