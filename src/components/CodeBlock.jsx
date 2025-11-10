import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { IoClipboardOutline, IoCheckmarkDoneOutline } from 'react-icons/io5';

const CodeWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-border);
  border: none;
  color: var(--color-text-secondary);
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background: #444c56;
    color: var(--color-text-primary);
  }
`;

const CodeContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.875rem;
  background-color: #1c1c1c;
`;

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CodeWrapper>
      <CopyButton onClick={handleCopy}>
        {copied ? <IoCheckmarkDoneOutline /> : <IoClipboardOutline />}
        {copied ? 'Copied!' : 'Copy'}
      </CopyButton>
      <CodeContainer>
        <SyntaxHighlighter 
          language="javascript" 
          style={atomDark}
          showLineNumbers
          PreTag="div"
          customStyle={{ 
            margin: 0, 
            padding: '1.5rem', 
            paddingTop: '3rem', 
            background: 'transparent',
            overflowX: 'auto',
          }}
          codeTagProps={{ style: { fontFamily: 'var(--font-mono)' } }}
        >
          {code}
        </SyntaxHighlighter>
      </CodeContainer>
    </CodeWrapper>
  );
};

export default CodeBlock;