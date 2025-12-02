import type { TodoType } from "./types";

import { Check, TodoCol } from "./styled";

const TodoItem = ({ todo, markAsDone, removeTodo }: { todo: TodoType, markAsDone: (id: string) => void, removeTodo: (id: string) => void }) => {
    const todoId = todo.id || todo._id || '';
    const isDone = todo.completed !== undefined ? todo.completed : todo.done;
    const content = todo.title || todo.content || '';
    const createdAt = todo.created_at || todo.createdAt || '';
    const updatedAt = todo.updated_at || todo.updatedAt || '';
    
    const handleDelete = () => {
        removeTodo(todoId);
    }
    const handleDone = () => {
        markAsDone(todoId);
    }
    return (
        <tr>
            <TodoCol>
                <Check type="checkbox" checked={!!isDone} onChange={handleDone} />
            </TodoCol>
            <TodoCol>{content}</TodoCol>
            <TodoCol>{createdAt}</TodoCol>
            <TodoCol>{updatedAt}</TodoCol>
            <TodoCol>
                <button onClick={handleDelete}>Delete</button>
            </TodoCol>
        </tr>
    );
}

export default TodoItem;