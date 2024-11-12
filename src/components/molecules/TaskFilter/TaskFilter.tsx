import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setFilterStatus,
  setFilterCategory,
} from "../../../redux/slices/taskSlice";
import styles from "./TaskFilter.module.css";

const TaskFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { status, category } = useSelector(
    (state: RootState) => state.tasks.filters
  );

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as "all" | "completed" | "incomplete";
    dispatch(setFilterStatus(value));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as
      | "all"
      | "category01"
      | "category02"
      | "category03";
    dispatch(setFilterCategory(value));
  };

  return (
    <div className={styles.filterContainer}>
      <p className={styles.title}>Filter</p>

      <div className={styles.section}>
        <h4 className={styles.subtitle}>Completion Status</h4>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="all"
            checked={status === "all"}
            onChange={handleStatusChange}
            className={styles.radioInput}
          />
          All
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="completed"
            checked={status === "completed"}
            onChange={handleStatusChange}
            className={styles.radioInput}
          />
          Completed
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="incomplete"
            checked={status === "incomplete"}
            onChange={handleStatusChange}
            className={styles.radioInput}
          />
          Incomplete
        </label>
      </div>

      <div className={styles.section}>
        <h4 className={styles.subtitle}>Categories</h4>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="all"
            checked={category === "all"}
            onChange={handleCategoryChange}
            className={styles.radioInput}
          />
          All
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="category01"
            checked={category === "category01"}
            onChange={handleCategoryChange}
            className={styles.radioInput}
          />
          Category 01
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="category02"
            checked={category === "category02"}
            onChange={handleCategoryChange}
            className={styles.radioInput}
          />
          Category 02
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            value="category03"
            checked={category === "category03"}
            onChange={handleCategoryChange}
            className={styles.radioInput}
          />
          Category 03
        </label>
      </div>
    </div>
  );
};

export default TaskFilter;
