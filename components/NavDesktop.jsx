import DesktopLink from './DesktopLink/DesktopLink';
import Link from 'next/link';

const t = {
  en: {
    home: 'Home',
    articles: 'Articles',
    courses: 'Courses',
    about: 'About Us'
  },
  es: {
    home: 'Inicio',
    articles: 'Articulos',
    courses: 'Cursos',
    about: 'Acerca de'
  }
};

const NavDesktop = ({ lang, hreflangs, ...props }) => {
  return (
    <nav className="hidden lg:flex justify-end w-2/3 items-center">
      <DesktopLink>{t[lang]['home']}</DesktopLink>
      <DesktopLink>{t[lang]['articles']}</DesktopLink>
      <DesktopLink>{t[lang]['courses']}</DesktopLink>
      <DesktopLink>{t[lang]['about']}</DesktopLink>
      <Link>
        <a
          href={lang === 'es' ? hreflangs['en'] : hreflangs['es']}
          className="font-semibold mx-8 bg-blue-600 text-center p-2 rounded text-white shadow cursor-pointer"
        >
          {lang === 'es' ? 'English' : 'Español'}
        </a>
      </Link>
    </nav>
  );
};

export default NavDesktop;
