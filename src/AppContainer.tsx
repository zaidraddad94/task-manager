import React, { useState } from "react";
import AddTaskButton from "./components/atoms/AddTaskButton/AddTaskButton";
import CustomHeader from "./components/molecules/CustomHeader/CustomHeader";
import MainLayout from "./components/Layout/MainLayout/MainLayout";
import ContentLayout from "./components/Layout/ContentLayout/ContentLayout";
import TaskFilter from "./components/molecules/TaskFilter/TaskFilter";
import TaskList from "./components/molecules/TaskList/TaskList";
import TaskModal from "./components/molecules/CreateTaskModal/CreateTaskModal";
import DeleteTaskModal from "./components/molecules/DeleteTaskModal/DeleteTaskModal";
import { useDispatch } from "react-redux";
import { addTask, editTask, deleteTask } from "./redux/slices/taskSlice";
import { Task } from "./redux/types/types";

const AppContainer: React.FC = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleAddTask = () => {
    setIsEditMode(false);
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setIsEditMode(true);
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleSaveTask = (task: {
    title: string;
    description: string;
    categories: string[];
  }) => {
    if (isEditMode && currentTask) {
      dispatch(editTask({ ...currentTask, ...task }));
    } else {
      dispatch(addTask({ ...task }));
    }
    handleCloseModal();
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete.id));
    }
    handleCloseDeleteModal();
  };

  return (
    <MainLayout>
      <CustomHeader
        title="Task Management"
        button={<AddTaskButton onClick={handleAddTask} />}
      />
      <ContentLayout
        left={<TaskFilter />}
        right={
          <TaskList
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        }
      />

      {isModalOpen && (
        <TaskModal
          onClose={handleCloseModal}
          onSubmit={handleSaveTask}
          initialTask={currentTask}
          isEdit={isEditMode}
        />
      )}

      {isDeleteModalOpen && taskToDelete && (
        <DeleteTaskModal
          taskName={taskToDelete.title}
          onClose={handleCloseDeleteModal}
          onDelete={handleConfirmDelete}
        />
      )}
    </MainLayout>
  );
};

export default AppContainer;
