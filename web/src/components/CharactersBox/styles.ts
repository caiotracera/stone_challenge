import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1.5rem;

  color: #fff;

  h2 {
    margin-bottom: 3.5rem;
  }

  div#content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`;

export const CharactersContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
`;

export const Character = styled.div`
  cursor: pointer;
  border: 2px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  text-align: center;

  img {
    width: 100%;
    height: 145px;

    margin-bottom: 0.5rem;
  }
`;

export const FavContainer = styled.div`
  position: absolute;
  height: 24px;

  top: 5px;
  right: 5px;

  background: transparent;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

export const SelectedCharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 30%;
  height: 100%;

  margin-left: 2.5rem;
  overflow-y: auto;

  p.title {
    font-size: 24px;
    margin-bottom: 1.5rem;
  }

  img {
    width: 70%;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 5.5rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 45px;
    height: 45px;

    background: var(--background);
    border: 1px solid #fff;
    border-radius: 4px;

    transition: all 0.2s;

    & + div {
      margin-left: 1rem;
    }

    &:hover {
      cursor: pointer;
      background: var(--white);
      color: var(--background);
    }
  }
`;
