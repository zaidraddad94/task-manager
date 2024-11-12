import React from "react";
import AddTaskButton from "./components/atoms/AddTaskButton/AddTaskButton";
import CustomHeader from "./components/molecules/CustomHeader/CustomHeader";
import MainLayout from "./components/Layout/MainLayout/MainLayout";
import ContentLayout from "./components/Layout/ContentLayout/ContentLayout";

const AppContainer: React.FC = () => {
  const handleAddTask = () => {
    console.log("Add Task Button Clicked");
  };

  return (
    <MainLayout>
      <CustomHeader
        title="Task Management"
        button={<AddTaskButton onClick={handleAddTask} />}
      />
      <ContentLayout left={<div />} right={<div />} />
    </MainLayout>
  );
};

export default AppContainer;
