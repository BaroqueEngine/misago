import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <meta
        name="description"
        content={`グラフィックスプログラミング関連技術についての覚え書き`}
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.13.3/dist/katex.min.css"
        integrity="sha384-ThssJ7YtjywV52Gj4JE/1SQEDoMEckXyhkFVwaf4nDSm5OBlXeedVYjuuUd0Yua+"
        crossOrigin="anonymous"
      ></link>
    </Head>
  );
}
