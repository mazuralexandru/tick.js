# Tick.js: A Resilient Scheduler for Synchronous Environments

Tick.js is a minimalist, high-performance task scheduler designed specifically for synchronous, tick-based JavaScript environments like game engines, simulators, or systems using **QuickJS**. It provides a reliable way to run code after a delay (`setTimeout`) or on a repeating interval (`setInterval`) in environments where native async functions are unavailable.

Its core purpose is to provide **resilience against unexpected script termination**. The internal implementation is intentionally terse, avoiding standard control flow in its core executor to guarantee task completion even when the host environment halts script execution mid-frame.


## Web doccumentation [https://tickjs.netlify.app/](https://tickjs.netlify.app/)
## The Problem: Unexpected Execution Halts

In many sandboxed or resource-constrained environments, scripts operate on a limited "execution budget" per frame or tick. If a script performs too many operations (e.g., function calls, complex loops), the environment may terminate it instantly to prevent freezing. This is not a catchable error - the script simply stops.

Consider a naive scheduler:
```javascript
// A simple but flawed scheduler
const tasksForThisTick = [task1, task2, task3, task4];
for (let i = 0; i < tasksForThisTick.length; i++) {
    tasksForThisTick[i](); // Run the task
}
```
If the environment halts execution while running `task2`, then `task3` and `task4` are **lost forever**. They will never be run or retried.

## The Tick.js Solution
Tick.js is architected to be immune to this problem.

-   **Atomic Dispatch:** Its core `update()` function and internal `executor` process only one task at a time before atomically updating its internal state (`cursor`).
-   **Guaranteed Execution:** This state-driven "virtual loop" ensures that even if the script is terminated, no tasks are lost. The scheduler's state is designed to handle the next tick cleanly, and the scheduling of tasks itself is an uninterruptible operation.
-   **O(1) Cancellation:** The `clearTimeout(tag)` system is extremely performant. It performs a single, atomic operation to invalidate a tag without iterating through task lists. Cancelling 1,000 tasks is as fast as cancelling one.

---

## Setup

**Step 1: Paste the Library**

Paste this minified code at the very top of your script. This creates the scheduler object, aliased as `T` for brevity. (159 characters)

```js
T={timeline:{},stamps:{},now:0,nonce:0,cursor:0,executor:{get 1(){let t=T.timeline[T.now],e=t[T.cursor],s=T.stamps[e[1]];[e[0],_=>_][+(e[2]<s)](),T.executor[+(++T.cursor<t.length)]}},setTimeout(t,e,s){let i=T.now-~e-1,n=[t,["_def_",s][+!!s],T.nonce++],o=T.timeline[i]=[[],T.timeline[i]][+!!T.timeline[i]];o[o.length]=n},clearTimeout(t){T.stamps[t]=T.nonce++},update(){T.executor[+!!T.timeline[T.now]],delete T.timeline[T.now++],T.cursor=0}}
```

**Step 2: Connect to the Environment's Heartbeat**

Your host environment will automatically call a global function on every frame (~20-60 times per second). **This function's name is not standardized.** Check your environment's documentation for the correct name (e.g., `tick`, `onUpdate`, `onFrame`).

Connect Tick.js by defining that function and having it call `T.update()`.

```js
// Example if your environment uses tick()
tick = () => T.update();
```

---

## API Reference

| Function | Signature | Description |
| :--- | :--- | :--- |
| `setTimeout` | `T.setTimeout(task, delay, tag)` | Schedules a function to run once after a `delay` of ticks. |
| `clearTimeout` | `T.clearTimeout(tag)` | Invalidates all pending tasks with a given `tag`. |

---

## Patterns & Examples

### Pattern 1: A Simple Repeating Task (`setInterval`)
To create a repeating task, have the function reschedule itself.

```javascript
const LOG_TAG = 'system_logger';
const LOG_INTERVAL_TICKS = 200;

function logStatus() {
    // The T.now property holds the current tick number
    console.log(`System status at tick ${T.now}: OK.`);

    // Reschedule this exact function to run again, creating the loop.
    T.setTimeout(logStatus, LOG_INTERVAL_TICKS, LOG_TAG);
}

// Start the logger for the first time.
T.setTimeout(logStatus, 0, LOG_TAG);

// To stop it later: T.clearTimeout(LOG_TAG);
```

### Pattern 2: Self-Canceling Loop
Use this for temporary effects. The loop stops by simply *not rescheduling itself* when a condition is met. To pass arguments, wrap the call in an anonymous function: `() => myFunction(arg)`.

```javascript
const COUNTDOWN_TAG = 'launch_countdown';
const COUNTDOWN_FROM = 5;
const TICK_INTERVAL = 20; // Assuming 20 ticks per second

const doCountdown = (ticksLeft) => {
    if (ticksLeft > 0) {
        console.log(`... ${ticksLeft}`);
        // Reschedule with the decremented counter
        T.setTimeout(() => doCountdown(ticksLeft - 1), TICK_INTERVAL, COUNTDOWN_TAG);
    } else {
        console.log("Lift off!");
        // The condition is met, so we don't reschedule. The loop is finished.
    }
};

// Start the countdown
T.setTimeout(() => doCountdown(COUNTDOWN_FROM), 0, COUNTDOWN_TAG);
```

### Pattern 3: Conditional Action Loop
Use this for tasks that run forever but only perform an action if a condition is met.

```javascript
let systemState = { users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob", needs_alert: true }] };
const ALERT_TAG = 'user_alert_monitor';
const CHECK_INTERVAL = 100;

function checkUserAlerts() {
    for (const user of systemState.users) {
        if (user.needs_alert) {
            console.log(`Alerting user: ${user.name}!`);
            user.needs_alert = false; // Action performed, condition reset
        }
    }
    // This loop runs forever, constantly monitoring the state.
    T.setTimeout(checkUserAlerts, CHECK_INTERVAL, ALERT_TAG);
};

T.setTimeout(checkUserAlerts, 0, ALERT_TAG);
```

### Pattern 4: Task Sequence (Chained)
Execute a series of different tasks in a specific order with delays.

```javascript
const SEQUENCE_TAG = 'init_sequence';

const initSequence = [
    () => {
        console.log("Step 1: Initializing modules...");
        T.setTimeout(initSequence[1], 40, SEQUENCE_TAG); // 40 tick delay
    },
    () => {
        console.log("Step 2: Connecting to database...");
        T.setTimeout(initSequence[2], 80, SEQUENCE_TAG); // 80 tick delay
    },
    () => {
        console.log("Step 3: Seeding initial data...");
        T.setTimeout(initSequence[3], 20, SEQUENCE_TAG); // 20 tick delay
    },
    () => {
        console.log("Initialization complete!");
        // Last step, no further scheduling.
    }
];

// Start the sequence
T.setTimeout(initSequence[0], 0, SEQUENCE_TAG);
```

### Pattern 5: Conditional Loop with Self-Invalidation
Use this for a repeating task that monitors a game state and stops itself permanently once a condition is met. This is perfect for main game loops that should end.

```javascript
let score = 0;
const SCORE_TO_WIN = 5;
const ANNOUNCER_TAG = 'game_announcer';
let gameOver = false;

// This function runs every 5 seconds to announce the score.
function gameAnnouncerLoop() {
    if (gameOver) {
        // The game is over, so invalidate the tag to stop this loop permanently.
        // Returning here is good practice.
        return T.clearTimeout(ANNOUNCER_TAG);
    }

    console.log(`Current score: ${score}. Reach ${SCORE_TO_WIN} to win.`);
    T.setTimeout(gameAnnouncerLoop, 100, ANNOUNCER_TAG); // 100 ticks = 5s @ 20tps
}

// This function simulates the game logic that changes the state.
function scorePoint() {
    if (gameOver) return;
    score++;
    console.log(`Point scored! New score: ${score}`);
    if (score >= SCORE_TO_WIN) {
        console.log("You win!");
        gameOver = true; // Set the flag that the announcer loop will see.
    }
}

// Start the announcer
T.setTimeout(gameAnnouncerLoop, 0, ANNOUNCER_TAG);

// Simulate scoring points over time
T.setTimeout(scorePoint, 60);
T.setTimeout(scorePoint, 120);
T.setTimeout(scorePoint, 180);
T.setTimeout(scorePoint, 240);
T.setTimeout(scorePoint, 300); // Game will end here
```

---

## A Critical Note on Errors

If a task scheduled with `T.setTimeout` throws an error, the `T.update()` function will fail. Because the host environment will relentlessly call its global heartbeat function, your script will get **stuck in an infinite error loop**, freezing the environment.

**Solution:** Always write safe code. For any operation that *might* fail, wrap it in a `try...catch` block.

```javascript
// SAFE WAY to schedule a potentially risky operation
T.setTimeout(() => {
    try {
        let riskyObject = getRiskyObjectThatMightBeNull();
        console.log(riskyObject.property); // This line might throw an error
    } catch (e) {
        console.error("A scheduled task failed but was caught:", e);
    }
});
```