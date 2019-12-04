import ArtisanFront from "../../layouts/ArtisanFront";
import WithLanguage from "../../hoc/with-language";

export const PrivacyNoticePage = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <p>This is privacy section</p>
    </ArtisanFront>
  );
};

PrivacyNoticePage.getInitialProps = async ctx => {
  return {
    hreflangs: { es: "/aviso-de-privacidad", en: "/english/privacy-notice" }
  };
};

export default WithLanguage(PrivacyNoticePage, "en");
