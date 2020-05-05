import ArtisanFront from "../layouts/ArtisanFront";

const PrivacyNoticePage = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <p>This is privacy section</p>
    </ArtisanFront>
  );
};

export default PrivacyNoticePage;
