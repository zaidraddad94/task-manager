import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { changeStatus } from "../../../redux/slices/taskSlice";
import { Task } from "../../../redux/types/types";
import { selectFilteredTasks } from "../../../redux/selectors/taskSelectors";
import styles from "./TaskList.module.css";

interface TaskListProps {
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEditTask, onDeleteTask }) => {
  const tasks = useSelector((state: RootState) => selectFilteredTasks(state));
  const dispatch = useDispatch();

  const handleStatusChange = (
    id: number,
    state: "completed" | "incomplete"
  ) => {
    dispatch(changeStatus({ id, status: state }));
  };

  return (
    <div className={styles.scrollContainer}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          categories={task.categories}
          status={task.status}
          description={task.description}
          onStatusChange={(newState) => handleStatusChange(task.id, newState)}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task)}
        />
      ))}
    </div>
  );
};

export default TaskList;
