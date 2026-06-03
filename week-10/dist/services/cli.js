"use strict";
// src/services/cli.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliService = exports.applyCli = void 0;
// Основной движок
//   * опрашивает команды
//   * выполняет подходящую команду
//   * перед этим подгружает todo.json
//   * если команда меняла список задач, сохраняет todo.json
const TaskManager_1 = require("../models/TaskManager");
const help_1 = require("./commands/help");
const list_1 = require("./commands/list");
const add_1 = require("./commands/add");
const done_1 = require("./commands/done");
const rm_1 = require("./commands/rm");
const withTaskManager = async (fn) => {
    const todoPath = "./todo.json";
    const tm = new TaskManager_1.TaskManager();
    await tm.load("./todo.json");
    if (fn(tm)) {
        await tm.save("./todo.json");
    }
};
const applyCli = (commands) => async (...argv) => {
    const cmd = commands.find((c) => c.accept(...argv));
    if (cmd) {
        await withTaskManager((tm) => cmd.run(tm, ...argv));
    }
    else {
        console.log("Unknown command: [" + argv.join(" ") + "]");
    }
};
exports.applyCli = applyCli;
const commands = [list_1.list, add_1.add, done_1.done, rm_1.rm];
const help = (0, help_1.createHelpCommand)(commands);
commands.push(help);
exports.cliService = (0, exports.applyCli)(commands);
