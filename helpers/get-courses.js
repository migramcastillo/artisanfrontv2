import relation from "../courses/list";
import dayjs from "dayjs";

export const getAllCourses = () => {
  const coursesArr = relation.sort((a, b) => {
    a = dayjs(a.timestamp).toDate();
    b = dayjs(b.timestamp).toDate();
    return a > b ? -1 : a < b ? 1 : 0;
  });

  return coursesArr;
};

export const getLastCourses = (quantity) => {
  const coursesArr = relation
    .sort((a, b) => {
      a = dayjs(a.timestamp).toDate();
      b = dayjs(b.timestamp).toDate();
      return a > b ? -1 : a < b ? 1 : 0;
    })
    .slice(0, quantity);

  return coursesArr;
};

export const getCourseBySlug = (slug) => {
  const courseFindFromSlug = relation.find((course) => course.slug === slug);

  if (!courseFindFromSlug) {
    return null;
  }

  return courseFindFromSlug;
};
