const email = document.getElementById("email");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    email.innerHTML = user.email;
    console.log(user);
    if(user.emailVerified) {
      window.location.href = "./home.html";
      }
  } else {
    // User is signed out
    window.location.href = "./login.html";
  }
});
let send = () => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      // ...
      console.log('Verification sent');
    });
};
