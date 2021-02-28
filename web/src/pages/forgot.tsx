import Head from 'next/head'

import Logo from '../assets/images/Logo.svg'
import ForgotBox from '../components/ForgotBox'

import {
  Container,
  LeftContainer,
  RightContainer
} from '../styles/pages/forgot'

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
          <ForgotBox />
        </RightContainer>
      </Container>
    </div>
  )
}
