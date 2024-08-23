

class SchedulerPipeline {
    private queue: Array<{ name: string, execFunction: (args: object) => any, args: object[], runStatus: { value: number }, interval: number, timeoutId?: NodeJS.Timeout, currentIndex?: number, executionMode: string }> = [];
// shut_interval的意思是先发送各个数据，最后发送shutdown，并等待响应
    // name , execFunction, args=[{datapackage}] , interval, executionMode
    // datapackage = {power_value:set_power,store_value:store}
    // data_package['power_value]
    addTask(name: string, execFunction: (args: object) => any, args: object[], interval: number, executionMode: 'once' | 'interval' | 'continuous'|'shut_interval') {
        // If a task with the same name already exists in the queue, cancel it
        if (this.queue.some(task => task.name === name)) {
            this.cancelTask(name);
        }

        // Add the new task to the queue
        this.queue.push({ name, execFunction, args, runStatus: { value: 0 }, interval, currentIndex: 0, executionMode });
        this.processTask(this.queue[this.queue.length - 1]);
    }

    cancelTask(name: string) {
        // If the task with the given name exists, clear its timeout
        this.queue.forEach(task => {
            if (task.name === name && task.timeoutId) {
                clearTimeout(task.timeoutId);
                task.timeoutId = undefined;
            }
        });

        // Remove the task from the queue
        this.queue = this.queue.filter(task => task.name !== name);
    }

    hasTask(name: string): boolean {
        return this.queue.some(task => task.name === name);
    }
    private processTask(task: { name: string, execFunction: (args: object) => any, args: object[], runStatus: { value: number }, interval: number, timeoutId?: NodeJS.Timeout, currentIndex: number, executionMode: string }) {
        const result = task.execFunction(task.args[task.currentIndex]);
        task.runStatus.value = 1;

        // If the task function returns a value, use it as the new args
        if (result !== undefined) {
            task.args[task.currentIndex] = result;
        }

        // If the task needs to loop, set a timeout
        if (task.interval > 0 && task.executionMode !== 'once') {
            task.timeoutId = setTimeout(() => {
                // shut down  如果设置的数据填充结束，就发送shutdown 命令，并等待响应
                if (task.executionMode === 'shut_interval' && task.currentIndex === task.args.length - 1) {
                    this.processTask(task);
                }
                else {
                    // Move to the next index, or reset to 0 if we've reached the end of the array
                    task.currentIndex = (task.currentIndex + 1) % task.args.length;

                    // If we've looped through all args, cancel the task
                    if (task.currentIndex === 0 && task.args.length >= 1 && task.executionMode === 'interval') {
                        this.cancelTask(task.name);
                    } else {
                        this.processTask(task);
                    }
                }

            }, task.interval * 1000);
        }
    }
    }


export const scheduler = new SchedulerPipeline();