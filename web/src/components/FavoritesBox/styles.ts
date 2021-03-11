import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1.5rem;

  color: #fff;

  h2 {
    margin-bottom: 1.5rem;
  }

  div#content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`;

export const FavoritesContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 150px));
  grid-gap: 20px;
`;

export const Favorite = styled.div`
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

export const FavIconContainer = styled.div`
  position: absolute;

  top: 5px;
  right: 5px;

  background: transparent;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  margin-bottom: 3.5rem;
`;
