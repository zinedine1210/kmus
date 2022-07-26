import Head from "next/head";
import { withRouter } from 'next/router'

const SEO = ({ title, description, image, router}) => {
  const defaultTitle = "KOPERASI JASA MITRA USAHA SENTOSA",
    defaultDescription = "WEBSITE KOPERASI JASA MITRA USAHA SENTOSA",
    siteUrl = "https://mms.kmus.org",
    defaultImage = `${siteUrl}/icongen/android-chrome-192x192.png`,
    twitterUsername = "koperasijasamitrausahasentosa"
    // twitterUsername,
  

  const seo = {
    title: `${title} - ${defaultTitle}` || defaultTitle,
    description: `${description}` || defaultDescription,
    image: `${image || defaultImage}`,
    url: `${siteUrl}${router.asPath}`
  }

  return (
    <Head>
       <meta charSet="utf-8"/>
       <title>{seo.title}</title>
       <link rel="icon" href="/favicon.ico"/>
       <meta name="description" content={seo.description} />
       <meta name="viewport" content="width=device-width, initial-scale=1"/>
       <meta name="theme-color" content="#000000"/>
       <link rel="apple-touch-icon" href="/icongen/apple-touch-icon.png"/>
       <link rel="manifest" href="/manifest.json"/>
       <meta name="image" content={seo.image} />
       <meta property="og:title" content={seo.title} />
       <meta property="og:description" content={seo.description} />
       <meta property="og:image" content={seo.image} />
       <meta property="og:url" content={seo.url} />
       <meta property="og:type" content="website" />
       <meta name="twitter:creator" content={twitterUsername} />
       <meta name="twitter:title" content={seo.title} />
       <meta name="twitter:description" content={seo.description} />
       <meta name="twitter:image" content={seo.image} />
    </Head>
  )
}

export default withRouter(SEO)