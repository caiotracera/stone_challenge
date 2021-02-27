import Head from 'next/head'

import Logo from '../assets/images/Logo.svg'
import LoginBox from '../components/LoginBox'

import { Container, LeftContainer, RightContainer } from '../styles/pages/index'

export default function Home() {
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
