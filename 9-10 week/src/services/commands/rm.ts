import type { Command } from "../types.js";
import type { TaskManager } from "../../models/TaskManager.js";

export const rm: Command = {
  accept(...argv: string[]): boolean {
    const [name] = argv;
    return name === "rm" && argv.length === 2;
  },

  run(taskManager: TaskManager, ...argv: string[]): boolean {
    const id = parseInt(argv[1], 10);
    
    if (isNaN(id)) {
      console.log("Error: Invalid task ID");
      return false;
    }

    const deleted = taskManager.removeTask(id);
    
    if (!deleted) {
      console.log(`Error: Task with id ${id} not found`);
      return false;
    }

    return true;
  },

  description: "rm [task-id]: remove task"
};