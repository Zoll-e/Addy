import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {loadUser} from "./src/actions/auth";
import { decode, encode } from "base-64";
import { Provider } from "react-redux";
import { store } from "./src/store";
import MainStackNavigator from "./src/navigator/MainStackNavigator";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

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
