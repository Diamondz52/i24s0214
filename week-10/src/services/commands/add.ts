// src/services/commands/add.ts
import { Command } from "./types";
import { TaskManager } from "../../models/TaskManager";

export const add: Command = {
    accept(...argv: string[]) {
        return argv[0] === "add" && argv.length >= 2;
    },

    run(tm: TaskManager, ...argv: string[]) {
        const title = argv.slice(1).join(" ");
        tm.add(title);
        return true;
    },
    description: "add [long title]: add new task"
};