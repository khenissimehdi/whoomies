/**
 * Comments creation 
 */

const Comments = Parse.Object.extend("Comments");
const comment = new Comments();
var date = Date(); 
Sdate = date.toString()  
comment.set("name", "khenissi mehdi");
comment.set("email", "khenissimehdi@fake.com");
comment.set("movie", "573a1390f29313caabcd4135");
comment.set("date", Sdate);

comment.save()
.then((comment) => {
  // Success
  alert('New object created with objectId: ' + comment.id);
}, (error) => {
  // Save fails
  alert('Failed to create new object, with error code: ' + error.message);
});
/**
 * Comments deletion
 */

