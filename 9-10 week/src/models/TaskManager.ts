import { Task, type STask } from "./Task.js";
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

interface TaskManagerActions {
  load: (filename: string) => Promise<void>;
  save: (filename: string) => Promise<void>;
  addTask: (title: string) => number;
  findTask: (id: number) => Task | null;
  closeTask: (id: number) => void;
  removeTask: (id: number) => boolean;
  availableTasks: () => Task[];
}

export class TaskManager implements TaskManagerActions {
  private tasks: Map<number, Task> = new Map();
  private nextId: number = 1;

  get allTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  async load(filename: string): Promise<void> {
    try {
      if (!existsSync(filename)) {
        this.tasks.clear();
        this.nextId = 1;
        return;
      }

      const data = await readFile(filename, 'utf-8');
      const sTasks: STask[] = JSON.parse(data);
      
      this.tasks.clear();
      let maxId = 0;
      
      for (const sTask of sTasks) {
        const task = Task.fromSTask(sTask);
        this.tasks.set(task.id, task);
        if (task.id > maxId) {
          maxId = task.id;
        }
      }
      
      this.nextId = maxId + 1;
    } catch (error) {
      this.tasks.clear();
      this.nextId = 1;
    }
  }

  async save(filename: string): Promise<void> {
    const tasksArray: STask[] = Array.from(this.tasks.values()).map(task => task.toJSON());
    const jsonString = JSON.stringify(tasksArray, null, 2);
    await writeFile(filename, jsonString, 'utf-8');
  }

  addTask(title: string): number {
    const id = this.nextId++;
    const task = new Task(id, title);
    this.tasks.set(id, task);
    return id;
  }

  findTask(id: number): Task | null {
    return this.tasks.get(id) ?? null;
  }

  closeTask(id: number): void {
    const task = this.tasks.get(id);
    if (task) {
      task.close();
    }
  }

  removeTask(id: number): boolean {
    return this.tasks.delete(id);
  }

  availableTasks(): Task[] {
    return Array.from(this.tasks.values()).filter(task => !task.isComplete());
  }
}