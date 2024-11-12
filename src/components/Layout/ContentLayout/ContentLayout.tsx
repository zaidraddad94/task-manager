import React from "react";
import styles from "./ContentLayout.module.css";

interface ContentLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ left, right }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{left}</div>
      <div className={styles.right}>{right}</div>
    </div>
  );
};

export default ContentLayout;
