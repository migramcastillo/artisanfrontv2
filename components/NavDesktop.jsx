import DesktopLink from "./DesktopLink/DesktopLink";
import t from "../helpers/locales";

const NavDesktop = () => {
  return (
    <nav className="hidden lg:flex justify-end w-2/3 items-center">
      <DesktopLink as={t.home.link} href={t.home.page}>
        {t.home.name}
      </DesktopLink>
      <DesktopLink as={t.articles.link} href={t.articles.page}>
        {t.articles.name}
      </DesktopLink>
      <DesktopLink as={t.courses.link} href={t.courses.page}>
        {t.courses.name}
      </DesktopLink>
      {/* <DesktopLink as={t.about.link} href={t.about.page}>
        {t.about.name}
      </DesktopLink> */}
      {/* <Link href={lang === "es" ? hreflangs["en"] : hreflangs["es"]}>
        <a className="font-semibold mx-8 bg-green-500 text-center p-2 rounded text-white shadow cursor-pointer">
          {lang === "es" ? "English" : "Español"}
        </a>
      </Link> */}
    </nav>
  );
};

export default NavDesktop;
