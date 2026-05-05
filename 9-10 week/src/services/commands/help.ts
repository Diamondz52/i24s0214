import { type Command } from "../types.js";

export const createHelpCommand = (commands: Command[]): Command => {
  return {
    accept(...argv: string[]): boolean {
      const [name] = argv;
      return argv.length === 1 && ["h", "help", "-h", "--help"].includes(name);
    },
    run(): boolean {
      console.log("\n*** Commands list ***");
      commands
        .filter((c) => c.description !== null)
        .forEach((c) => console.log(`  ${c.description}`));
      console.log("");
      return false;
    },
    description: null,
  };
};