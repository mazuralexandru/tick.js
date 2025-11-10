import styled from 'styled-components';
import CodeBlock from '../components/CodeBlock';

const SectionContainer = styled.div`
  padding: 2.5rem;
  color: var(--color-text-primary);
  overflow: hidden; 

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

const Step = styled.div`
  margin-bottom: 3rem;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const setupSteps = [
  {
    title: 'Step 1: Paste the Library',
    description: 'Paste this minified code at the very top of your script. This creates the scheduler object, aliased as T for brevity. (159 characters)',
    code: `T={timeline:{},stamps:{},now:0,nonce:0,cursor:0,executor:{get 1(){let t=T.timeline[T.now],e=t[T.cursor],s=T.stamps[e[1]];[e[0],_=>_][+(e[2]<s)](),T.executor[+(++T.cursor<t.length)]}},setTimeout(t,e,s){let i=T.now-~e-1,n=[t,["_def_",s][+!!s],T.nonce++],o=T.timeline[i]=[[],T.timeline[i]][+!!T.timeline[i]];o[o.length]=n},clearTimeout(t){T.stamps[t]=T.nonce++},update(){T.executor[+!!T.timeline[T.now]],delete T.timeline[T.now++],T.cursor=0}}`
  },
  {
    title: "Step 2: Connect to the Environment's Heartbeat",
    description: "Your host environment will automatically call a global function on every frame (~20-60 times per second). Check your environment's documentation for the correct name (e.g., tick, onUpdate, onFrame). Connect Tick.js by defining that function and having it call T.update().",
    code: `// Example if your environment uses tick()
tick = () => T.update();`
  }
];

const SetupSection = () => (
  <SectionContainer>
    <Title>Setup</Title>
    {setupSteps.map(step => (
      <Step key={step.title}>
        <StepTitle>{step.title}</StepTitle>
        <StepDescription>{step.description}</StepDescription>
        <CodeBlock code={step.code} />
      </Step>
    ))}
  </SectionContainer>
);

export default SetupSection;