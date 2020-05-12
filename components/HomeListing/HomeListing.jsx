import Card from "../Card/Card";

const HomeListing = ({ listing, kind }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center">
      {Array.from(listing).map((element, index) => (
        <div key={index} className="md:w-1/3 md:px-1">
          <Card data={element} kind={kind} />
        </div>
      ))}
    </div>
  );
};

export default HomeListing;
