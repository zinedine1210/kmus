// Development css
import '../styles/globals.css'
// Production css
// import "../build.css"
import { ThemeProvider } from 'next-themes'
import {appWithTranslation} from "next-i18next"

function MyApp({ Component, pageProps }) {

  return (
    <>
      <ThemeProvider enableSystem={false} attribute="class" defaultTheme='light'>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
