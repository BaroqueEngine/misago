import Container from "../components/container";
import IndexArchive from "../components/index-archive";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>みさご解体新書</title>
        </Head>
        <Container>
          <header className="bg-gray-700 font-index text-gray-300">
            <div className="px-8 py-14">
              <h1 className="text-center">
                <a
                  className="text-4xl"
                  href="https://baroqueengine.net/misago/"
                >
                  みさご解体新書
                </a>
                <div className="mt-6 tracking-wider">
                  グラフィックスプログラミング関連技術についての覚え書き
                </div>
              </h1>
            </div>
          </header>
          <IndexArchive posts={allPosts} />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "slug", "tags", "weight"]);

  return {
    props: { allPosts },
  };
}
