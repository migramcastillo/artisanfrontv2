import ArtisanFront from '../layouts/ArtisanFront';

const Privacy = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <p>This is privacy section</p>
    </ArtisanFront>
  );
};

Privacy.getInitialProps = async ({ query, res }) => {
  const { lang } = query;

  return {
    lang,
    hreflangs: { es: '/es/aviso-de-privacy/', en: '/en/privacy-notice/' }
  };
};

export default Privacy;
