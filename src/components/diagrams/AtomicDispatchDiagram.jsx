import styled, { keyframes } from 'styled-components';

const moveExecutor = keyframes`
  0% { transform: translateX(0px); }
  24% { transform: translateX(0px); }
  25% { transform: translateX(60px); }
  49% { transform: translateX(60px); }
  50% { transform: translateX(120px); }
  74% { transform: translateX(120px); }
  75% { transform: translateX(180px); }
  100% { transform: translateX(180px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); background-color: var(--color-border); }
  50% { transform: scale(1.05); background-color: #444c56; }
`;

const DiagramContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #0D1117;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-family: var(--font-mono);
`;

const DiagramHeader = styled.h4`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TaskQueue = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  height: 40px;
`;

const TaskBlock = styled.div`
  width: 50px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--color-text-primary);
  background-color: var(--color-border);
  animation: ${pulse} 1s ease-in-out infinite;
  animation-play-state: paused;
`;

const Executor = styled.div`
  position: absolute;
  top: -10px;
  left: 15px;
  width: 20px;
  height: 4px;
  background-color: var(--color-accent);
  border-radius: 2px;
  animation: ${moveExecutor} 4s steps(1, end) infinite;

  &::after {
    content: 'cursor';
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: var(--color-accent);
  }
`;

const AnimatedQueue = styled(TaskQueue)`
  &:has(.executor-anim:active) #task-1 { animation-play-state: running; }

  .executor-anim {
    animation: ${moveExecutor} 4s steps(1, end) infinite;

    #task-1 { animation-delay: 0s; }
    #task-2 { animation-delay: -1s; }
    #task-3 { animation-delay: -2s; }
    #task-4 { animation-delay: -3s; }
  }

  .executor-anim:where(:not(:hover)) ~ #task-1 { animation: ${pulse} 1s ease-in-out -0s 4 running; }
  .executor-anim:where(:not(:hover)) ~ #task-2 { animation: ${pulse} 1s ease-in-out -1s 4 running; }
  .executor-anim:where(:not(:hover)) ~ #task-3 { animation: ${pulse} 1s ease-in-out -2s 4 running; }
  .executor-anim:where(:not(:hover)) ~ #task-4 { animation: ${pulse} 1s ease-in-out -3s 4 running; }
`;

const AtomicDispatchDiagram = () => (
  <DiagramContainer>
    <DiagramHeader>Tick Frame: Processing Task Queue</DiagramHeader>
    <AnimatedQueue>
      <Executor className="executor-anim" />
      <TaskBlock id="task-1">Task 1</TaskBlock>
      <TaskBlock id="task-2">Task 2</TaskBlock>
      <TaskBlock id="task-3">Task 3</TaskBlock>
      <TaskBlock id="task-4">Task 4</TaskBlock>
    </AnimatedQueue>
  </DiagramContainer>
);

export default AtomicDispatchDiagram;