Parse.Cloud.define(
  "commentsByMovie",
  require("./getCommentsByMovie")
);
Parse.Cloud.define(
  "MoviesByYear",
  require("./getMovieOlderthenYear")
);
