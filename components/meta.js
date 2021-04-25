import Head from "next/head";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "../lib/constants";

export default function Meta() {
  return (
    <Head>
      <meta
        name="description"
        content={`グラフィックスプログラミング関連技術についての覚え書き`}
      />
      <script type="text/javascript" src="./static/mathjax.js"></script>
      <script
        id="MathJax-script"
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
      ></script>
    </Head>
  );
}
