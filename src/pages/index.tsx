import Head from "next/head";
import Main from "../components/main/Main";

const Home = () => {
  return (
    <>
      <Head>
        <title>Yet Another Cooking App</title>
        <meta
          name="description"
          content="Save your favorite receipes in a jiffy!"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <Main />
    </>
  );
};

export default Home;
