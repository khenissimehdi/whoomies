const MoviesHelper = require("../../Movies/utils/helpers")
Parse.Cloud.afterSave("Comments", function(request) {
    const { object: comment } = request;
    console.log("TRIGGER AFTER SAVE COMMENTS");
    MoviesHelper.migrateCountCommentsByMovie();
    console.log(comment);
    return true;
});
