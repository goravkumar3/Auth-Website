var uname;
let uid;
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
const FullName = document.getElementById("Fname");
const fatherName = document.getElementById("fathname");
const number = document.getElementById("number");
const CINc=document.getElementById("CINC");
const picture=document.getElementById("wizardPicturePreview");
setTimeout(() => {
  firebase.firestore().collection("users").doc(uid).get().then((query)=>{
    let data=query.data();
    // data.id=doc.id;
    FullName.value=data.fullName;
    fatherName.value=data.fName;
    number.value=data.number;
    CINc.value=data.CINC;
    if(data.profileImage===""){
      picture.setAttribute("src","./../images/user (1).png");
    }else{
      picture.setAttribute("src",data.profileImage);
    }
    console.log(data);
  })
},3000);
const profile_image=(e)=>{
  const file = e.target.files[0];
  console.log(file);
  var uploadTask = firebase.storage().ref().child(`images/${file.name}`).put(file);
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      alert('Upload is ' + progress + '% done');
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      firebase.firestore().collection("users").doc(uid).update({
        profileImage:downloadURL,
      }).then(() => {
          // window.location.reload(); 
      })
      });
    }
    );
  }
let userImage;
// upadate system
let update = () => {
  firebase.firestore().collection("users").doc(uid).update({
    fullName:FullName.value,
    fName:fatherName.value,
    number:number.value,
    CINC:CINc.value,
  }).then(() => {
    console.log("Updated user info");
  })
}
$(document).ready(function(){
  // Prepare the preview for profile picture
      $("#wizard-picture").change(function(){
          readURL(this);
      });
  });
  function readURL(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
  
          reader.onload = function (e) {
              $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
          }
          reader.readAsDataURL(input.files[0]);
      }
  }