import Head from 'next/head'

import Logo from '../assets/images/Logo.svg'
import RegisterBox from '../components/RegisterBox'

import {
  Container,
  LeftContainer,
  RightContainer
} from '../styles/pages/register'

export default function Register() {
  return (
    <div className="container">
      <Head>
        <title>Cria sua conta - Marvel Stone</title>
      </Head>

      <Container>
        <LeftContainer>
          <Logo />
        </LeftContainer>
        <RightContainer>
          <RegisterBox />
        </RightContainer>
      </Container>
    </div>
  )
}
