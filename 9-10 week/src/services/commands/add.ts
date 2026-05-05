import type { Command } from "../types.js";
import type { TaskManager } from "../../models/TaskManager.js";

export const add: Command = {
  accept(...argv: string[]): boolean {
    const [name] = argv;
    return name === "add" && argv.length > 1;
  },

  run(taskManager: TaskManager, ...argv: string[]): boolean {
    const title = argv.slice(1).join(" ").trim();
    
    if (!title) {
      console.log("Error: Task title cannot be empty");
      return false;
    }

    taskManager.addTask(title);
    return true;
  },

  description: "add [long title]: add new task"
};