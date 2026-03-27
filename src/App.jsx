import { ChecklistsWrapper } from "./components/ChecklistsWrapper";
import { Container } from "./components/Container";
import { FabButton } from "./components/FabButton";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Heading } from "./components/Heading";
import { IconPlus, IconSchool } from "./components/icons";
import { Dialog } from "./components/Dialog";
import { use } from "react";
import ToDoContext from "./components/ToDoProvider/ToDoContext";
import { ToDoGroup } from "./components/ToDoGroup";
import { ToDoForm } from "./components/ToDoForm";
import { EmptyState } from "./components/EmptyState";

function App() {
  const {
    todos,
    addTodo,
    editTodo,
    showDialog,
    openTodoDialog,
    closeTodoDialog,
    selectedTodo,
  } = use(ToDoContext);

  const handleFormSubmit = (formData) => {
    if (selectedTodo) {
      editTodo(formData);
    } else {
      addTodo(formData);
    }

    closeTodoDialog();
  };

  return (
    <main>
      <Container>
        <Header>
          <Heading>
            <IconSchool /> Plano de estudos
          </Heading>
        </Header>
        <ChecklistsWrapper>
          <ToDoGroup
            heading="Para estudar"
            items={todos.filter((t) => !t.completed)}
          />
          {todos.length == 0 && <EmptyState />}
          <ToDoGroup
            heading="Concluído"
            items={todos.filter((t) => t.completed)}
          />
          <Footer>
            <Dialog isOpen={showDialog} onClose={closeTodoDialog}>
              <ToDoForm
                onSubmit={handleFormSubmit}
                defaultValue={selectedTodo?.description}
              />
            </Dialog>
            <FabButton onClick={() => openTodoDialog(null)}>
              <IconPlus />
            </FabButton>
          </Footer>
        </ChecklistsWrapper>
      </Container>
    </main>
  );
}

export default App;
