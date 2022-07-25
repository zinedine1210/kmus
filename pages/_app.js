// Development css
import '../styles/globals.css'
// Production css
// import "../build.css"
import { ThemeProvider } from 'next-themes'
import {appWithTranslation} from "next-i18next"
import {SessionProvider} from "next-auth/react"

function MyApp({ Component, pageProps }) {

  return (
    <>
      <ThemeProvider enableSystem={false} attribute="class" defaultTheme='light'>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
