import styled from 'styled-components';
import FeatureSection from '../components/FeatureSection';
import CodeBlock from '../components/CodeBlock';
import { IoSettingsOutline, IoShieldCheckmarkOutline, IoBanOutline } from 'react-icons/io5';
import AtomicDispatchDiagram from '../components/diagrams/AtomicDispatchDiagram';

const IntroSection = styled.section`
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
`;

const IntroText = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: 1.1rem;
  max-width: 75ch;
  margin-bottom: 2rem;
`;

const IntroSubHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SolutionList = styled.ul`
  list-style: none;
  padding-left: 0;
  color: var(--color-text-secondary);
  line-height: 1.8;

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    color: var(--color-text-primary);
  }
`;


const content = {
  atomicDispatch: {
    title: 'Atomic Dispatch',
    description: `Its core update() function and internal executor process only one task at a time before atomically updating its internal state.`,
    code: `const tasksForThisTick = [task1, task2, task3, task4];
for (let i = 0; i < tasksForThisTick.length; i++) {
    tasksForThisTick[i](); // If this halts, task3 and task4 are lost
}`,
    diagram: <AtomicDispatchDiagram />
  },
  guaranteedExecution: {
    title: 'Guaranteed Execution',
    description: `This state-driven "virtual loop" ensures that even if the script is terminated, no tasks are lost. The scheduler's state is designed to handle the next tick cleanly.`,
  },
  cancellation: {
    title: 'O(1) Cancellation',
    description: `The clearTimeout(tag) system is extremely performant. It performs a single, atomic operation to invalidate a tag without iterating through task lists.`,
  }
};

const ContentContainer = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Features = () => (
  <ContentContainer>
    <IntroSection>
      <IntroText>
        Tick.js is a minimalist, high-performance task scheduler designed for synchronous, tick-based JavaScript environments like game engines or systems using QuickJS. It provides a reliable way to run code after a delay or on a repeating interval where native async functions are unavailable.
      </IntroText>

      <IntroSubHeader>The Problem: Unexpected Execution Halts</IntroSubHeader>
      <IntroText style={{fontSize: '1rem', marginBottom: '1rem'}}>
        In many sandboxed environments, scripts have a limited "execution budget" per frame. If a script runs too long, the environment terminates it instantly to prevent freezing. This means a naive scheduler can lose tasks forever.
      </IntroText>
      <CodeBlock code={`// A simple but flawed scheduler
const tasksForThisTick = [task1, task2, task3, task4];
for (let i = 0; i < tasksForThisTick.length; i++) {
    // If execution halts here, task3 and task4 are lost forever.
    tasksForThisTick[i]();
}`} />

      <IntroSubHeader>The Tick.js Solution</IntroSubHeader>
      <SolutionList>
        <li><strong>Atomic Dispatch:</strong> Its core executor processes only one task at a time before atomically updating its internal state.</li>
        <li><strong>Guaranteed Execution:</strong> This state-driven "virtual loop" ensures that no tasks are lost, even if the script is terminated mid-frame.</li>
        <li><strong>O(1) Cancellation:</strong> The <code>clearTimeout(tag)</code> system is extremely performant, invalidating tasks with a single operation.</li>
      </SolutionList>
    </IntroSection>

    <FeatureSection
      icon={<IoSettingsOutline />}
      title={content.atomicDispatch.title}
      description={content.atomicDispatch.description}
      diagram={content.atomicDispatch.diagram}
    />
    <FeatureSection
      icon={<IoShieldCheckmarkOutline />}
      title={content.guaranteedExecution.title}
      description={content.guaranteedExecution.description}
    />
    <FeatureSection
      icon={<IoBanOutline />}
      title={content.cancellation.title}
      description={content.cancellation.description}
    />
  </ContentContainer>
);

export default Features;