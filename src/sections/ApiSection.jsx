import styled from 'styled-components';

const SectionContainer = styled.div`
  padding: 2.5rem;
  color: var(--color-text-primary);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  font-size: 0.9rem;

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
    vertical-align: top;
  }

  th {
    color: var(--color-text-secondary);
    font-weight: 500;
  }

  code {
    background-color: rgba(139, 148, 158, 0.15);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: var(--font-mono);
  }
`;

const ApiSection = () => (
  <SectionContainer>
    <Title>API Reference</Title>
    <Table>
      <thead>
        <tr>
          <th>Function</th>
          <th>Signature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>setTimeout</code></td>
          <td><code>T.setTimeout(task, delay, tag)</code></td>
          <td>Schedules a function to run once after a <code>delay</code> of ticks.</td>
        </tr>
        <tr>
          <td><code>clearTimeout</code></td>
          <td><code>T.clearTimeout(tag)</code></td>
          <td>Invalidates all pending tasks with a given <code>tag</code>.</td>
        </tr>
      </tbody>
    </Table>
  </SectionContainer>
);

export default ApiSection;