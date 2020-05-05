import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";

const ArticleCard = ({ data, image, ...props }) => {
  const defaultImage =
    "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

  const bgImage = props.image || defaultImage;
  const { title, timestamp, description, slug } = data;

  return (
    <a href={`/articulos/${slug}`}>
      <div className="shadow-md my-2 flex flex-col justify-between h-48 lg:h-48 bg-gray-800 text-white rounded ">
        <div className="p-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>

        <div className="p-2">
          <div className="flex items-center">
            <div>
              <p className="text-base font-semibold">Miguel Castillo</p>
              <p className="text-xs">
                {dayjs(timestamp).format("DD MMM YYYY")}
              </p>
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
