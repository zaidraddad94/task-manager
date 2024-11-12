import React, { useState, useEffect } from "react";
import styles from "./CreateTaskModal.module.css";
import { Task } from "../../../redux/types/types";

interface TaskModalProps {
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    categories: string[];
  }) => void;
  initialTask?: Task | undefined | null;
  isEdit?: boolean;
}

const availableCategories = [
  "Category 01",
  "Category 02",
  "Category 03",
  "Category 04",
];

const TaskModal: React.FC<TaskModalProps> = ({
  onClose,
  onSubmit,
  initialTask,
  isEdit = false,
}) => {
  const [name, setName] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>(
    initialTask?.categories || []
  );
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (initialTask) {
      setName(initialTask.title);
      setDescription(initialTask.description);
      setCategories(initialTask.categories);
    }
  }, [initialTask]);

  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
    setCategoryInput("");
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  const handleSubmit = () => {
    if (name.trim() === "") {
      setNameError("Task Name is required");
      return;
    }
    setNameError("");

    onSubmit({ title: name, description, categories });
    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>
          {isEdit ? "Edit Task" : "Create New Task"}
        </h2>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <input
              placeholder="Task Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            {nameError && <div className={styles.errorText}>{nameError}</div>}
          </div>
          <div className={styles.formGroup}>
            <textarea
              placeholder="Task Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Categories</label>
            <div className={styles.categoryInputContainer}>
              <input
                placeholder="Add Category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                className={styles.input}
                list="category-options"
              />
              <datalist id="category-options">
                {availableCategories
                  .filter(
                    (cat) =>
                      !categories.includes(cat) &&
                      cat.toLowerCase().includes(categoryInput.toLowerCase())
                  )
                  .map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
              </datalist>
            </div>
            <button
              type="button"
              onClick={() => handleAddCategory(categoryInput)}
              disabled={!categoryInput || categories.includes(categoryInput)}
              className={styles.addCategoryButton}
            >
              Add
            </button>
            <div className={styles.categories}>
              {categories.map((category) => (
                <span key={category} className={styles.categoryChip}>
                  {category}{" "}
                  <span
                    onClick={() => handleRemoveCategory(category)}
                    className={styles.removeCategory}
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={styles.createButton}
            >
              {isEdit ? "Save Changes" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
