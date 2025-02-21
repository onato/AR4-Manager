import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
  centered: {
    alignItems: "center",
  },
  container: {
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.androidNavWhite,
    position: 'absolute',
    bottom: 0,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
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
    backgroundColor: colors.white,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.white,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.docGreen,
  },
  modalTitleContainer: {
    padding: 18,
    paddingLeft: 16,
    marginBottom: 20,
  },
  form: {
    padding: 20,
  },
  icon: {
    width: 22,
    height: 27,
    marginRight: 8,
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
