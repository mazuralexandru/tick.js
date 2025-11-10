import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -2px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Header = () => (
  <HeaderContainer>
    <Title>Tick.js</Title>
    <Subtitle>A Resilient Scheduler for Synchronous Environments</Subtitle>
  </HeaderContainer>
);

export default Header;