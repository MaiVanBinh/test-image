import Head from 'next/head';
import Image from 'next/image';

export const loaderImageVex = ({ src, width }) => `${process.env.GOYOLO_URL}/_next/image?url=${src}&w=${width}&q=75`;
// export const loaderImageVex = ({ src, width }: { src: any, width: any }) => src;

export default function Home() {
  console.log('GOYOLO_URL', process.env.GOYOLO_URL);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>
          <Image
            loader={loaderImageVex}
            src="https://storage.googleapis.com/goyolo-uat/images/SeoVexImprove/partnerDesktop/partner-ml.webp"
            alt="logo"
            width="100px"
            height="34px"
            objectFit="contain"
          />
        </div>
      </main>
    </div>
  )
}
