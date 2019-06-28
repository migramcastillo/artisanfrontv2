import Link from "next/link";

const DesktopLink = ({ href, as, children, ...props }) => {
  return (
    <Link href={href} as={as}>
      <a className="font-semibold text-gray-700 mx-8 text-right hover:text-blue-400 cursor-pointer">
        {children}
      </a>
    </Link>
  );
};

export default DesktopLink;
