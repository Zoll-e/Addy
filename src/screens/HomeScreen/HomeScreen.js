import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  Pressable,
  View,
  StatusBar,
  Animated,
} from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { getEntities, addEntity, removeEntity } from "../../actions/entity";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const HomeScreen = ({
  user,
  getEntities,
  entities,
  addEntity,
  removeEntity,
}) => {
  const [entityText, setEntityText] = useState("");
  const [total, setTotal] = useState(0);

  //_____________________________________-

  //_____________________________________
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

  const renderRightActions = id => (
    <View style={{ width: 80, flexDirection: "row-reverse" }}>
      <RectButton style={[styles.rightAction]} onPress={() => removeEntity(id)}>
        <AnimatedIcon
          name="delete"
          size={23}
          color={"white"}
        />
      </RectButton>
    </View>
  );

  const renderEntity = ({ item }) => {
    if (item.createdAt && item.createdAt.toMillis() > Date.now() - 57600000) {
      return (
        <Swipeable
          friction={2}
          leftThreshold={30}
          rightThreshold={40}
          renderRightActions={() => renderRightActions(item.id)}
        >
          <View style={styles.entityContainer}>
            <Text style={styles.entityValueText}>{item.text}</Text>
            <Text style={styles.entityTypeText}>
              {item.type == "Pénz"
                ? "Kész" + item.type.toLowerCase()
                : item.type}
            </Text>
          </View>
        </Swipeable>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

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
          style={styles.card}
          onPress={() => onAddButtonPress("Kártya")}
        >
          <Text style={styles.buttonText}>Kártya</Text>
        </Pressable>
        <Pressable style={styles.cash} onPress={() => onAddButtonPress("Pénz")}>
          <Text style={styles.buttonText}>Készpénz</Text>
        </Pressable>
        <Pressable
          style={styles.epay}
          onPress={() => onAddButtonPress("E-pay")}
        >
          <Text style={styles.buttonText}>E-pay</Text>
        </Pressable>
      </View>
      <View style={styles.totalParent}>
        <Text style={styles.totalText}>Napi bevétel: {total}</Text>
      </View>
      <View style={{width:"90%"}} >
      {entities && (
        <FlatList
          data={entities}
          renderItem={renderEntity}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
        />
      )}
      </View>
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
  removeEntity: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, {
  logout,
  getEntities,
  addEntity,
  removeEntity,
})(HomeScreen);
