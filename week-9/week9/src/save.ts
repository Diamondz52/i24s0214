// Так можно сохранить todo.json
import { TaskManager } from "./models/TaskManager";

const tm = new TaskManager();

const id = tm.addTask("Hello");
tm.addTask("Goodbye");
tm.closeTask(id);

console.log(tm.availableTasks());

tm.save("todo.json");