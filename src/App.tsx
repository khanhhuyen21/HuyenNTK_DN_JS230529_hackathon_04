import { useState } from "react";
import "./index.css";
import { Task } from "./components/Task/TaskComp";
import { Header } from "./components/Header/HeaderComp";
import { Input } from "./components/Input/InputComp";
import "./styles/global.css";
interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  // create task
  function addNewTask(newTaskTitle: string) {
    const id = new Date().getTime().toString();
    const onNewTask: ITask = { id, title: newTaskTitle, isCompleted: false };
    setTasks((state) => [...state, onNewTask]);
  }

  // check task
  function handlecheckBoxTask(taskId: string) {
    setTasks((state) => {
      return state.map((itemTasks) => {
        if (itemTasks.id === taskId) {
          return {
            ...itemTasks,
            isCompleted: !itemTasks.isCompleted,
          };
        }
        return itemTasks;
      });
    });
  }

  //remove task
  function handleRemoveTask(taskId: string) {
    setTasks((state) => {
      return state.filter((itemTasks) => itemTasks.id !== taskId);
    });
  }

  return (
    <div className={"app"}>
      <Header />
      <Input onNewTask={addNewTask} />
      <Task
        tasks={tasks}
        onCompleteTask={handlecheckBoxTask}
        onRemoveTask={handleRemoveTask}
      />
    </div>
  );
}

export default App;
