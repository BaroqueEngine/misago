import Link from "next/link";

export default function PostPreview({ title, slug }) {
  return (
    <div>
      <h3 className="text-1xl mb-2 leading-snug">
        <Link as={`/${slug}/`} href="/[slug]/">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
    </div>
  );
}
