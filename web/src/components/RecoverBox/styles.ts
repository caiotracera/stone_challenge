import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: var(--background);
  color: var(--white);
  border-radius: 5px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  strong {
    font-size: 2.25rem;
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
    font-family: Rajdhani;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    line-height: 1.4;
    margin: 1rem 0;
  }
`;
export const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  font-size: 13px;
  span {
    margin-left: 5px;
    font-weight: bold;
  }
`;
