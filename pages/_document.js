import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='scroll-smooth'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
      </body>
    </Html>
  )
}