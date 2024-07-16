class SchedulerTask {
    private tasks: Record<string, NodeJS.Timeout | null> = {};

    hasTask(taskName: string): boolean {
        return taskName in this.tasks;
    }

    addTask(taskName: string, timerId: NodeJS.Timeout | null) {
        this.tasks[taskName] = timerId;
    }

    removeTask(taskName: string) {
        delete this.tasks[taskName];
    }

    cancelTaskByName(taskName: string) {
        if (this.hasTask(taskName)) {
            const timerId = this.tasks[taskName];
            if (timerId) {
                clearTimeout(timerId);
            }
            this.removeTask(taskName);
        }
    }
}

export const schedulerTask = new SchedulerTask();