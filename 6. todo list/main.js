let tip = document.querySelector(".tip");
let todoInput = document.querySelector("#todo-input");

const listContainer = document.querySelector(".lists");
const todoForm = document.querySelector(".todo-form");

let todoArray = getTodos();
updateTodo();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  let todoText = todoInput.value.trim();
  if (todoText.length <= 0) {
    tip.textContent = "Cannot be empty";
    return;
  }
  todoArray.push({ text: todoText, completed: false });
//   console.log(todoArray);
  tip.textContent = "";
  todoInput.value = "";
  updateTodo();
}

function updateTodo() {
//   console.log(todoArray.length + " " + todoArray);
  if (todoArray.length == 0) return;
  listContainer.innerHTML = "";
  todoArray.forEach((todo, index) => {
    createTodoList(todo, index);
  });
  saveTodos();
}
function createTodoList(todo, index) {
  let newDiv = document.createElement("div");
  newDiv.className = "list";
  if (todo.completed) {
    newDiv.innerHTML = `<div class="content border done">${todo.text}</div><i class="fa-solid fa-check"></i> <i class="fa-solid fa-trash"></i>`;
  } else {
    newDiv.innerHTML = `<div class="content border">${todo.text}</div><i class="fa-solid fa-check"></i> <i class="fa-solid fa-trash"></i>`;
  }
  listContainer.append(newDiv);
  doneAndDelete(index);
  //make the border animation synchronize
  synchroBorderAnimation();
}

function synchroBorderAnimation() {
  const contents = document.querySelectorAll(".list .content");
  contents.forEach((content) => {
    if (content.classList.contains("border")) {
      content.classList.remove("border");
      // console.log(content)
    }
    setTimeout(() => {
      content.classList.add("border");
    }, 60);
  });
}

function doneAndDelete(index) {
  const lists = document.querySelectorAll(".list");
  lists[index].addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check")) {
      done(e, index);
    } else if (e.target.classList.contains("fa-trash")) {
      deleteTodo(e, index);
    }
  });
}

function done(event, index) {
  let parentEl = event.target.parentElement;
  let content = parentEl.firstChild;
  let result = content.classList.toggle("done");
  result
    ? (todoArray[index].completed = true)
    : (todoArray[index].completed = false);
  saveTodos();
  updateTodo();
}
function deleteTodo(event, index) {
  let parentEl = event.target.parentElement;
  todoArray.splice(index, 1);
  parentEl.remove();
  saveTodos();
  updateTodo();
}
function saveTodos() {
  const todosJson = JSON.stringify(todoArray);
  localStorage.setItem("todos", todosJson);
}
function getTodos() {
  const getJson = localStorage.getItem("todos") || "[]";
  return JSON.parse(getJson);
}
