import HomeLogo from '../HomeLogo/HomeLogo';

const locales = {
  en: {
    h1: 'Doing front end on Laravel will be a pleasure trip',
    intro: `This is the blog for Laravel developers who want a easy to use guide and
        a cookbook for doing FrontEnd stuff.`
  },
  es: {
    h1: 'Mejorando la experiencia de hacer Frontend en Laravel',
    intro: `Este es un blog para los desarrolladores Laravel que quieren una guía fácil y ejemplos de Frontend.`
  }
};

const HomeIntro = ({ lang, ...props }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl my-2 leading-relaxed text-gray-900 font-bold">
        {locales[lang]['h1']}
      </h1>
      <p className="my-2 leading-relaxed text-gray-700">
        {locales[lang]['intro']}
      </p>
      <div className="flex items-center justify-around lg:justify-center lg:items-stretch">
        <HomeLogo image="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png" />
        <HomeLogo image="https://carlos-herrera.com/wp-content/uploads/2015/06/1423519219laravel-l-slant.png" />
        <HomeLogo image="https://i0.wp.com/courseclub.net/wp-content/uploads/2018/10/65432123.png" />
        <HomeLogo image="http://www.stickpng.com/assets/images/5847ea22cef1014c0b5e4833.png" />
        <HomeLogo image="https://vuejs.org/images/logo.png" />
        <HomeLogo image="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" />
      </div>
    </div>
  );
};

export default HomeIntro;
