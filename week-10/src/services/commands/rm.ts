// src/services/commands/rm.ts
import { Command } from "./types";
import { TaskManager } from "../../models/TaskManager";

export const rm: Command = {
    accept(...argv: string[]) {
        return argv[0] === "rm" && argv.length === 2 && !isNaN(Number(argv[1]));
    },

    run(tm: TaskManager, ...argv: string[]) {
        const id = Number(argv[1]);

        if (tm.remove(id)) {
            console.log(`Task ${id} removed`);
            return true;        // нужно сохранить изменения
        } else {
            console.log(`Task with id ${id} not found`);
            return false;
        }
    },

    description: "rm [task-id]: remove task"
};