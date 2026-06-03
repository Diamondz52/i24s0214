// src/models/TaskManager.ts
import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

export class TaskManager {
    private tasks: { id: number; title: string; done: boolean }[] = [];
    private nextId = 1;

    async load(path: string): Promise<void> {
        try {
            if (!existsSync(path)) {
                this.tasks = [];
                this.nextId = 1;
                return;
            }

            const data = await readFile(path, "utf-8");
            this.tasks = JSON.parse(data);

            if (this.tasks.length > 0) {
                this.nextId = Math.max(...this.tasks.map(t => t.id)) + 1;
            } else {
                this.nextId = 1;
            }
        } catch (e) {
            this.tasks = [];
            this.nextId = 1;
        }
    }

    async save(path: string): Promise<void> {
        await writeFile(path, JSON.stringify(this.tasks, null, 2));
    }

    add(title: string): void {
        this.tasks.push({
            id: this.nextId++,
            title: title.trim(),
            done: false
        });
    }

    getAll(): { id: number; title: string; done: boolean }[] {
        return [...this.tasks];
    }

    getActive(): { id: number; title: string; done: boolean }[] {
        return this.tasks.filter(task => !task.done);
    }

    done(id: number): boolean {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.done = true;
            return true;
        }
        return false;
    }

    remove(id: number): boolean {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}