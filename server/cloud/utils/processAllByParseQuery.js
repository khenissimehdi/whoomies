const QUERY_DEFAULT_LIMIT = 1000;
/**
 * It gets Parse.Query data page by page and runs processingFunction for every object.
 * processingFunction could be sync or async and could return value.
 * Final result is array of processingFunction results.
 * @param {Object} params -
 * @param {Boolean} params.useMasterKey -
 * @param {Parse.Query} params.query -
 * @param {Function} params.processingFunction -
 * @param {Number} [params.limit] -
 * @returns {Promise<any[]>}
 */
module.exports = async function(params) {
  let start = 0;
  const limit = params.limit || QUERY_DEFAULT_LIMIT;
  const results = [];
  let moreResultWaiting = true;
  while (moreResultWaiting) {
    const objs = await params.query
      .skip(start)
      .limit(limit)
      .find({ useMasterKey: params.useMasterKey });
    const pageResults = await Promise.all(
      objs.map((obj) => params.processingFunction(obj))
    );
    results.push(...pageResults);
    start += limit;
    moreResultWaiting = objs.length >= limit;
  }
  return results;
};
