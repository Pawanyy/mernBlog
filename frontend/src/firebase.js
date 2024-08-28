// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvT0cDtKTAx-YWreOHVgl7KwNotxgqaGE",
    authDomain: "mernblog-1fd6d.firebaseapp.com",
    projectId: "mernblog-1fd6d",
    storageBucket: "mernblog-1fd6d.appspot.com",
    messagingSenderId: "489462607487",
    appId: "1:489462607487:web:384493c6fb992ea7b8994a",
    measurementId: "G-E2PJVZ8D9E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);