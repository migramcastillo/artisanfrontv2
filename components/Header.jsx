import Link from "next/link";
import NavDesktop from "./NavDesktop";

const Header = () => {
  return (
    <header className="header bg-white text-gray-800 py-1 z-10 lg:sticky lg:top-0 lg:shadow-md">
      <div className="container mx-auto lg:p-2  lg:flex justify-between items-center">
        <div className="font-semibold text-2xl lg:text-left text-center">
          <Link href="/">
            <a>ArtisanFront</a>
          </Link>
        </div>
        <NavDesktop />
      </div>
    </header>
  );
};

export default Header;
