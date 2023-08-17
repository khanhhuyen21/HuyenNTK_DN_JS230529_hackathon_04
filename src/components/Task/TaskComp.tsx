import "../../index.css";
import { ClipboardText, Trash } from "phosphor-react";
interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface TaksProps {
  tasks: ITask[];
  onCompleteTask: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
}

export function Task({ tasks, onCompleteTask, onRemoveTask }: TaksProps) {
  function handleCheckTask(taskId: string) {
    onCompleteTask(taskId);
  }

  function handleRemoveTask(taskId: string) {
    onRemoveTask(taskId);
  }

  const totalTaskCretead = tasks.length;
  const totalTasksDone = tasks.reduce(
    (acc, cur) => acc + Number(cur.isCompleted),
    0
  );

  return (
    <div className={"task"}>
      <div className={"containerTask"}>
        <p className={"createdTasks"}>
          Created tasks<span>{totalTaskCretead}</span>
        </p>
        <p className={"completedTasks"}>
          Completed tasks{" "}
          <span>
            <>
              {totalTaskCretead === 0
                ? totalTaskCretead
                : `${totalTasksDone} in ${totalTaskCretead}`}
            </>
          </span>
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className={"taskEmpty"}>
          <ClipboardText size={56} />
          <div>
            <p className={"taskTitleEmpty"}> You have no tasks registered.</p>
            <p>Create tasks and organize your to-do items</p>
          </div>
        </div>
      ) : (
        <main className={"itemTasksContainer"}>
          {tasks.map((task) => {
            return (
              <div key={task.id} className={"taskContent"}>
                <input
                  type="checkbox"
                  className={"checkBoxInput"}
                  checked={task.isCompleted}
                  onChange={() => handleCheckTask(task.id)}
                />
                <p
                  className={
                    task.isCompleted ? "titleTaskCompleted" : "titleTask"
                  }
                >
                  {task.title}
                </p>

                <Trash
                  size={24}
                  role="button"
                  className={"buttoTrash"}
                  onClick={() => handleRemoveTask(task.id)}
                />
              </div>
            );
          })}
        </main>
      )}
    </div>
  );
}
