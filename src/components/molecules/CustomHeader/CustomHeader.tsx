import React from "react";
import styles from "./CustomHeader.module.css";

interface CustomHeaderProps {
  title: string;
  button?: React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, button }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {button && <div className={styles.buttonContainer}>{button}</div>}
    </header>
  );
};

export default CustomHeader;
