const DesktopLink = ({ children, ...props }) => {
  return (
    <a className="font-semibold text-gray-700 mx-8 text-right hover:text-blue-400 cursor-pointer">
      {children}
    </a>
  );
};

export default DesktopLink;
