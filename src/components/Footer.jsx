import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 2rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
`;

const FooterLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--color-text-primary);
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterLink href="https://github.com/mazuralexandru/tick.js" target="_blank" rel="noopener noreferrer">
      <FaGithub />
      <span>View on GitHub - Created by Alexandru Mazur</span>
    </FooterLink>
  </FooterContainer>
);

export default Footer;