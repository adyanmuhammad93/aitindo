import Head from 'next/head'

export default function MetaHead({
  title = '',
  desc = '',
  keyword = '',
  image = '',
  url = '',
  price = '',
  script = '',
  scriptSrc= '',
  scriptDataClientKey='',
}) {
  return (
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, width=device-width"
      />
      <title>
        {title} - {process.env.WEB_NAME}
      </title>
      {desc && <meta name="description" content={desc} />}
      {keyword && <meta name="keywords" content={keyword} />}
      {price && <meta property="price:amount" content={price} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={image !== '' ? image : ''}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content="Welling Indonesia" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta
        name="twitter:image"
        content={image !== '' ? image : '/static/images/logo/jdtwimage.png'}
      />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site:id" content="@iboxindonesia" />
      <meta name="googlebot" content="index, follow, follow" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      {script && <script type="text/javascript" src={scriptSrc} data-client-key={scriptDataClientKey} />}
    </Head>
  )
}
