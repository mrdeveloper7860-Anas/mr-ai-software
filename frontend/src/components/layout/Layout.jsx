import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-navy text-slate-100">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Navbar />
    <main id="main-content">{children}</main>
    <Footer />
  </div>
);

export default Layout;
