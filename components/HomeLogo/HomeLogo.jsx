const HomeLogo = props => {
  const { image } = props;

  return (
    <figure className="flex-1 lg:flex-initial lg:w-24 lg:h-24 lg:border lg:border-gray-500 lg:-mx-2 lg:bg-white lg:rounded-full lg:flex lg:items-center lg:justify-center">
      <img className="px-4 py-1 lg:p-4" src={image} />
    </figure>
  );
};

export default HomeLogo;
