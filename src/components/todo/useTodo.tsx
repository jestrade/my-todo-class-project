import { useEffect, useState } from "react";
import { todoApi } from "../../utils/apiClient";
import type { TodoType } from "./types";

export const useTodo = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);

    const addTodo = async (todo: TodoType) => {
        try {
            const data = await todoApi.createTodo(todo);
            // Backend returns the created task object directly
            setTodos((prev) => [...prev, data]);
        } catch (error) {
            console.error('Error adding todo:', error);
            throw error;
        }
    }

    const removeTodo = async (id: string) => {
        try {
            await todoApi.deleteTodo(id);
            setTodos((prev) => prev.filter((t) => (t.id || t._id) !== id));
        } catch (error) {
            console.error('Error removing todo:', error);
            throw error;
        }
    }

    const markAsDone = async (id: string) => {
        try {
            const updated_at = new Date().toISOString();
            await todoApi.updateTodo(id, {
                completed: true,
                updated_at
            });

            setTodos((prev) => prev.map((t) => {
                const todoId = t.id || t._id || '';
                if (todoId === id) {
                    return { ...t, completed: true, updated_at };
                }
                return t;
            }));
        } catch (error) {
            console.error('Error marking todo as done:', error);
            throw error;
        }
    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await todoApi.getTodos();
                setTodos(data || []);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    return { todos, addTodo, removeTodo, markAsDone }
}