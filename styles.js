import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
  },
  container: {
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
  },
  list: {
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
  },
  picker: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: colors.docGray,
  },
  input: {
    marginBottom: 10,
    padding: 15,
    paddingLeft: 10,
    width: "100%",
    backgroundColor: colors.docGray,
  },
  headerButtonsContainer: {
    flexDirection: "row",
    paddingRight: 10,
  },
  headerButton: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center",
  },
  headerButtonText: {
    marginHorizontal: 5,
    fontSize: 18,
    textAlign: "center",
    color: colors.white,
    width: 50,
  },
});

export default styles;
