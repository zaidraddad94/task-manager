import React from "react";
import styles from "./AddTaskButton.module.css";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return <button onClick={onClick} className={styles.button} />;
};

export default AddTaskButton;
