import Head from 'next/head';
import '../styles/globals.css';

// Essa é o ponto de entrada da aplicação, todos os demais componentes
// são carregados a partir daqui
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel='shortcut' href='../static/favicon.ico' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <title>Geo Trending</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
