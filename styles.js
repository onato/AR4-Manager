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
    backgroundColor: colors.docGreen,
    padding: 20,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
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
  list: {
    backgroundColor: "white",
  },
  item: {
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
    fontSize: 46,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    padding: 15,
  },
  picker: {
    width: "50%",
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 15,
    width: "100%",
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
  selected: {
    backgroundColor: "#d3d3d3",
  },
  hStack: {
    flexDirection: "row",
    gap: 10, // Adds space between children
  }
});

export default styles;
