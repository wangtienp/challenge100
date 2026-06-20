import { useState, type SubmitEvent } from "react";
import Button from "./Button";

type TodoFormProps ={
  addTodos:(todo:string) => void
}

export default function TodoForm({addTodos}: TodoFormProps) {
  const [input, setInput] = useState('')
  function HandleSubmit(e: SubmitEvent) {
    e.preventDefault()
    addTodos(input)
    setInput('')
    
  }
  return (
    <form className="flex gap-4" onSubmit={HandleSubmit}>
      <input type="text"
        className="flex-1 rounded px-4 py-2 focus:ring-2 focus:ring-zinc-50 
        border-0 outline-none bg-zinc-600"
        value={input}
        onChange={(e) => setInput(e.target.value)} />
      <Button disabled={input.trim() == ''}>Add to do</Button>
    </form>
  )
}
