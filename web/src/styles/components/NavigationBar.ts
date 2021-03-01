import styled from 'styled-components'

export const Container = styled.header`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1rem;
`
export const Navigation = styled.nav`
  width: 80%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;

    li {
      font-size: 1rem;

      & + li {
        margin-left: 1rem;
      }
    }
  }
`

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    margin-left: 1.5rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`
