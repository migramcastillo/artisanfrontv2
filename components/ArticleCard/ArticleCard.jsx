const ArticleCard = props => {
  const defaultImage =
    'https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

  const bgImage = props.image || defaultImage;

  return (
    <div
      className="shadow my-2 flex flex-col justify-between h-48 bg-center bg-no-repeat bg-cover text-white rounded "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="p-1">
        <div className="flex items-center">
          <figure className="w-8 h-8 mx-1">
            <img
              className="rounded-full h-full w-full border-gray-200 border-solid border"
              src="https://pbs.twimg.com/profile_images/1026491893000155137/LQJoeRMq.jpg"
            />
          </figure>
          <div>
            <h2 className="text-base font-semibold">Miguel Castillo</h2>
            <p className="text-xs">20 Jun 2019 - 5 min.</p>
          </div>
        </div>
      </div>
      <div className="p-1">
        <h2 className="text-lg font-semibold">Using Tailwind with NextJS</h2>
        <p className="text-sm">With Sass PurgeCSS and Serverless</p>
      </div>
    </div>
  );
};

export default ArticleCard;
