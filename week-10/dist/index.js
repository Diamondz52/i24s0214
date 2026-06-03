"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("./services/cli");
const argv = process.argv.slice(2);
(0, cli_1.cliService)(...argv);
