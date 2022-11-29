import Head from 'next/head';
import '../styles/globals.css';

//essa é função principal responsavel pela pagina, definindo o cabeçalho da aplicação
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
