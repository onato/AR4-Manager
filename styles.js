import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
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
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  submitButton: {
    backgroundColor: colors.docBlue,
    padding: 20,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
  },
  borderedButton: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: 44,
    alignItems: 'center',
    backgroundColor: colors.docBlue,
    color: 'white',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  listContainer: {
    flex: 1,
  },
  list: {
  },
  item: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    minHeight: 44,
    minWidth: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 40,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: colors.docGrey,
  },
  input: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 15,
    paddingLeft: 0,
    width: "100%",
    backgroundColor: colors.docGrey,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: "white",
  }
});

export default styles;
