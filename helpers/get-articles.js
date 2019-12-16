import relation from "../articles/relation.json";
import dayjs from "dayjs";

export const getAllArticles = lang => {
  const articlesArr = Object.keys(relation)
    .map(article => {
      const timestamp = relation[article].timestamp;
      const data = relation[article][lang];

      return {
        lang,
        timestamp,
        ...data
      };
    })
    .sort((a, b) => {
      a = dayjs(a.timestamp).toDate();
      b = dayjs(b.timestamp).toDate();
      return a > b ? -1 : a < b ? 1 : 0;
    });

  return articlesArr;
};

export const getLastArticles = (quantity, lang) => {
  const articlesArr = Object.keys(relation)
    .map(article => {
      const timestamp = relation[article].timestamp;
      const data = relation[article][lang];

      return {
        lang,
        timestamp,
        ...data
      };
    })
    .sort((a, b) => {
      a = dayjs(a.timestamp).toDate();
      b = dayjs(b.timestamp).toDate();
      return a > b ? -1 : a < b ? 1 : 0;
    })
    .slice(0, quantity);

  return articlesArr;
};

export const getArticleBySlug = slug => {
  const slugsFromArticles = Object.keys(relation).map(article => {
    const { es, en } = relation[article];

    return {
      key: article,
      slugs: [es.slug, en.slug]
    };
  });

  const indexOfSlug = slugsFromArticles.findIndex(articleWithSlugs => {
    const { slugs } = articleWithSlugs;
    return slugs.indexOf(slug) !== -1;
  });

  if (indexOfSlug === -1) {
    return null;
  }

  return slugsFromArticles[indexOfSlug];
};

export const getArticleDataByKey = (key, lang) => {
  const data = relation[key];
  const dataOnLang = data[lang];

  return {
    ...dataOnLang,
    timestamp: data.timestamp,
    lang
  };
};
