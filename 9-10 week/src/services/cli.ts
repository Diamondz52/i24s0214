import { TaskManager } from "../models/TaskManager.js";
import { createHelpCommand } from "./commands/help.js";
import type { Command } from "./types.js";

import { list } from "./commands/list.js";
import { add } from "./commands/add.js";
import { done } from "./commands/done.js";
import { rm } from "./commands/rm.js";

const withTaskManager = async (fn: (m: TaskManager) => boolean): Promise<void> => {
  const todoPath = "./todo.json";
  const tm = new TaskManager();
  await tm.load(todoPath);
  
  const changed = fn(tm);
  
  if (changed) {
    await tm.save(todoPath);
  }
};

export const applyCli = (commands: Command[]) => {
  return async (...argv: string[]): Promise<void> => {
    const cmd = commands.find((c) => c.accept(...argv));

    if (cmd) {
      await withTaskManager((tm) => cmd.run(tm, ...argv));
    } else {
      console.log(`Unknown command: ${argv.join(" ")}`);
      console.log('Type "h" for help');
    }
  };
};

const commands: Command[] = [list, add, done, rm];
const help = createHelpCommand(commands);
commands.push(help);

export const cliService = applyCli(commands);