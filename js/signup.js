const email = document.getElementById("Email");
const password = document.getElementById("Password");
const message = document.getElementById("message");
let signup = () => {
  const obj = {
    email: email.value,
    password: password.value,
  };
  if (obj.email == "") {
    message.style.color = "red";
    message.innerHTML = "Enter your email address";
    email.focus();
  } else if (obj.password == "") {
    message.innerHTML = "Enter your password";
    password.focus();
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(obj.email, obj.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        user.sendEmailVerification();
        message.style.color = 'green';
        message.innerHTML="Sign up Successfully";
        setTimeout(() => {
          window.location.href = "./verifaction.html";
        }, 2000);
      })
      .catch((error) => {
        var errorMessage = error.message;
        message.style.color = "red";
        message.innerHTML = errorMessage;
      });
  }
};
