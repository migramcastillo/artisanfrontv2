import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import Link from "next/link";

const Card = ({ data, kind }) => {
  const { timestamp, description, author, title, bgImage, slug } = data;

  return (
    <Link
      as={kind === "course" ? `/cursos/${slug}` : `/articulos/${slug}`}
      href={kind === "course" ? "/cursos/[coursename]" : "/articulos/[slug]"}
    >
      <a>
        <div
          style={{
            backgroundImage: bgImage ? `url('/${bgImage}')` : "",
            backgroundSize: "50%",
          }}
          className="shadow-md my-2 flex flex-col justify-between h-48 lg:h-48 bg-gray-800 text-white rounded bg-center bg-no-repeat"
        >
          <div className="p-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {kind !== "course" && <p className="text-sm">{description}</p>}
          </div>

          <div className="p-2">
            <div className="flex items-center">
              <div>
                <p className="text-base font-semibold">{author}</p>
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
    </Link>
  );
};

export default Card;
