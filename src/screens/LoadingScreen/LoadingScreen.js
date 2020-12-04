import React from "react";
import { StatusBar, Image, View } from "react-native";
import styles from "./styles";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Image
        style={styles.image}
        source={require("../../utils/loading.webp")}
      />
    </View>
  );
};

export default LoadingScreen;
