import * as firebase from 'firebase'
import 'firebase/database'; 
import 'firebase/storage';  

const firebaseConfig = {
  apiKey: 'AIzaSyBxdG3rYukYKFMJ8CZo9c4-xo6cQ8hQfzs',
  authDomain: 'addy-2f96d.firebaseapp.com',
  databaseURL: 'https://addy-2f96d.firebaseio.com/',
  projectId: 'addy-2f96d',
  storageBucket: 'gs://addy-2f96d.appspot.com',
  messagingSenderId: '489664232858',
  appId: '1:489664232858:android:044ef09b8893be36424e23',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
