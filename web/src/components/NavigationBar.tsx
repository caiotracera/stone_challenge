import { GetServerSideProps } from 'next'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/auth'
import api from '../services/api'
import {
  Container,
  Navigation,
  ProfileContainer
} from '../styles/components/NavigationBar'

export function NavigationBar() {
  const { user } = useContext(AuthContext)
  return (
    <Container>
      <Navigation>
        <ul>
          <li>
            <a href="/">Characters</a>
          </li>
          <li>
            <a href="/comics">Comics</a>
          </li>
          <li>
            <a href="/favorites">Favorites</a>
          </li>
        </ul>

        <ProfileContainer>
          {user.username}
          <img src={user.avatar_url} alt="caio" />
        </ProfileContainer>
      </Navigation>
    </Container>
  )
}
