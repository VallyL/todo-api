const now = new Date();
const datetime = now.toDateString();

document.querySelector(".todayDay").innerHTML = datetime;

const newNote = document.querySelector(".newNote");
const noteInp = document.querySelector(".desInp");
const dateInp = document.querySelector(".dateInp");
const tasksContainer = document.querySelector(".tasksContainer");

function createTask() {
  const liContainer = document.createElement("li");
  const checkbox = document.querySelector("input");
  const taskTitle = document.createElement("h3");
  const taskData = document.createElement("p");

  taskTitle.textContent = noteInp.value;
  taskData.textContent = dateInp.value;

  checkbox.setAttribute("type", "checkbox");

  liContainer.append(checkbox, taskTitle, taskData);
  tasksContainer.append(liContainer);
}

newNote.addEventListener("submit", (event) => {
  event.preventDefault();

  if (noteInp.value === "" || dateInp.value === "") {
    console.log("empty fields");
  } else {
    createTask();
    noteInp.value = "";
  }
});
