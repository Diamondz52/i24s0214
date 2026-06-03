// src/services/commands/done.ts
import { Command } from "./types";
import { TaskManager } from "../../models/TaskManager";

export const done: Command = {
    accept(...argv: string[]) {
        return argv[0] === "done" && argv.length === 2 && !isNaN(Number(argv[1]));
    },

    run(tm: TaskManager, ...argv: string[]) {
        const id = Number(argv[1]);

        if (tm.done(id)) {
            console.log(`Task ${id} marked as done`);
            return true;
        } else {
            console.log(`Task with id ${id} not found`);
            return false;
        }
    },

    description: "done [task-id]: complete task"
};