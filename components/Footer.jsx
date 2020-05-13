import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import t from "../helpers/locales";

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-2 pb-16 lg:pb-4 lg:pt-4">
      <div className="container mx-auto text-white text-xs lg:flex lg:justify-between lg:items-center">
        <nav className="text-center flex flex-col md:flex-row md:flex-wrap text-sm lg:flex-1 lg:text-left">
          <Link as={t.home.link} href={t.home.page}>
            <a className="lg:py-1 py-4 md:w-1/3">{t.home.name}</a>
          </Link>
          <Link as={t.articles.link} href={t.articles.page}>
            <a className="lg:py-1 py-4 md:w-1/3">{t.articles.name}</a>
          </Link>
          <Link as={t.courses.link} href={t.courses.page}>
            <a className="lg:py-1 py-4 md:w-1/3">{t.courses.name}</a>
          </Link>
          <Link as={t.privacy.link} href={t.privacy.page}>
            <a className="lg:py-1 py-4 md:w-1/3">{t.privacy.name}</a>
          </Link>
        </nav>
        <nav className="flex text-xl py-2 items-center justify-around lg:flex-1 lg:justify-center">
          <a className="lg:px-4">
            <FontAwesomeIcon icon={["fab", "github"]} />
          </a>
          <a className="lg:px-4">
            <FontAwesomeIcon icon={["fab", "youtube"]} />
          </a>
          <a className="lg:px-4">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
        </nav>
        <p className="text-center pt-3 lg:flex-1 lg:pt-0 lg:text-right">
          Artisan Front @ 2019
        </p>
      </div>
    </footer>
  );
};

export default Footer;
