const MoviesHelper = require("../../Movies/utils/helpers")


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
  let listComments = [];

  for(var x in commentsForTheMovie)
  {  
    let row = commentsForTheMovie[x];
     
    listComments.push({
      'name': row.get('name'),
      'email': row.get('email'),
      'date': row.get('date') ,
      'movie': row.get('movie'),
     
    });
    
    
    
  }

  return listComments === undefined ? [] : listComments;
};

/**Flitering by movieId */
const allCommentsQuery = (movieId, limit) => {
  let commentsQuery = new Parse.Query("Comments");
  commentsQuery.include(["movie"]);

  if (movieId !== undefined) {
    let searchedMovie = new Parse.Object("Movies");
    searchedMovie.id = movieId;
    commentsQuery.equalTo("movie", searchedMovie);
    commentsQuery.select("name","email","date","movie.title","movie.plot","movie.num_mflix_comments","movie.year","movie.countries","movie.rated","movie.released","movie.cast");
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


const findMovieByYear = async (year, country = "") => {
  
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
  let rowYC = await allMoviesQuery(year,country).count();
  if(rowYC === 0){
    throw "there is no movie before " + year + " in " + country   
  }
  let YearForTheMovie = await allMoviesQuery(year,country).find();
  
  
  let listMovies = [];

  for(var x in YearForTheMovie)
  {  
    let row = YearForTheMovie[x];


    listMovies.push({
      'title': row.get('title'),
      'plot': row.get('plot'),
      'comments': row.get('num_mflix_comments') !== undefined ? row.get('num_mflix_comments') : 0,
      'year': row.get('year'),
      'country': row.get('country'),
      'rated': row.get('rated') !== undefined ? row.get('rated') : "no rate",
      'released_date': row.get('released_date'),
      'cast': row.get('cast')
    });
    
    
    
  }
  return listMovies === undefined ? [] : listMovies;
};

/**Flitering by year and country*/
const allMoviesQuery = (year, country) => {
  let MovieQuery = new Parse.Query("Movies");
  if(country.length === 0){
  MovieQuery.lessThan("year", year);
  }
  if (year !== undefined && country.length !== 0) {

     MovieQuery.lessThan("year", year);
     MovieQuery.startsWith("countries", country);
     

  }
 

  return MovieQuery;
};
/**
 * Bonus add comments
 */
const addComment = async (name,email,movie) =>{
  const Comments = Parse.Object.extend("Comments");
  const comment = new Comments();
  var date = Date(); 
  Sdate = date.toString()  
  comment.set("name", name);
  comment.set("email", email);
  comment.set("movie", movie);
  comment.set("date", Sdate);

  comment.save()
}

module.exports = exports = { findCommentsByMovie,findMovieByYear,addComment };