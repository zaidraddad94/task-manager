import React, { useState } from "react";
import styles from "./TaskCard.module.css";
import arrowGreen from "../../../assets/arrowGreen.png";
import arrowRed from "../../../assets/arrowRed.png";
import editIcon from "../../../assets/editIcon.png";
import deleteIcon from "../../../assets/deleteIcon.png";

interface TaskCardProps {
  title: string;
  categories: string[];
  description: string;
  status: "completed" | "incomplete";
  onStatusChange: (newStatus: "completed" | "incomplete") => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  categories,
  status,
  description,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleStatusChange = (newStatus: "completed" | "incomplete") => {
    onStatusChange(newStatus);
    setDropdownOpen(false);
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.taskInfo}>
        <h3 className={styles.title}>
          {title}
          <div className={styles.tooltip}>{description}</div>
        </h3>
        <div className={styles.categories}>
          {categories.map((category) => (
            <span key={category} className={styles.category}>
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <div
          className={`${styles.statusDropdown} ${
            status === "completed" ? styles.completed : styles.incomplete
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {status === "completed" ? "Completed" : "Incomplete"}
          {status === "completed" ? (
            <img
              src={arrowGreen}
              alt="Dropdown arrow"
              className={styles.arrowIcon}
            />
          ) : (
            <img
              src={arrowRed}
              alt="Dropdown arrow"
              className={styles.arrowIcon}
            />
          )}
        </div>

        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            <div
              className={styles.dropdownItem}
              onClick={() => handleStatusChange("completed")}
            >
              <span
                className={styles.statusDot}
                style={{ backgroundColor: "#10b981" }}
              ></span>
              Completed
            </div>
            <div
              className={styles.dropdownItem}
              onClick={() => handleStatusChange("incomplete")}
            >
              <span
                className={styles.statusDot}
                style={{ backgroundColor: "#ef4444" }}
              ></span>
              Incomplete
            </div>
          </div>
        )}

        <button className={styles.iconButton} onClick={onEdit}>
          <img src={editIcon} alt="Edit" className={styles.iconImage} />
        </button>

        <button className={styles.iconButton} onClick={onDelete}>
          <img src={deleteIcon} alt="Delete" className={styles.iconImage} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
