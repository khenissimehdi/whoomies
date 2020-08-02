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
        
        let Id = movie.id;
        
        //Count movie comments 
        let movieRow =  await allCommentsQuery(Id,30).count();
        console.log("done setting comments number");
        //Set movie comments number
        movie.set("num_mflix_comments", movieRow);

        return movie.save();
      },
    });
    return true;
  })().catch((error) => {
    throw error;
  });

};

const allCommentsQuery = (movieId, limit) => {
  let commentsQuery = new Parse.Query("Comments");
  commentsQuery.include(["movie"]);

  if (movieId !== undefined) {
    let searchedMovie = new Parse.Object("Movies");
    searchedMovie.id = movieId;
    commentsQuery.equalTo("movie", searchedMovie);
  }

  if (limit !== undefined) {
    commentsQuery.limit(limit);
  }

  return commentsQuery;
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

module.exports = exports = { migrateCountCommentsByMovie , migrateCountCommentsByMovie,findMovieYear,findMovieCountry };
