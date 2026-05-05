import type { Command } from "../types.js";
import type { TaskManager } from "../../models/TaskManager.js";

export const list: Command = {
  accept(...argv: string[]): boolean {
    const [name] = argv;
    return name === "ls" || name === "list";
  },

  run(taskManager: TaskManager, ...argv: string[]): boolean {
    const flag = argv[1];
    const showAll = flag === "-a" || flag === "--all";
    
    const tasks = showAll 
      ? taskManager.allTasks
      : taskManager.availableTasks();
    
    if (tasks.length === 0) {
      return false;
    }

    tasks
      .sort((a, b) => a.id - b.id)
      .forEach(task => {
        const status = task.isComplete() ? "[DONE]" : "[TODO]";
        console.log(`${task.id} ${status} ${task.title}`);
      });
    
    return false;
  },

  description: "ls, list [-a]: list available [all] todo tasks"
};