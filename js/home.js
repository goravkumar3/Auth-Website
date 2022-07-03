let uname;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(user);
    uid = user.uid;
    uname=user.displayName;
    if (!user.emailVerified) {
    }
  } else {
    // User is signed out
    window.location.href = "./login.html";
  }
});
let logout = () => {
  firebase.auth().signOut();
};
$(".humburgur").click(function () {
  $(".main_menu").toggleClass("sub_menu");
});
alert("Welcome "+uname+"!");
const getComment = document.getElementById("comment");
const Comments = () => {
  var database = firebase.database();
  database.ref("comm/").push({
    Comm: getComment.value,
    userName: uname,
  });
};

const main = document.getElementById("comment_sec");
firebase
  .database()
  .ref("comm/")
  .on("child_added", (CommentData) => {
    const key = CommentData.key;
    CommentData.forEach((commentValue)=>{
      const Value = commentValue.val();
      const showComment=document.createElement("p");
      main.appendChild(showComment);
      showComment.textContent = Value;
    })
  });

//delete comment
//firebase.database().ref("Comm/"+key).remove();

//upadate comment
// firebase.database().ref("Comm/",key)..update({
// Comm:input.value,
//  })
