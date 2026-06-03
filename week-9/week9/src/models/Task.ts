export interface ITask {
    title: string;
    complete: boolean;
    id: number;
    createdAt: Date;
}

export type STask = Omit<ITask, 'createdAt'> & { createdAt: string };

export interface TaskActions {
    close: () => void;
    isComplete: () => boolean;
}

export class Task implements ITask, TaskActions {
    title: string;
    complete: boolean;
    id: number;
    createdAt: Date;

    constructor(id: number, title: string, complete: boolean = false) {
        this.id = id;
        this.title = title;
        this.complete = complete;
        this.createdAt = new Date();
    }
    close(): void {
        this.complete = true;
    }
    isComplete(): boolean {
        return this.complete;
    }

}