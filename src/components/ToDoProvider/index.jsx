import { useState } from "react";
import ToDoContext from "./ToDoContext.js";

export function ToDoProvider({ children }) {
  const [todos, setTodos] = useState([
    {
      id: 1,
      description: "JSX e componentes",
      completed: false,
      createdAt: "2022-10-31",
    },
    {
      id: 2,
      description: "Props, state e hooks",
      completed: true,
      createdAt: "2022-10-31",
    },
    {
      id: 3,
      description: "Ciclo de vida dos componentes",
      completed: false,
      createdAt: "2022-10-31",
    },
    {
      id: 4,
      description: "Testes unitários com Jest",
      completed: false,
      createdAt: "2022-10-31",
    },
    {
      id: 5,
      description: "Controle de inputs e formulários controlados",
      completed: true,
      createdAt: "2022-10-31",
    },
    {
      id: 6,
      description: "Rotas dinâmicas",
      completed: true,
      createdAt: "2022-10-31",
    },
  ]);

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
        toggleTodoCompleted,
        deleteTodo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}
