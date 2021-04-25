import Footer from "../components/footer";
import Meta from "../components/meta";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen bg-bg-color text-white">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
