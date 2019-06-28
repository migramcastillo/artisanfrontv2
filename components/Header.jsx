import NavDesktop from "./NavDesktop";

const Header = ({ lang, hreflangs, ...props }) => {
  return (
    <header className="header bg-white text-gray-800 py-1 z-10 lg:sticky lg:top-0 lg:shadow-md">
      <div className="container mx-auto lg:p-2  lg:flex justify-between items-center">
        <div>
          <img
            className="w-40 mx-auto"
            src="/static/logo_artisanfront_min.svg"
          />
        </div>
        <NavDesktop lang={lang} hreflangs={hreflangs} />
      </div>
    </header>
  );
};

export default Header;
