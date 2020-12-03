import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, Pressable, Header, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function LoginScreen({ navigation, login, isAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  
  

  const onLoginPress = () => {
    login(email, password);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image style={styles.logo} />
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
        <Pressable style={styles.button} onPress={onLoginPress}>
          <Text style={styles.buttonTitle}>Bejelentkezés</Text>
        </Pressable>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Új felhaszáló vagy?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Regisztrálj!
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

LoginScreen.prototypes = {
  login: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { login })(LoginScreen);
