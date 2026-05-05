import { TaskManager } from "./models/TaskManager.js";

async function demo() {
  const tm = new TaskManager();

  const id1 = tm.addTask("Hello");
  tm.addTask("Goodbye"); 
  tm.closeTask(id1);

  console.log("Available tasks before save:", tm.availableTasks().length);
  await tm.save("todo.json");
  console.log("Tasks saved to todo.json");

  const tm2 = new TaskManager();
  await tm2.load("todo.json");
  
  const available = tm2.availableTasks();
  console.log("Available tasks after load:", available.length);
  available.forEach(task => {
    console.log(`- [${task.id}] ${task.title} (${task.isComplete() ? 'done' : 'pending'})`);
  });
}

demo().catch(console.error);