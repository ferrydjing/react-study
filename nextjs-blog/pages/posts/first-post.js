import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'

const FirstPost = () => {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>111</h1>
      <Link href='/'>
        <a>Index</a>
      </Link>
      <style jsx>
        {`
          .container {
            margin: 0;
            padding: 0;
            background: red;
          }
        `}
      </style>
    </Layout>
  )
}

export default FirstPost
