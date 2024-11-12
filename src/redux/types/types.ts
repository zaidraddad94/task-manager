export interface Task {
    id: number;
    title: string;
    description: string;
    categories: string[];
    status: "completed" | "incomplete";
  }