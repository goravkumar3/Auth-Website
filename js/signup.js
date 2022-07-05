const email = document.getElementById("Email");
const password = document.getElementById("Password");
const FullName = document.getElementById("Fname");
const fatherName = document.getElementById("fathname");
const number = document.getElementById("number");
const CINC=document.getElementById("CINC");
const message = document.getElementById("message");
let signup = () => {
  const obj = {
    email: email.value,
    password: password.value,
    fullName:FullName.value,
    number: number.value,
    fName:fatherName.value,
    CINC: CINC.value,
  };
  if (obj.email == "") {
    message.style.color = "red";
    message.innerHTML = "Enter your email address";
    email.focus();
  } else if (obj.password == "") {
    message.innerHTML = "Enter your password";
    password.focus();
  } else {
    var database = firebase.database();
  database.ref("usersInfo/").push(obj);
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
const imag=(e)=>{
  const file = e.target.files[0];
  var uploadTask = storageRef.ref(`images/${file.name}`).put(file);
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      message.innerHTML='Upload is ' + progress + '% done';
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );
}