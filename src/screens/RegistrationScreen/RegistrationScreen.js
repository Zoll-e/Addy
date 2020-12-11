import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  Pressable,
  View,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";

function RegistrationScreen({ navigation, register }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Jelszavak nem egyeznek!");
      return;
    }
    register(fullName, email, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Teljes név"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Jelszó"
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Jelszó még egyszer"
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Pressable style={styles.button} onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Felhasználó létrehozása</Text>
        </Pressable>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Már regisztráltál?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Jelentkezz be!
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

RegistrationScreen.prototypes = {
  register: PropTypes.func.isRequired,
};
export default connect(null, { register })(RegistrationScreen);
