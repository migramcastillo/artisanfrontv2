import ArtisanFront from "../../../layouts/ArtisanFront";
import WithLanguage from "../../../hoc/with-language";

export const CoursePage = () => {
  return (
    <ArtisanFront>
      <h1>Página de curso</h1>
    </ArtisanFront>
  );
};

export default WithLanguage(CoursePage, "en");
