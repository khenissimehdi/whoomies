const MoviesHelper = require("../utils/helpers")

module.exports = async (request) => {
  return await MoviesHelper.migrateCountCommentsByMovie();
};
