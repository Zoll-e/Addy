import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {loadUser} from "./src/actions/auth";
import { Provider } from "react-redux";
import { store } from "./src/store";
import MainStackNavigator from "./src/navigator/MainStackNavigator";


export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);
  return (
    
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );

  
}

