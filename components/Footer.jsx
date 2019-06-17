import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-2 pb-16">
      <div className="container mx-auto text-white text-xs">
        <nav className="text-center flex flex-col md:flex-row md:flex-wrap text-sm">
          <a className="py-1 md:w-1/3">Home</a>
          <a className="py-1 md:w-1/3">Articles</a>
          <a className="py-1 md:w-1/3">Courses</a>
          <a className="py-1 md:w-1/3">About</a>
          <a className="py-1 md:w-1/3">Privacy</a>
        </nav>
        <nav className="flex text-xl py-2 items-center justify-around">
          <a>
            <FontAwesomeIcon icon={['fab', 'github']} />
          </a>
          <a>
            <FontAwesomeIcon icon={['fab', 'youtube']} />
          </a>
          <a>
            <FontAwesomeIcon icon={['fab', 'twitter']} />
          </a>
        </nav>
        <p className="text-center pt-3">Artisan Front @ 2019</p>
      </div>
    </footer>
  );
};

export default Footer;
