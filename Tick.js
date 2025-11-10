/**
 * Tick.js: A resilient, high-performance task scheduler for synchronous, tick-based JavaScript environments.
 * It provides a reliable implementation of setTimeout and setInterval patterns where native async functions are unavailable.
 * Designed to be driven by a host environment's global "heartbeat" function (e.g., `tick()`).
 *
 * The internal implementation is intentionally terse. It avoids standard control flow (if, for) in its core
 * executor, making it exceptionally resilient in sandboxed environments where script execution can be
 * unexpectedly interrupted.
 */
Tick = {
    // timeline: A map where keys are tick numbers and values are arrays of tasks.
    timeline: {},
    // stamps: A map to store the invalidation counters for tags.
    stamps: {},
    // now: The master clock for the scheduler.
    now: 0,
    // nonce: A "number used once" to uniquely identify operations and prevent stale execution.
    nonce: 0,
    // cursor: The index of the task currently being executed within the current tick's task list.
    cursor: 0,

    // The core executor. Uses a getter to create a "virtual loop" resilient to interruptions.
    executor: {
        get 1() {
            let tasksForTick = Tick.timeline[Tick.now],
                taskNode = tasksForTick[Tick.cursor],
                tagInvalidationId = Tick.stamps[taskNode[1]];
            // [task, no-op][is_invalid](); This is a terse, array-based conditional execution.
            [taskNode[0], _ => _][+(taskNode[2] < tagInvalidationId)]();
            // "Recurse" via getter if more tasks exist. `+()` converts boolean to 0 or 1.
            Tick.executor[+(++Tick.cursor < tasksForTick.length)];
        }
    },

    /**
     * Schedules a function to run after a specified delay in ticks.
     * Mimics `setTimeout`.
     */
    setTimeout(task, delayTicks, tag) {
        // `~delayTicks` is a terse bitwise operation to handle `undefined` or `0` delay.
        // `now - ~delayTicks - 1` is equivalent to `now + (delayTicks || 0)`.
        let targetTick = Tick.now - ~delayTicks - 1,
            taskNode = [task, ["_def_", tag][+!!tag], Tick.nonce++],
            // `[[], tasks][+!!tasks]` is a terse way of saying `tasks ? tasks : []`.
            tasksForTick = Tick.timeline[targetTick] = [[], Tick.timeline[targetTick]][+!!Tick.timeline[targetTick]];
        // `tasks[tasks.length] = node` is a terse equivalent of `tasks.push(node)`.
        tasksForTick[tasksForTick.length] = taskNode;
    },

    /**
     * Invalidates all pending tasks associated with a given tag.
     * Mimics `clearTimeout`.
     */
    clearTimeout(tag) {
        Tick.stamps[tag] = Tick.nonce++;
    },

    /**
     * The update function. This contains the logic from the original global `tick` function.
     * It should be called by the host environment's heartbeat.
     */
    update() {
        // `+!!tasks` converts the existence of a task list into a 0 or 1 to trigger the executor.
        Tick.executor[+(!!Tick.timeline[Tick.now])];
        delete Tick.timeline[Tick.now++];
        Tick.cursor = 0;
    }
};