const Header = props => {
  return (
    <header className="header bg-white text-gray-800 py-1 text-center">
      <nav>
        <img className="logotipo" src="/static/logo_artisanfront_min.svg" />
      </nav>
      <style jsx>{`
        .header > nav >.logotipo{
          width: 200px;
        }
      `}</style>
    </header>
  );
};

export default Header;
