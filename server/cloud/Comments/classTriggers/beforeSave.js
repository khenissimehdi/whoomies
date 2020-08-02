Parse.Cloud.beforeSave("Comments", function(request) {
  const { object: comment } = request;
  console.log("TRIGGER SAVE COMMENTS");
  console.log(comment);
  return true;
});
