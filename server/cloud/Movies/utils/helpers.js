const processAllByParseQuery = require("../../utils/processAllByParseQuery");

const allMoviesQuery = (limit) => {
  let moviesQuery = new Parse.Query("Movies");

  if (limit !== undefined) {
    moviesQuery.limit(limit);
  }

  return moviesQuery;
};

/**
 * Restore the good number of comments (key num_mfix_comments) for each movie
 * @returns {Boolean}
 */
const migrateCountCommentsByMovie = async () => {
  return (async () => {
    const r = await processAllByParseQuery({
      query: allMoviesQuery(),
      useMasterKey: true,
      processingFunction: async (movie) => {
        console.log("GOT THE MOVIE");

        //Count movie comments 

        //Set movie comments number
        movie.set("num_mflix_comments", 3);

        return movie.save();
      },
    });
    return true;
  })().catch((error) => {
    throw error;
  });

};

const findMovieById =  (movieId) =>{
  let query = new Parse.Query("Movies");
  query.equalTo("objectId", movieId);
  
  return query;
};

const findMovieYear =  (year) =>{
  let query = new Parse.Query("Movies");
  query.lessThan("year", year);
  
  return query;
};
const findMovieCountry =  (country) =>{
  let query = new Parse.Query("Movies");
  query.startsWith("countries", country);
  
  return query;
};

module.exports = exports = { migrateCountCommentsByMovie , findMovieById,findMovieYear,findMovieCountry };
