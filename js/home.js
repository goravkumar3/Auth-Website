firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user);
    if(!user.emailVerified) {
      }
  } else {
    // User is signed out
    window.location.href = "./login.html";
  }
});
let logout=()=>{
  firebase.auth().signOut()
}
$('.humburgur').click(function(){
  $('.main_menu').toggleClass('sub_menu');
})

const func=()=>{
  var database = firebase.database();
   database.ref('users/').set({
    username: "Gorav",
    lastname:"Kumar"
  });
}