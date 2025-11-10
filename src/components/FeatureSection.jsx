import styled from 'styled-components';
import CodeBlock from './CodeBlock';

const SectionGrid = styled.section`
  display: grid;
  grid-template-columns: ${props => props.$hasDiagram ? '1fr 1fr' : '1fr'};
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled.div`
  min-width: 0;
`;

const VisualContent = styled.div`
  min-width: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;

  svg {
    font-size: 2rem;
    color: var(--color-accent);
    flex-shrink: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
`;

const SectionDescription = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 65ch;
`;

const FeatureSection = ({ icon, title, description, code, diagram }) => (
  <SectionGrid $hasDiagram={!!diagram}> 
    <TextContent>
      <SectionHeader>
        {icon}
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      <SectionDescription>{description}</SectionDescription>
      {code && <CodeBlock code={code} />}
    </TextContent>
    {diagram && <VisualContent>{diagram}</VisualContent>}
  </SectionGrid>
);

export default FeatureSection;