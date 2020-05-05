import relation from "../articles/relation.json";
import dayjs from "dayjs";

export const getAllArticles = () => {
  const articlesArr = Object.keys(relation)
    .map((article) => {
      const timestamp = relation[article].timestamp;
      const data = relation[article];

      return {
        timestamp,
        ...data,
      };
    })
    .sort((a, b) => {
      a = dayjs(a.timestamp).toDate();
      b = dayjs(b.timestamp).toDate();
      return a > b ? -1 : a < b ? 1 : 0;
    });

  return articlesArr;
};

export const getLastArticles = (quantity) => {
  const articlesArr = Object.keys(relation)
    .map((article) => {
      const timestamp = relation[article].timestamp;
      const data = relation[article];

      return {
        timestamp,
        ...data,
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

export const getArticleBySlug = (slug) => {
  const slugsFromArticles = Object.keys(relation).map((article) => {
    return {
      key: article,
      slugs: relation[article].slug,
    };
  });

  const indexOfSlug = slugsFromArticles.findIndex((articleWithSlugs) => {
    const { slugs } = articleWithSlugs;
    return slugs.indexOf(slug) !== -1;
  });

  if (indexOfSlug === -1) {
    return null;
  }

  return slugsFromArticles[indexOfSlug];
};

export const getArticleDataByKey = (key) => {
  const data = relation[key];

  return {
    ...data,
    timestamp: data.timestamp,
  };
};
