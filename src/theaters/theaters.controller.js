const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  // TODO: Add your code here
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list: asyncErrorBoundary(list),
};
