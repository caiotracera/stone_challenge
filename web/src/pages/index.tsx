import Head from 'next/head'
import { Container } from '../styles/index'

const Home: React.FC = () => {
  return (
    <div className="container">
      <Head>
        <title>Início - Move.it</title>
      </Head>
      <Container>
        <h1>Oi</h1>
      </Container>
    </div>
  )
}

export default Home
