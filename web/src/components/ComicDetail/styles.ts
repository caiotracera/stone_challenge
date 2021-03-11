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
    margin-bottom: 1.5rem;
  }

  .description {
    margin-top: 1.5rem;
  }
`;

export const ComicContainer = styled.div`
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

export const FavoriteContainer = styled.div`
  button {
    padding: 0.5rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;
