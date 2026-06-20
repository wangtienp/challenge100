import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList, { type Todo } from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(()=>{
    const storedTodos = localStorage.getItem('Todos')
    return storedTodos? JSON.parse(storedTodos):[] 
  })
  
  useEffect(()=>{
    localStorage.setItem('Todos',JSON.stringify(todos))
  },[todos])
  function addTodos(todo:string){
    setTodos(prev=>[...prev,{id:crypto.randomUUID(),todo:todo,completed:false}])
  }
  function toggleComplete(id:string){
    setTodos(prevTodos => prevTodos.map(
      item=>item.id ==id? {...item,completed:!item.completed}:item
    ))
  }
  function deleteTodo(id:string){
    setTodos(prevTodos => prevTodos.filter(item=>item.id != id))
  }
  return (
    <div className="max-w-2xl text-center mx-auto h-full">
      <h1 className="text-3xl font-roboto text-zinc-300">To Do List</h1>
      <TodoForm addTodos={addTodos} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo ={deleteTodo}/>
    </div>
  )
}
