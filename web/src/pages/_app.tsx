import { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'

import AppProvder from '../hooks'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvder>
      <GlobalStyle />
      <Component {...pageProps} />
    </AppProvder>
  )
}

export default App
