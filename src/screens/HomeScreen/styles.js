import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2c2b30",
  },
  formContainer: {
    marginBottom: "15%",
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
  },
  input: {
    marginTop: "15%",
    height: 60,
    borderRadius: 5,
    width: "100%",
    textAlign: "center",
    backgroundColor: "whitesmoke",
  },
  card: {
    height: 60,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#c4342d",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  cash: {
    height: 60,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#49b675",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  epay: {
    height: 60,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#fc9303",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },

  totalParent: {
    width: "90%",
    borderColor: "#cccccc",
    borderBottomWidth: 2,
    alignItems: "center",
  },
  totalText: {
    textAlign: "center",
    width: "90%",
    fontSize: 25,
    color: "#f2f2f2",
  },
  entityContainer: {
    flexDirection: "row",

    justifyContent: "center",
  },
  entityTypeText: {
      marginLeft: 5,
    textAlign: "left",
    marginTop:"2%",
    width: "45%",
    fontSize: 18,
    color: "#f2f2f2",
  },
  entityValueText: {
    width: "45%",
    marginTop:"2%",
    marginRight: 5,
    textAlign: "right",

    fontSize: 18,
    color: "#f2f2f2",
  },
});
