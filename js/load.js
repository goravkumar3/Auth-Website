firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    setTimeout(() => {
      window.location.href = "./pages/home.html";
    }, 5000);
  } else {
    // User is signed out
    setTimeout(() => {
      window.location.href = "./pages/login.html";
    }, 5000);
  }
});
