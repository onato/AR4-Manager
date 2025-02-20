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
  grabber: {
    padding: 10,
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
    backgroundColor: '#F5F5F5',
    position: 'absolute',
    bottom: 0,
    paddingTop: 15,
    paddingBottom: 15,
  },
  submitButton: {
    backgroundColor: colors.docBlue,
    padding: 20,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    minHeight: 44,
    minWidth: 44,
    flexDirection: 'row',
    paddingRight: 20,
  },
  text: {
    fontSize: 22,
  },
  largeText: {
    fontSize: 38,
  },
  timespan: {
    padding: 10,
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
    backgroundColor: colors.docGray,
  },
  input: {
    marginBottom: 10,
    padding: 15,
    paddingLeft: 10,
    width: "100%",
    backgroundColor: colors.docGray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: colors.docGreen,
    color: "white",
    marginBottom: 20,
    padding: 19,
  },
  form: {
    padding: 20,
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
    width: 50,
  },
  listRowAccessory: {
    padding: 20,
    paddingRight: 0,
    width: 50,
  }
});

export default styles;
