import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  margin-left: 10vw;
  width: 90vw;
  max-height: 100vh;

  @media (max-width: 1920px) {
    margin-left: 15vw;
    width: 85vw;
  }

  @media (max-width: 1200px) {
    margin-left: 20vw;
    width: 80vw;
  }

  @media (max-width: 860px) {
    margin-left: 0;
    width: 100vw;
  }
`;
