const now = new Date();
const datetime = now.toDateString();

document.querySelector(".todayDay").innerHTML = datetime;

const newNote = document.querySelector(".newNote");
const noteInp = document.querySelector(".desInp");
const dateInp = document.querySelector(".dateInp");
const tasksContainer = document.querySelector(".tasksContainer");
