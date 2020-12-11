import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width-30;

export default StyleSheet.create({
  container: {
    backgroundColor: "#2c2b30",
    alignItems: "center",
  },
  barContainer: {
    width: windowWidth,
    marginRight:15,
    marginLeft:15,

    height: 200,
    marginBottom:5,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  bar: { width: "8%", marginLeft: "3%", marginRight: "3%" },

  title: {
    color: "white",
    marginTop:8,
    fontSize: 20,
    textTransform: "capitalize",
    
  },
  secondaryTitle: {
    textTransform: "capitalize",
    fontSize: 17,
    color: "white",
    marginBottom: "1%",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  weekDayText: {
    textAlign: "center",

    marginLeft: "3%",
    marginRight: "3%",
    width: "8%",
    color: "white",
  },
  weekDayTextContainer: {
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
