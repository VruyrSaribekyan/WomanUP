import firebase from 'firebase'
const firebaseConfig ={
    apiKey: "AIzaSyDLznsIMCEkzeOu3Ow9bDp4RvvYpWI3244",
    authDomain: "todo-list-womanup.firebaseapp.com",
    databaseURL: "https://todo-list-womanup-default-rtdb.firebaseio.com",
    projectId: "todo-list-womanup",
    storageBucket: "todo-list-womanup.appspot.com",
    messagingSenderId: "308562322464",
    appId: "1:308562322464:web:d04668e55d092e1d23c845",
    measurementId: "G-2QV1Q5YWCN"
}
firebase.initializeApp(firebaseConfig)
export default firebase