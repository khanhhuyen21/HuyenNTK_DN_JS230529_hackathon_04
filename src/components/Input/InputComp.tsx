import "../../index.css";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Task } from "../Task/TaskComp";

interface TaskProps {
  onNewTask: (title: string) => void;
}

export function Input({ onNewTask }: TaskProps) {
  const [newTasks, setNewTasks] = useState("");

  function handleNewTask(event: FormEvent) {
    event.preventDefault();
    onNewTask(newTasks);
    setNewTasks("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTasks(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("obligatory!");
  }

  const isNewTask = newTasks.length === 0;

  return (
    <>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Create new task"
          value={newTasks}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
        />
        <button onClick={handleNewTask} type="submit" disabled={isNewTask}>
          Add Item
          <PlusCircle size={20} />
        </button>
      </div>
    </>
  );
}
