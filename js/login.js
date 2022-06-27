const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
let login = () => {
  const obj = {
    email: email.value,
    password: password.value,
  };
  firebase
    .auth()
    .signInWithEmailAndPassword(obj.email, obj.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      message.style.color='green';
      message.innerHTML='Login successfully';
      setTimeout(() => {
        message.style.display='none';
        if(user.emailVerified) {
          window.location.href = "./home.html";
          }
          else{
            window.location.href ='./verifaction';
          }
      },3000);
    })
    .catch((error) => {
      var errorMessage = error.message;
      message.innerHTML = errorMessage;
      message.style.color = 'red';
    });
};
const semail=document.getElementById('email1');
let Forget=()=>{
  firebase.auth().sendPasswordResetEmail(semail.value)
  .then(() => {
    // Password reset email sent!
    // ..
    alert('Password reset email sent successfully');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    message.innerHTML = errorMessage;
    // ..
  });
}