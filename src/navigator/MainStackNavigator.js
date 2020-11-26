import React, { useEffect } from "react";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  StatisticsScreen,
  LoadingScreen,
} from "../screens";

import { connect } from "react-redux";
import { logout, loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const MainStackNavigator = ({
  isAuthenticated,
  user,
  logout,
  loading,
}) => {
  
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Kijelentkezés"
          onPress={() => {
            logout();
            props.navigation.closeDrawer();
          }}
        />
      </DrawerContentScrollView>
    );
  }

  const authScreens = (
    <>
      <Drawer.Screen
        options={{
          swipeEnabled: false,

          drawerLabel: "Bevétel",
          headerShown: true,
          headerTitle: "Bevétel",
        }}
        name="Home"
        component={HomeScreen}
      >
      </Drawer.Screen>

      <Drawer.Screen
        options={{
          headerShown: true,
          drawerLabel: "Statisztikák",
          headerTitle: "Statisztikák",
        }}
        name="Statistics"
      >
        {props => <StatisticsScreen {...props} />}
      </Drawer.Screen>
    </>
  );
  const loadScreen = (
    <>
      <Drawer.Screen name="Loading" component={LoadingScreen} />
    </>
  );
  const guestScreens = (
    <>
      <Drawer.Screen
        options={{
          gestureEnabled: false,
          headerTitle: "Bejelentkezés",
        }}
        name="Login"
        component={LoginScreen}
      />
    </>
  );

  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      {loading
        ? loadScreen
        : isAuthenticated && user
        ? authScreens
        : guestScreens}
    </Drawer.Navigator>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
});

MainStackNavigator.propTypes = {
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logout, loadUser })(
  MainStackNavigator
);
