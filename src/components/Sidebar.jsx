import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SidebarContainer = styled.aside`
  padding: 1.5rem;
  border-right: 1px solid var(--color-border);

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
`;

const NavList = styled.ul`
  list-style: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    gap: 1rem;
  }
`;

const NavItem = styled.li`
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0;
    flex-grow: 1;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-text-secondary);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  display: block;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  text-align: left;

  &:hover {
    background-color: rgba(139, 148, 158, 0.1);
    color: var(--color-text-primary);
  }

  &.active {
    background-color: var(--color-accent);
    color: #fff;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Sidebar = () => (
  <SidebarContainer>
    <NavList>
      <NavItem><StyledNavLink to="/" end>Features</StyledNavLink></NavItem>
      <NavItem><StyledNavLink to="/api">API</StyledNavLink></NavItem>
      <NavItem><StyledNavLink to="/examples">Examples</StyledNavLink></NavItem>
      <NavItem><StyledNavLink to="/setup">Setup</StyledNavLink></NavItem>
    </NavList>
  </SidebarContainer>
);

export default Sidebar;