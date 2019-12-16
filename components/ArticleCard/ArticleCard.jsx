import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArticleCard = props => {
  const defaultImage =
    "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

  const bgImage = props.image || defaultImage;

  return (
    <a href="#">
      <div className="shadow-md my-2 flex flex-col justify-between h-48 lg:h-48 bg-gray-800 text-white rounded ">
        <div className="p-2">
          <h3 className="text-lg font-semibold">NextJS desde 0</h3>
          <p className="text-sm">With Sass PurgeCSS and Serverless</p>
        </div>

        <div className="p-2">
          <div className="flex items-center">
            <div>
              <p className="text-base font-semibold">Miguel Castillo</p>
              <p className="text-xs">20 Jun 2019 - 5 min.</p>
            </div>
            <div className="ml-auto self-end">
              <FontAwesomeIcon icon="link" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ArticleCard;
