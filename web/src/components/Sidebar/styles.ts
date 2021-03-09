import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100vh;
  width: 10vw;
  position: fixed;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img.logo {
    margin: 0 auto;
    padding: 1.5rem;
    width: 70%;
  }
`;

export const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    cursor: pointer;
    width: 90%;
    height: 56px;
    display: flex;
    align-items: center;

    svg {
      margin: 0 1.5rem 0 1.5rem;
    }

    color: #fff;
    transition: all 0.2s;

    &:hover {
      border-left: 3px solid white;
      font-weight: bold;
    }

    &.active {
      border-left: 3px solid white;
      font-weight: bold;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  color: var(--white);

  margin: 0;
  transition: all 0.2s;

  img {
    width: 25%;
    border-radius: 50%;

    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }

  &:hover {
    background: ${darken(0.05, '#d71414')};
  }
`;
