import type { Command } from "../types.js";
import type { TaskManager } from "../../models/TaskManager.js";

export const done: Command = {
  accept(...argv: string[]): boolean {
    const [name] = argv;
    return name === "done" && argv.length === 2;
  },

  run(taskManager: TaskManager, ...argv: string[]): boolean {
    const id = parseInt(argv[1], 10);
    
    if (isNaN(id)) {
      console.log("Error: Invalid task ID");
      return false;
    }

    const task = taskManager.findTask(id);
    
    if (!task) {
      console.log(`Error: Task with id ${id} not found`);
      return false;
    }

    if (task.isComplete()) {
      console.log(`Task ${id} is already completed`);
      return false;
    }

    taskManager.closeTask(id);
    return true;
  },

  description: "done [task-id]: complete task"
};