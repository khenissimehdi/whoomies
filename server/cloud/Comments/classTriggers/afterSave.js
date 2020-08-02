Parse.Cloud.afterSave("Comments", function(request) {
    const { object: comment } = request;
    console.log("TRIGGER AFTER SAVE COMMENTS");
    console.log(comment);
    return true;
});
