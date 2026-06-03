"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
exports.add = {
    accept(...argv) {
        return argv[0] === "add" && argv.length >= 2;
    },
    run(tm, ...argv) {
        const title = argv.slice(1).join(" ");
        tm.add(title);
        return true;
    },
    description: "add [long title]: add new task"
};
