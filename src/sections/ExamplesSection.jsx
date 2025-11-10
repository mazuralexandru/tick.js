import styled from 'styled-components';
import CodeBlock from '../components/CodeBlock';

const SectionContainer = styled.div`
  padding: 2.5rem;
  color: var(--color-text-primary);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
`;

const Pattern = styled.div`
  margin-bottom: 3rem;
`;

const PatternTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const PatternDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  max-width: 75ch;
`;

const WarningBox = styled.div`
  margin-top: 4rem;
  padding: 1.5rem;
  border: 1px solid #793232;
  background-color: rgba(248, 81, 73, 0.1);
  border-radius: 8px;
`;

const WarningTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #F85149;
`;

const patterns = [
  {
    title: 'Pattern 1: A Simple Repeating Task (`setInterval`)',
    description: 'To create a repeating task, have the function reschedule itself.',
    code: `const LOG_TAG = 'system_logger';
const LOG_INTERVAL_TICKS = 200;

function logStatus() {
    // The T.now property holds the current tick number
    console.log(\`System status at tick \${T.now}: OK.\`);

    // Reschedule this exact function to run again, creating the loop.
    T.setTimeout(logStatus, LOG_INTERVAL_TICKS, LOG_TAG);
}

// Start the logger for the first time.
T.setTimeout(logStatus, 0, LOG_TAG);

// To stop it later: T.clearTimeout(LOG_TAG);`
  },
  {
    title: 'Pattern 2: Self-Canceling Loop',
    description: 'Use this for temporary effects. The loop stops by simply not rescheduling itself when a condition is met. To pass arguments, wrap the call in an anonymous function.',
    code: `const COUNTDOWN_TAG = 'launch_countdown';
const COUNTDOWN_FROM = 5;
const TICK_INTERVAL = 20; // Assuming 20 ticks per second

const doCountdown = (ticksLeft) => {
    if (ticksLeft > 0) {
        console.log(\`... \${ticksLeft}\`);
        // Reschedule with the decremented counter
        T.setTimeout(() => doCountdown(ticksLeft - 1), TICK_INTERVAL, COUNTDOWN_TAG);
    } else {
        console.log("Lift off!");
        // The condition is met, so we don't reschedule. The loop is finished.
    }
};

// Start the countdown
T.setTimeout(() => doCountdown(COUNTDOWN_FROM), 0, COUNTDOWN_TAG);`
  },
  {
    title: 'Pattern 3: Conditional Action Loop',
    description: 'Use this for tasks that run forever but only perform an action if a condition is met.',
    code: `let systemState = { users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob", needs_alert: true }] };
const ALERT_TAG = 'user_alert_monitor';
const CHECK_INTERVAL = 100;

function checkUserAlerts() {
    for (const user of systemState.users) {
        if (user.needs_alert) {
            console.log(\`Alerting user: \${user.name}!\`);
            user.needs_alert = false; // Action performed, condition reset
        }
    }
    // This loop runs forever, constantly monitoring the state.
    T.setTimeout(checkUserAlerts, CHECK_INTERVAL, ALERT_TAG);
};

T.setTimeout(checkUserAlerts, 0, ALERT_TAG);`
  },
  {
    title: 'Pattern 4: Task Sequence (Chained)',
    description: 'Execute a series of different tasks in a specific order with delays.',
    code: `const SEQUENCE_TAG = 'init_sequence';

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
T.setTimeout(initSequence[0], 0, SEQUENCE_TAG);`
  },
  {
    title: 'Pattern 5: Conditional Loop with Self-Invalidation',
    description: 'Use this for a repeating task that monitors a game state and stops itself permanently once a condition is met. This is perfect for main game loops that should end.',
    code: `let score = 0;
const SCORE_TO_WIN = 5;
const ANNOUNCER_TAG = 'game_announcer';
let gameOver = false;

function gameAnnouncerLoop() {
    if (gameOver) {
        return T.clearTimeout(ANNOUNCER_TAG);
    }
    console.log(\`Current score: \${score}. Reach \${SCORE_TO_WIN} to win.\`);
    T.setTimeout(gameAnnouncerLoop, 100, ANNOUNCER_TAG);
}

function scorePoint() {
    if (gameOver) return;
    score++;
    if (score >= SCORE_TO_WIN) {
        gameOver = true;
    }
}

// Start the announcer and simulate scoring points
T.setTimeout(gameAnnouncerLoop, 0, ANNOUNCER_TAG);
T.setTimeout(scorePoint, 60);
T.setTimeout(scorePoint, 120);
T.setTimeout(scorePoint, 300);`
  }
];

const errorNote = {
  title: 'A Critical Note on Errors',
  description: 'If a task scheduled with T.setTimeout throws an error, the T.update() function will fail. Because the host environment will relentlessly call its global heartbeat function, your script will get stuck in an infinite error loop, freezing the environment. Always wrap potentially failing operations in a try...catch block.',
  code: `// SAFE WAY to schedule a potentially risky operation
T.setTimeout(() => {
    try {
        let riskyObject = getRiskyObjectThatMightBeNull();
        console.log(riskyObject.property); // This line might throw an error
    } catch (e) {
        console.error("A scheduled task failed but was caught:", e);
    }
});`
};

const ExamplesSection = () => (
  <SectionContainer>
    <Title>Patterns & Examples</Title>
    {patterns.map(p => (
      <Pattern key={p.title}>
        <PatternTitle>{p.title}</PatternTitle>
        <PatternDescription>{p.description}</PatternDescription>
        <CodeBlock code={p.code} />
      </Pattern>
    ))}
    <WarningBox>
      <WarningTitle>{errorNote.title}</WarningTitle>
      <PatternDescription>{errorNote.description}</PatternDescription>
      <CodeBlock code={errorNote.code} />
    </WarningBox>
  </SectionContainer>
);

export default ExamplesSection;