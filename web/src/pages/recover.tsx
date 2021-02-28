import Head from 'next/head'

import Logo from '../assets/images/Logo.svg'
import RecoverBox from '../components/RecoverBox'

import {
  Container,
  LeftContainer,
  RightContainer
} from '../styles/pages/forgot'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Redefinir minha senha - Marvel Stone</title>
      </Head>

      <Container>
        <LeftContainer>
          <Logo />
        </LeftContainer>
        <RightContainer>
          <RecoverBox />
        </RightContainer>
      </Container>
    </div>
  )
}
