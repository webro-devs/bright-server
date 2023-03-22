import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const NewsQueryParserMiddleware = (req, res, next) => {
  let where: any = {};
  const { startDate, endDate, creatorId, categoryId, mainCategoryId, state } =
    req.query;

  if (startDate && endDate) {
    where = {
      created_at: Between(new Date(startDate), new Date(endDate)),
    };
  } else if (startDate) {
    where = {
      created_at: MoreThanOrEqual(new Date(startDate)),
    };
  } else if (endDate) {
    where = {
      created_at: LessThanOrEqual(new Date(endDate)),
    };
  }
  if (creatorId) {
    where.creator = {
      id: creatorId,
    };
  }
  if (categoryId) {
    where.categories = {
      id: categoryId,
    };
  }
  if (mainCategoryId) {
    where.mainCategory = {
      id: mainCategoryId,
    };
  }
  if (state) {
    where.state = state;
  }
  console.log(where);

  req.where = where;
  next();
};

export default NewsQueryParserMiddleware;
