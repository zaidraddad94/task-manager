import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/types";

interface TaskState {
  nextTaskID: number;
  tasks: Task[];
  filters: {
    status: "all" | "completed" | "incomplete";
    category: "all" | "category01" | "category02" | "category03" | "category04";
  };
}

const initialState: TaskState = {
  nextTaskID: 1,
  tasks: [],
  filters: {
    status: "all",
    category: "all",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        categories: string[];
      }>
    ) => {
      const newTask: Task = {
        id: state.nextTaskID,
        title: action.payload.title,
        description: action.payload.description,
        categories: action.payload.categories,
        status: "incomplete",
      };
      state.nextTaskID = state.nextTaskID + 1;
      state.tasks.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        description: string;
        categories: string[];
      }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.categories = action.payload.categories;
      }
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; status: "completed" | "incomplete" }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    setFilterStatus: (
      state,
      action: PayloadAction<"all" | "completed" | "incomplete">
    ) => {
      state.filters.status = action.payload;
    },
    setFilterCategory: (
      state,
      action: PayloadAction<
        "all" | "category01" | "category02" | "category03" | "category04"
      >
    ) => {
      state.filters.category = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  changeStatus,
  setFilterStatus,
  setFilterCategory,
} = taskSlice.actions;
export default taskSlice.reducer;
