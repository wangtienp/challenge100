import Button from "./Button";
import CompleteImage from "../assets/images/complete.svg"
import DeleteImage from "../assets/images/delete.svg"
export type Todo = { id: string; todo: string; completed: boolean }
type TodoListProps = {
    todos: Todo[],
    toggleComplete: (id: string) => void
    deleteTodo: (id: string) => void
}

export default function TodoList({ todos, toggleComplete,deleteTodo }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <p className="text-center text-zinc-500 py-12">No to-do yet, add one above to get started!</p>
        )
    }
    return (
        <div className="my-5 flex flex-col gap-3">
            {todos.map(todo => {
                return <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
            })}
        </div>
    )
}
type TodoItemProps = {
    todo: Todo,
    toggleComplete: (id: string) => void
    deleteTodo: (id: string) => void
}

function TodoItem({ todo, toggleComplete, deleteTodo }: TodoItemProps) {

    return (
        <div className="flex gap-4 ">
            <div className={`${todo.completed ? "line-through" : ""} rounded bg-zinc-700 flex-1 flex items-center px-4 text-start`}>{todo.todo}</div>
            <Button className="bg-red-600 py-2 px-2" onClick={() => deleteTodo(todo.id)}><img src={DeleteImage} /></Button>
            <Button className={`${todo.completed ? "bg-zinc-400 hover:bg-zinc-300" : "bg-green-600 hover:bg-green-400"} py-2 px-2 `} onClick={() => toggleComplete(todo.id)}><img src={CompleteImage} /></Button>
        </div>
    )
}
