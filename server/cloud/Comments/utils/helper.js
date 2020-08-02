const MoviesHelper = require("../../Movies/utils/helpers")
const { getCode, getName } = require('country-list');

/*PART 1 comments */
/**
 * gets the comments for one movie using the movie id. 
 * @param {String} moveiId -
 * @param {Number} limit -
 * @returns {[Comments]}
 */


const findCommentsByMovie = async (movieId, limit = 30) => {
  if (movieId === undefined) {
    throw "Movie params must be set";
  }
  

  let movieRow = await MoviesHelper.findMovieById(movieId).count();

  if (movieRow === 0) {
    throw "This movie doesn't exists";
  }

  let commentsForTheMovie = await allCommentsQuery(movieId).find();

  return commentsForTheMovie === undefined ? [] : commentsForTheMovie;
};

/**Flitering by movieId */
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

/*PART 2 movies */
/**
 * gets the movies older then a specific year in choosen a country. 
 * @param {number} year 
 * @param {string} country 
 * @returns {[Movies]}
 */


const findMovieByYear = async (year, country ) => {
  /**
   * setting up...
   * if the user use country code or the first lettre is lower case
   */
  if(country.length < 3){
    var fullname = getName(country);
    country = fullname
  }
  else if(country !== "USA") {
    var code = getCode(country);
    country = getName(code);  
  }
  
  if (year === undefined) {
    throw "Year params must be set";
  }
  let yearRow = await MoviesHelper.findMovieYear(year).count();
  if(yearRow === 0){
    throw "Wrong year ! "
  }
  let countryRow = await MoviesHelper.findMovieCountry(country).count();
  if(countryRow === 0){
    throw "Wrong country ! "
  }

  let YearForTheMovie = await allMoviesQuery(year,country).find();
  let rowYC = await allMoviesQuery(year,country).count();
  if(rowYC === 0){
    throw "there is no movie before " + year + " in " + country   
  }
  return YearForTheMovie === undefined ? [] : YearForTheMovie;
};

/**Flitering by year and country*/
const allMoviesQuery = (year, country) => {
  let MovieQuery = new Parse.Query("Movies");

  if (year !== undefined) {

     MovieQuery.lessThan("year", year);
     MovieQuery.startsWith("countries", country);
     

  }
 

  return MovieQuery;
};
module.exports = exports = { findCommentsByMovie,findMovieByYear };