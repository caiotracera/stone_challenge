import { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import 'react-toastify/dist/ReactToastify.css'

import AppProvider from '../hooks'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default App
