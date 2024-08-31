// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAG9wMvTJ235A27QsW7iX3qD0ah8K8All0",
    authDomain: "unified-mentor.firebaseapp.com",
    projectId: "unified-mentor",
    storageBucket: "unified-mentor.appspot.com",
    messagingSenderId: "900432080474",
    appId: "1:900432080474:web:d6bec2fd13a4e9e3f1f263",
    measurementId: "G-JY7F1FDL2L"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();