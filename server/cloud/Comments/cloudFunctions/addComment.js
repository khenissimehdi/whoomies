const joi = require("@hapi/joi");
const CommentsHelper = require("../utils/helper")

const getCommentsByMovieParamsSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  movie: joi.string().required()
});

module.exports =
  (async (request , result) => {
    const {
      value: params,
      error: paramsValidationError,
    } = getCommentsByMovieParamsSchema.validate(request.params);

    if (paramsValidationError) {
      throw paramsValidationError;
    }

    const { name, email,movie } = params;

    return await CommentsHelper.addComment(name, email,movie);
  });
