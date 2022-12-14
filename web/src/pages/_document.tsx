import { Html, Head, Main, NextScript } from 'next/document';


export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500&display=swap' rel='stylesheet'></link>

        <title>PasswKeeper</title>
      </Head>

      <body className='bg-neutral-dark'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}