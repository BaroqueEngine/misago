import Link from "next/link";

export default function Header() {
  return (
    <h2 className="bg-gray-700 font-index text-lg text-gray-300 py-7 px-7">
      <Link href="/">
        <a>みさご解体新書</a>
      </Link>
    </h2>
  );
}
