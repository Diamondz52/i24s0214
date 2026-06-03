"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.done = void 0;
exports.done = {
    accept(...argv) {
        return argv[0] === "done" && argv.length === 2 && !isNaN(Number(argv[1]));
    },
    run(tm, ...argv) {
        const id = Number(argv[1]);
        if (tm.done(id)) {
            console.log(`Task ${id} marked as done`);
            return true;
        }
        else {
            console.log(`Task with id ${id} not found`);
            return false;
        }
    },
    description: "done [task-id]: complete task"
};
