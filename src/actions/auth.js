import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOG_OUT,
  LOG_OUT_ERROR,
  USER_LOADED,
  USER_LOAD_ERROR,
} from "./types";
import { firebase } from "../firebase/config";

// Register user

export const register = (fullName, email, password) => async dispatch => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const uid = res.user.uid;
    const data = {
      id: uid,
      email,
      fullName,
    };

    const usersRef = firebase.firestore().collection("users");
    usersRef.doc(uid).set(data);

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (err) {
    alert(err);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = (email, password) => async dispatch => {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const uid = res.user.uid;
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(uid)
      .get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          alert("User does not exist anymore.");
          return;
        }
        const user = firestoreDocument.data();
        dispatch({ type: LOGIN_SUCCESS });
      });
  } catch (err) {
    alert(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
/* //Load user
export const loadUser = () => async dispatch => {
  const usersRef = firebase.firestore().collection("users");
console.log(firebase.auth())
  firebase.auth().onAuthStateChanged(user => {
    user ?
    usersRef
      .doc(user.uid)
      .get()
      .then(document => {
        const userData = document.data();

        dispatch({ type: USER_LOADED, payload: userData });
      })
    
      .catch(error => {
        dispatch({
          type: USER_LOAD_ERROR,
        });
      }):dispatch({
        type: USER_LOAD_ERROR,
      });
  });
};
*/


export const loadUser = () => async dispatch => {

    try {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch({ type: USER_LOADED, payload: user });
        }
        else {
          dispatch({
            type: USER_LOAD_ERROR,
          });
        }
      })
    } catch (err) {

      dispatch({
        type: USER_LOAD_ERROR,
      });
    }
  
};
// Log out user
export const logout = () => async dispatch => {
  try {
    firebase.auth().signOut();
    dispatch({
      type: LOG_OUT,
    });
  } catch (error) {
    dispatch({ type: LOG_OUT_ERROR });
  }
};
