import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { getEntities, addEntity } from "../../actions/entity";

const HomeScreen = ({ user, getEntities, entities, addEntity }) => {
  const [entityText, setEntityText] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    user && getEntities(user.uid);
  }, []);

  useEffect(() => {
    var timed = [];
    entities.map(
      e =>
        e.createdAt &&
        e.createdAt.toMillis() > Date.now() - 57600000 &&
        timed.push(e.text)
    );
    setTotal(timed.reduce((sum, timed) => sum + timed, 0));
  }, [entities]);


  const onAddButtonPress = type => {
    if (entityText && entityText.length > 0) {
      addEntity(type, entityText, user.uid);
      setEntityText("");
      Keyboard.dismiss();
    }
  };

  const renderEntity = ({ item }) => {
    console.log();
    if (item.createdAt && item.createdAt.toMillis() > Date.now() - 57600000) {
      return (
        <View style={styles.entityContainer}>
          <Text style={styles.entityText}>
            {item.text} {item.type}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Összeg hozzáadása"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formContainer}>
        <Pressable
          style={styles.button}
          onPress={() => onAddButtonPress("Pénz")}
        >
          <Text style={styles.buttonText}>Pénz</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => onAddButtonPress("Kártya")}
        >
          <Text style={styles.buttonText}>Kártya</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => onAddButtonPress("E-pay")}
        >
          <Text style={styles.buttonText}>E-pay</Text>
        </Pressable>
      </View>
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>{total}</Text>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={item => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  entities: state.entity.entities,
});
HomeScreen.propTypes = {
  getEntities: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  addEntity: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { logout, getEntities, addEntity })(
  HomeScreen
);
