import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  app: {
    backgroundColor: colors.docGreen,
  },
  centered: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "left",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  nfcIcon: {
    marginBottom: 20,
    alignItems: "center",
  },
  nfcImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: colors.docGreen,
    padding: 15,
    borderRadius: 5,
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
});

export default styles;
