import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import Logo from '../assets/images/Logo.svg'
import LoginBox from '../components/LoginBox'
import { AuthContext } from '../hooks/auth'

import { Container, LeftContainer, RightContainer } from '../styles/pages/index'

export default function Home() {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [])
  return (
    <div className="container">
      <Head>
        <title>Login - Marvel Stone</title>
      </Head>

      <Container>
        <LeftContainer>
          <Logo />
        </LeftContainer>
        <RightContainer>
          <LoginBox />
        </RightContainer>
      </Container>
    </div>
  )
}
