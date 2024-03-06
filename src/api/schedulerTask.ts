export class TimerTask {
    private timerId: NodeJS.Timeout | null = null;

    constructor(private store: any, private packaged_data: any[], private runOnce: boolean) {}

    startTask(interval: number) {
        if (this.timerId !== null) {
            console.log("Task is already running.");
            return;
        }

        this.timerId = setInterval(() => {
            for (let i = 0; i < this.packaged_data.length; i++) {
                this.store.sendSerialData(this.packaged_data[i]);
                if (i === this.packaged_data.length - 1 && this.runOnce) {
                    this.stopTask();
                }
            }
        }, interval);
    }

    stopTask() {
        if (this.timerId === null) {
            console.log("No task is running.");
            return;
        }

        clearInterval(this.timerId);
        this.timerId = null;
    }

    createTask(interval: number, RunOnce: boolean=false) {
        this.runOnce = RunOnce;
        this.startTask(interval);
    }
}