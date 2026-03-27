import "./to-do-form.style.css";
import { TextInput } from "../TextInput";
import { Button } from "../Button";

export function ToDoForm({ onSubmit, defaultValue }) {
  return (
    <form action={onSubmit} className="todo-form">
      <TextInput
        required
        placeholder="Digite o item que deseja adicionar"
        name="description"
        defaultValue={defaultValue}
      ></TextInput>
      <Button>Salvar Item</Button>
    </form>
  );
}
