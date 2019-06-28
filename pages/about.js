import { Component } from "react";
import Link from "next/link";
import Header from "../components/Header";
import ArtisanFront from "../layouts/ArtisanFront";

const AboutPage = ({ lang, hreflangs }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <div className="container mx-auto py-4">
        <h1 className="text-3xl text-semibold text-gray-900">
          {lang === "es" ? "Acerca de Artisan Front" : "About Artisan Front"}
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </ArtisanFront>
  );
};
AboutPage.getInitialProps = async ({ query, res }) => {
  const { lang } = query;

  return {
    lang,
    hreflangs: { es: "/es/acerca-de", en: "/en/about" }
  };
};

export default AboutPage;
