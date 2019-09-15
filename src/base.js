import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCg9gtWZZmI4kchXxDqwQeicAJuwrH-964",
    authDomain: "catch-of-the-day-david-kang.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-david-kang.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export 
export { firebaseApp };

// this is a default export 
export default base;

