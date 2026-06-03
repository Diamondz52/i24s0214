// src/services/commands/list.ts
import { Command } from "./types";
import { TaskManager } from "../../models/TaskManager";

export const list: Command = {
    accept(...argv: string[]) {
        const [cmd] = argv;
        return (cmd === "ls" || cmd === "list") && argv.length <= 2;
    },

    run(tm: TaskManager, ...argv: string[]) {
        const showAll = argv[1] === "-a";
        const tasks = showAll ? tm.getAll() : tm.getActive();

        if (tasks.length === 0) {
            console.log(showAll ? "No tasks." : "No active tasks.");
            return false;
        }

        tasks.forEach(task => {
            const status = task.done ? '[DONE]' : '[TODO]';
            console.log(` ${task.id} ${status} ${task.title}`);
        });

        return false; // list не меняет данные
    },

    description: "ls, list [-a]: list available [all] todo tasks"
};