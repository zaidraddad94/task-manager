import { RootState } from "../store";
import { Task } from "../types/types";

export const selectFilteredTasks = (state: RootState): Task[] => {
  const { tasks, filters } = state.tasks;
  return tasks.filter((task) => {
    const statusMatch =
      filters.status === "all" || task.status === filters.status;
    const categoryMatch =
      filters.category === "all" || task.categories.includes(filters.category);
    return statusMatch && categoryMatch;
  });
};
