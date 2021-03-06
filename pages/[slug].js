import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../components/container";
import PostBody from "../components/post-body";
import Header from "../components/header";
import PostHeader from "../components/post-header";
import Layout from "../components/layout";
import { getPostBySlug, getAllPosts } from "../lib/api";
import PostTitle from "../components/post-title";
import Head from "next/head";
import markdownToHtml from "../lib/markdownToHtml";

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="px-8 py-20">
              <Head>
                <title>{post.title} | みさご解体新書</title>
              </Head>
              <PostHeader title={post.title} />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ["title", "slug", "content"]);
  const content = markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts["undefined"].map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
