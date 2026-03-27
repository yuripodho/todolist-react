import { useEffect, useState } from "react";
import ToDoContext from "./ToDoContext.js";

const TODOS = "todos";

export function ToDoProvider({ children }) {
  const [showDialog, setShowDialog] = useState(false);
  const savedTodos = localStorage.getItem(TODOS);

  const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : []);

  const [selectedTodo, setSelectedTodo] = useState();

  const openTodoDialog = (todo) => {
    if (todo) {
      setSelectedTodo(todo);
    }
    setShowDialog(true);
  };

  const closeTodoDialog = () => {
    setShowDialog(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (formData) => {
    const description = formData.get("description");
    setTodos((prevState) => {
      const todo = {
        id: prevState.length + 1,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      return [...prevState, todo];
    });
  };

  const editTodo = (formData) => {
    const description = formData.get("description");
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === selectedTodo.id) {
          return {
            ...t,
            description: description,
          };
        }
        return t;
      });
    });
  };

  const toggleTodoCompleted = (todo) => {
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === todo.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      });
    });
  };

  const deleteTodo = (todo) => {
    setTodos((prevState) => {
      return prevState.filter((t) => t.id !== todo.id);
    });
  };

  return (
    <ToDoContext.Provider
      value={{
        todos,
        addTodo,
        editTodo,
        toggleTodoCompleted,
        deleteTodo,
        openTodoDialog,
        closeTodoDialog,
        showDialog,
        setSelectedTodo,
        selectedTodo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}
