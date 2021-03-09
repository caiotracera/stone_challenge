import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1.5rem;

  color: #fff;

  img {
    width: 300px;
    height: 300px;
    border-radius: 50%;

    margin-bottom: 1.5rem;
  }

  h1 {
    margin-bottom: 3rem;
  }
`;

export const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 50%;
  text-align: center;

  ul {
    margin: 2.5rem;
    list-style: none;

    li {
      margin: 0.5rem 0;
      cursor: pointer;
    }
  }
`;
