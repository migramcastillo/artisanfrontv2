import React, { Component } from "react";

const WithLanguage = (WrappedComponent, lang) => {
  return class HOC extends Component {
    static async getInitialProps(ctx) {
      const pageProps = await WrappedComponent.getInitialProps({
        ...ctx,
        lang
      });
      return { ...pageProps, lang };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default WithLanguage;
