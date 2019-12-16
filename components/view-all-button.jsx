const ViewAllButton = ({ lang, href }) => {
  return (
    <a
      href={href}
      className="bg-blue-500 shadow rounded-full text-white block lg:w-1/3 lg:mx-auto lg:hover:bg-blue-600 lg:hover:text-white text-center text-sm p-2"
    >
      {lang === "es" ? "Ver todos" : "View all"}
    </a>
  );
};

export default ViewAllButton;
