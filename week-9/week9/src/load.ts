// Так его можно считать
import { TaskManager } from "./models/TaskManager";

const tm = new TaskManager();
(async () => {
  await tm.load("todo.json");
  console.log(tm.availableTasks());
})();