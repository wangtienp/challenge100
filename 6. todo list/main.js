let tip = document.querySelector(".tip");
let todoInput = document.querySelector("#todo-input");

const listContainer = document.querySelector(".lists");
const todoForm = document.querySelector(".todo-form");

let todoArray = getTodos();
updateTodo();

todoForm.addEventListener("submit", (e) => {
  
  addTodo(e);
});

function addTodo(e) {
  let messages = []
  let todoText = todoInput.value.trim();
  if (todoText.length <= 0) {
    messages.push("Cannot be empty");
  }
  //   console.log(todoArray);
  if(messages.length >0){
    e.preventDefault();
    return tip.innerText = messages.join(", ")
    
  }
  
  todoArray.push({ id: crypto.randomUUID(), text: todoText, completed: false });
  updateTodo();
}

function updateTodo() {
 
  listContainer.innerHTML = todoArray.map(todo =>
    `
    <div class ="list" data-key = ${todo.id}>
      <div class="content border ${todo.completed ? "done" : ""}">${todo.text}</div><i class="fa-solid fa-check"></i> <i class="fa-solid fa-trash"></i>
    </div>
    `
  ).join('')
  saveTodos();
}

listContainer.addEventListener("click",(e)=>{
  const key = e.target.closest(".list").dataset.key
  if(e.target.classList.contains("fa-check")){
    todoArray.map(todo=>{
      if(todo.id != key) return todo
      todo.completed = !todo.completed
      console.log(todo)
    })
  }
  if(e.target.classList.contains("fa-trash")){
    todoArray = todoArray.filter(todo=>todo.id != key)

  }
  updateTodo()
})

function saveTodos() {
  const todosJson = JSON.stringify(todoArray);
  localStorage.setItem("todos", todosJson);
}
function getTodos() {
  const getJson = localStorage.getItem("todos") || [];
  return JSON.parse(getJson);
}
