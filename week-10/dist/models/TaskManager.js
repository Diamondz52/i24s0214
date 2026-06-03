"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
// src/models/TaskManager.ts
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
class TaskManager {
    tasks = [];
    nextId = 1;
    async load(path) {
        try {
            if (!(0, fs_1.existsSync)(path)) {
                this.tasks = [];
                this.nextId = 1;
                return;
            }
            const data = await (0, promises_1.readFile)(path, "utf-8");
            this.tasks = JSON.parse(data);
            if (this.tasks.length > 0) {
                this.nextId = Math.max(...this.tasks.map(t => t.id)) + 1;
            }
            else {
                this.nextId = 1;
            }
        }
        catch (e) {
            this.tasks = [];
            this.nextId = 1;
        }
    }
    async save(path) {
        await (0, promises_1.writeFile)(path, JSON.stringify(this.tasks, null, 2));
    }
    add(title) {
        this.tasks.push({
            id: this.nextId++,
            title: title.trim(),
            done: false
        });
    }
    getAll() {
        return [...this.tasks];
    }
    getActive() {
        return this.tasks.filter(task => !task.done);
    }
    done(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.done = true;
            return true;
        }
        return false;
    }
    remove(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.TaskManager = TaskManager;
