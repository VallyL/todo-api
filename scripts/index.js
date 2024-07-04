const now = new Date();
const datetime = now.toDateString();

document.querySelector(".todayDay").innerHTML = datetime;

const splitButtonClickHandler = (target) => {
  const filterButtons = document.querySelectorAll(
    ".allBtn, .activeBtn, .completedBtn"
  );
  filterButtons.forEach((button) => button.classList.remove("allBtnActive"));
  target.classList.add("allBtnActive");

  const filterType = target.classList[0];
  let filteredTodos = getTodos();
  if (filterType === "activeBtn") {
    filteredTodos = filteredTodos.filter((todo) => !todo.done);
  } else if (filterType === "completedBtn") {
    filteredTodos = filteredTodos.filter((todo) => todo.done);
  }

  renderTodos(filteredTodos);
};

const getTodos = () => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));
  return localStorageTodos || [];
};

const renderTodos = (todos = getTodos()) => {
  const container = document.querySelector(".todolist");
  container.innerHTML = "";
  if (todos && Array.isArray(todos)) {
    todos.forEach((todo) => {
      const startDate = new Date(todo.startDate).toLocaleString("en-EN", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
      });
      const id = todo.id;
      container.insertAdjacentHTML(
        "beforeend",
        `
        <li class="todo-block">
          <label class="checkbox" for="${id}" onclick="toggleTodoDone('${id}')">
            <input type="checkbox" name="${id}" id="${id}" ${
          todo.done ? "checked" : ""
        }/>
            <span class="material-symbols-rounded checkbox__check-icon">
              check
            </span>
          </label>
          <div class="todo-block__data">
            <p class="todo-block__date">${startDate}</p>
            <h3 class="todo-block__title">${todo.description}</h3>
          </div>
          <span class="material-symbols-rounded" onclick="deleteTodo('${id}')">
            close
          </span>
        </li>`
      );
    });
  }
};

const createTodo = (e) => {
  e.preventDefault();
  const startDate = document.querySelector(".taskDate").value;
  const description = document.querySelector(".taskTitle").value;

  const localStorageTodos = getTodos();

  const newTodo = {
    id: "todo_" + Math.random().toString(16).slice(2),
    createdAt: new Date(),
    startDate,
    description,
    done: false,
  };

  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    localStorageTodos.push(newTodo);
    localStorage.setItem("todosStorage", JSON.stringify(localStorageTodos));
  } else {
    localStorage.setItem("todosStorage", JSON.stringify([newTodo]));
  }
  renderTodos();
};

const toggleTodoDone = (todoId) => {
  const localStorageTodos = getTodos();
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    const todoIndex = localStorageTodos.findIndex((todo) => todo.id === todoId);
    localStorageTodos[todoIndex].done = !localStorageTodos[todoIndex].done;
    localStorage.setItem("todosStorage", JSON.stringify(localStorageTodos));
  }
  renderTodos();
};

const deleteTodo = (todoId) => {
  const localStorageTodos = getTodos();
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    const newTodos = localStorageTodos.filter((todo) => todo.id !== todoId);
    localStorage.setItem("todosStorage", JSON.stringify(newTodos));
  }
  renderTodos();
};

const searchInput = document.querySelector(".search input");

const searchTasks = (value) => {
  const localStorageTodos = getTodos();
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    const filteredTasks = localStorageTodos.filter((task) =>
      task.description.toLowerCase().includes(value.toLowerCase())
    );
    renderTodos(filteredTasks);
  }
};

searchInput.addEventListener("input", (event) => {
  const userInputValue = event.target.value;
  searchTasks(userInputValue);
});

document.querySelector(".taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  createTodo(e);
});
renderTodos();
