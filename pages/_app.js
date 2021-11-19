import "../css/index.css";
import Head from "next/head";
import Layout from "@components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Puzzle</title>
        <meta
          name="Puzze"
          content="A Puzzle app to play with images"
        />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
