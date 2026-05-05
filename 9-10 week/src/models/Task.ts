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
  public complete: boolean;
  public readonly id: number;
  public readonly title: string;
  public readonly createdAt: Date;

  constructor(id: number, title: string, complete: boolean = false, createdAt?: Date) {
    this.id = id;
    this.title = title;
    this.complete = complete;
    this.createdAt = createdAt ?? new Date();
  }

  close(): void {
    this.complete = true;
  }

  isComplete(): boolean {
    return this.complete;
  }

  toJSON(): STask {
    return {
      id: this.id,
      title: this.title,
      complete: this.complete,
      createdAt: this.createdAt.toISOString()
    };
  }

  static fromSTask(sTask: STask): Task {
    return new Task(
      sTask.id,
      sTask.title,
      sTask.complete,
      new Date(sTask.createdAt)
    );
  }
}