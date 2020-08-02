const joi = require("@hapi/joi");
const CommentsHelper = require("../utils/helper")

const getMovieByYearParamsSchema = joi.object({
  year: joi.number().required(),
  country: joi.string().allow('').optional()
});

module.exports =
  (async (request) => {
    const {
      value: params,
      error: paramsValidationError,
    } = getMovieByYearParamsSchema.validate(request.params);

    if (paramsValidationError) {
      throw paramsValidationError;
    }

    const { year, country } = params;

    return await CommentsHelper.findMovieByYear(year, country);
  });
