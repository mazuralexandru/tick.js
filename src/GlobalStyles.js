import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: #0D1117;
    --color-container-bg: #161B22;
    --color-border: #30363D;
    --color-text-primary: #C9D1D9;
    --color-text-secondary: #8B949E;
    --color-accent: #58A6FF;
    --color-accent-hover: #79B8FF;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'Fira Code', monospace;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #fff;
  }
`;