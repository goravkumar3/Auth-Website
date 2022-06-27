firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user);
    if(user.emailVerified) {
      // window.location.href = "./home.html";
      }
  } else {
    // User is signed out
    window.location.href = "./login.html";
  }
});
let logout=()=>{
  firebase.auth().signOut();
}