import {
  ENTITY_LOADED,
  ENTITY_FAIL,
  ENTITY_ADDED,
  ENTITY_ADD_FAIL,
  REMOVE_SUCCES,
  REMOVE_FAIL,
} from "./types";
import { firebase } from "../firebase/config";

const entityRef = firebase.firestore().collection("entities");

export const getEntities = id => async dispatch => {
  try {
    entityRef
      .where("authorID", "==", id)
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const newEntities = [];
        querySnapshot.forEach(doc => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });

        dispatch({ type: ENTITY_LOADED, payload: newEntities });
      }); 



  } catch (err) {
    dispatch({
      type: ENTITY_FAIL,
    });
  }
};

export const addEntity = (type, entityText, id) => async dispatch => {
  try {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      text: Number(entityText),
      type: type,
      authorID: id,
      createdAt: timestamp,
    };
    entityRef.add(data);
    dispatch({ type: ENTITY_ADDED });
  } catch (error) {
    dispatch({ ENTITY_ADD_FAIL });
  }
};

export const removeEntity = (id) => async dispatch => {
  try {
   await entityRef.doc(id).delete();

   dispatch({type:REMOVE_SUCCESS})
  } catch (error) {
    dispatch({type: REMOVE_FAIL})
  }
}
