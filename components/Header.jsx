import Link from "next/link";
import NavDesktop from "./NavDesktop";

const Header = ({ lang, hreflangs, ...props }) => {
  return (
    <header className="header bg-white text-gray-800 py-1 z-10 lg:sticky lg:top-0 lg:shadow-md">
      <div className="container mx-auto lg:p-2  lg:flex justify-between items-center">
        <div className="font-semibold text-2xl">
          <Link href="/">
            <a>ArtisanFront</a>
          </Link>
        </div>
        <NavDesktop lang={lang} hreflangs={hreflangs} />
      </div>
    </header>
  );
};

export default Header;
