import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <meta
        name="description"
        content={`グラフィックスプログラミング関連技術についての覚え書き`}
      />
      <script type="text/javascript" src="./static/js/mathjax.js"></script>
      <script
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
      ></script>
    </Head>
  );
}
