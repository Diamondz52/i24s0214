"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
exports.list = {
    accept(...argv) {
        const [cmd] = argv;
        return (cmd === "ls" || cmd === "list") && argv.length <= 2;
    },
    run(tm, ...argv) {
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
