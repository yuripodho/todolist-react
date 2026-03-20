import "./to-do-form.style.css";
import { TextInput } from "../TextInput";
import { Button } from "../Button";

export function ToDoForm({ onSubmit }) {
  return (
    <form action={onSubmit} className="todo-form">
      <TextInput
        required
        placeholder="Digite o item que deseja adicionar"
      ></TextInput>
      <Button>Salvar Item</Button>
    </form>
  );
}
