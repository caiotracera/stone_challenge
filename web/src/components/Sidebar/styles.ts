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

  @media (max-width: 1920px) {
    width: 15vw;
  }

  @media (max-width: 1200px) {
    width: 20vw;
  }

  @media (max-width: 860px) {
    position: relative;
    width: 100%;
    max-height: 220px;
    margin-bottom: 1rem;

    img.logo {
      display: none;
    }
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

      @media (max-width: 860px) {
        height: 100%;
      }
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

    @media (max-width: 860px) {
      height: 5000px;
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

  @media (max-width: 860px) {
    margin-top: 1.5rem;
    img {
      height: 25px;
      width: 25px;
    }
  }
`;
