const firebaseApp = firebase.initializeApp({ apiKey: "AIzaSyBVDhOPqQN00EEt_F9u7aSfEiooPOjfLjc",
authDomain: "text1-80273.firebaseapp.com",
databaseURL: "https://text1-80273-default-rtdb.firebaseio.com",
projectId: "text1-80273",
storageBucket: "text1-80273.appspot.com",
messagingSenderId: "1050463700682",
appId: "1:1050463700682:web:ab1f98def74358ff15d633",
measurementId: "G-JSVEEL4DCF"
});
   const db = firebaseApp.firestore();
   const auth = firebaseApp.auth();
   const database = firebase.database();

var Email = document.getElementById('email');
var Password = document.getElementById('password');
//*************************************************************************************************** */
function check(){
   var enterEmail = document.getElementById('email').value;
   var enterPassword = document.getElementById('password').value;

   firebase.auth().signInWithEmailAndPassword(enterEmail, enterPassword)
       .then((userCredential) => {
       alert("Login Successful");
       window.location.href = "ESP.html"
       var user = userCredential.user;
       })
       .catch((error) => {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorCode)
       alert("Account does not exist.");
 });
}
//*************************************************************************************************
$(document).ready(function(){
  $('#icon').click(function(){
    $('ul').toggleClass('show');
  });
  $('ul li').click(function(){
    $('ul').removeClass('show');
  });
});
//*************************************************************************************************
document.querySelectorAll('.module').forEach(function(element) {
  element.addEventListener('click', function(event) {
      var switches = document.querySelectorAll('.switch');
      for (var i = 0; i < switches.length; i++) {
          switches[i].style.display = 'inline-block';
      }
  });
});
//*************************************************************************************************
const moduless = document.querySelectorAll('.module');

moduless.forEach(module => {
  module.addEventListener('click', () => {
    moduless.forEach(otherModule => {
      otherModule.style.backgroundColor = '';
    });
    module.style.backgroundColor = 'rgb(42, 102, 171)';
  });
});
// *********************Update the ref variable to use for updateData******************************
var ref;
var modules = document.querySelectorAll('.module');
for (var i = 0; i < modules.length; i++) {
  modules[i].addEventListener('click', function() {
    var moduleId = this.getAttribute('data-module-id');
    ref = database.ref('IOT/' + moduleId);
  });
}
//**********************Update switch state when Realtime database data changes********************
var moduleIds = ['module1', 'module2', 'module3'];
var switchIds = ['sun', 'rainy', 'warning', 'headset'];
var dataNames = ['Data1', 'Data2', 'Data3', 'Data4'];
var currentModule = 'MODULE1';

for (var i = 0; i < moduleIds.length; i++) {
  var moduleElement = document.querySelector('#' + moduleIds[i]);
  moduleElement.addEventListener('click', function() {
    currentModule = this.getAttribute('data-module-id');
    updateAllSwitches();
  });
}
function updateAllSwitches() {
  for (var i = 0; i < switchIds.length; i++) {
    var dataPath = 'IOT/' + currentModule + '/' + dataNames[i];
    updateSwitch(switchIds[i], dataPath);
  }
}
function updateSwitch(switchId, dataPath) {
  var switchElement = document.querySelector('#' + switchId);

  database.ref(dataPath).on('value', function(snapshot) {
    var value = snapshot.val();
    switchElement.checked = value;
  });
}
updateAllSwitches();  
//*********************************************************************************************
function updateData(ref){
  Sun = document.getElementById('sun');
  Rainy = document.getElementById('rainy');
  Warning = document.getElementById('warning');
  Headset = document.getElementById('headset');
  
  if(Sun.checked){
    ref.update({Data1: 1 });
  }else{
    ref.update({Data1: 0 });
  }
  //  
  if(Rainy.checked){
    ref.update({Data2: 1 });
  }else{
    ref.update({Data2: 0 });
  }
  //
  if(Warning.checked){
    ref.update({Data3: 1 });
  }else{
    ref.update({Data3: 0 });
  }
  //
  if(Headset.checked){
    ref.update({Data4: 1 });
  }else{
    ref.update({Data4: 0 });
  }
}
//**********************************************************************************************
function readData(ref){
  ref.child('Data1').once('value').then(function(snapshot) {
    var Data1 = snapshot.val();
    console.log(Data1);
  });
  //
  ref.child('Data2').once('value').then(function(snapshot) {
    var Data2 = snapshot.val();
    console.log(Data2);
  });
  //
  ref.child('Data3').once('value').then(function(snapshot) {
    var Data3 = snapshot.val();
    console.log(Data3);
  });
  //
  ref.child('Data4').once('value').then(function(snapshot) {
    var Data4 = snapshot.val();
    console.log(Data4);
  });
}
