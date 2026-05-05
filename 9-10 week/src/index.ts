#!/usr/bin/env node

import { cliService } from "./services/cli.ts";

const argv = process.argv.slice(2);

if (argv.length === 0) {
  argv.push("h");
}

cliService(...argv).catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});