// middlewares/notFound.js
const ExpressError = require("./ExpressError");

const notFound = (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
};

module.exports = notFound;
