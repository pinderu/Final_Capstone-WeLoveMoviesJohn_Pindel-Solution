const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  // TODO: Add your code here.
  try {
    const movie = await service.read(req.params.movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
  } catch (error) {
    next(error);
  }
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  try {
    const data = await service.list(req.query.is_showing);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists
};
