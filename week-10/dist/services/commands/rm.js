"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rm = void 0;
exports.rm = {
    accept(...argv) {
        return argv[0] === "rm" && argv.length === 2 && !isNaN(Number(argv[1]));
    },
    run(tm, ...argv) {
        const id = Number(argv[1]);
        if (tm.remove(id)) {
            console.log(`Task ${id} removed`);
            return true; // нужно сохранить изменения
        }
        else {
            console.log(`Task with id ${id} not found`);
            return false;
        }
    },
    description: "rm [task-id]: remove task"
};
