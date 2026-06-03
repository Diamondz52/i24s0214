"use strict";
// src/services/commands/help.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHelpCommand = void 0;
const createHelpCommand = (commands) => {
    return {
        accept(...argv) {
            const [name] = argv;
            return argv.length === 1 && ["h", "help"].indexOf(name) !== -1;
        },
        run() {
            console.log([
                "*** Commands list ***",
                ...commands
                    .filter((c) => Boolean(c.description))
                    .map((c) => " * " + c.description),
            ].join("\n"));
            return false;
        },
        description: null,
    };
};
exports.createHelpCommand = createHelpCommand;
