import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyles } from './GlobalStyles';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Features from './sections/Features';
import ApiSection from './sections/ApiSection';
import ExamplesSection from './sections/ExamplesSection';
import SetupSection from './sections/SetupSection';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.15;
    z-index: -1;
  }

  &::before {
    background: #58A6FF;
    width: 300px;
    height: 300px;
    top: -100px;
    left: -100px;
  }

  &::after {
    background: #3D3B8E;
    width: 400px;
    height: 400px;
    bottom: -150px;
    right: -150px;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 2rem auto 0;
  background-color: var(--color-container-bg);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 700px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: var(--color-accent);
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: var(--color-container-bg);
  }
  &::before {
    width: 2px;
    height: 12px;
    left: 11px;
    top: 6px;
  }
  &::after {
    width: 12px;
    height: 2px;
    left: 6px;
    top: 11px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #0D1117;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  color: var(--color-text-secondary);
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: var(--color-text-primary);
  margin-right: 0.5rem;
  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainWrapper>
          <TopBar>
            <Logo>
              <LogoIcon />
              Tick.js
            </Logo>
          </TopBar>
          <ContentGrid>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Features />} />
                <Route path="/api" element={<ApiSection />} />
                <Route path="/examples" element={<ExamplesSection />} />
                <Route path="/setup" element={<SetupSection />} />
            </Routes>
          </ContentGrid>
        </MainWrapper>
        <Footer /> 
      </AppContainer>
    </>
  );
}

export default App;