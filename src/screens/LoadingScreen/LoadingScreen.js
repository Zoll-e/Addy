import React from "react";
import { Text,Image, View } from "react-native";
import styles from "./styles";

const LoadingScreen =() => {
  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
        source={{
          uri:
            "https://i.gifer.com/origin/8b/8b0151f98b831800cc157e2829175daa_w200.webp",
        }}
      />
    </View>
  );
}

export default LoadingScreen;
