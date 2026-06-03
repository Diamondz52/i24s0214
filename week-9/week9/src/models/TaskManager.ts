import { Task, type STask } from "./Task";
import { readFile, writeFile } from 'fs/promises';

interface TaskManagerActions {
    load: (filename: string) => Promise<void>;
    save: (filename: string) => Promise<void>;
    addTask: (title: string) => number;
    findTask: (id: number) => Task | null;
    closeTask: (id: number) => void;
    availableTasks: () => Task[];
}

export class TaskManager implements TaskManagerActions {
    private tasks: Task[] = [];
    private nextId: number = 1;

    addTask(title: string): number {
        const task = new Task(this.nextId++, title);
        this.tasks.push(task);
        return task.id;
    }

    findTask(id: number): Task | null {
        return this.tasks.find(task => task.id === id) || null;
    }

    closeTask(id: number): void {
        const task = this.findTask(id);
        if(task) {
            task.close();
        }
    }

    availableTasks(): Task[] {
        return this.tasks.filter(task => !task.isComplete());
    }

    save(filename: string): Promise<void> {
        const tasks: STask[] = this.tasks.map((task) => ({
            title: task.title,
            complete: task.complete,
            id: task.id,
            createdAt: task.createdAt.toISOString(),
        }));
        return writeFile(filename, JSON.stringify(tasks));
    }

    load(filename: string): Promise<void> {
        return readFile(filename, 'utf-8')
            .then((data) => JSON.parse(data))
            .then((tasks: STask[]) => {
                this.tasks = tasks.map((task) => {
                    const newTask = new Task(task.id, task.title, task.complete);
                    newTask.complete = task.complete;
                    newTask.id = task.id;
                    newTask.createdAt = new Date(task.createdAt);
                    return newTask;
                });
            });
    }
}