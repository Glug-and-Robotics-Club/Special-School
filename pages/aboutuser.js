import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AboutUserScreen = () => {
  const [userName, setUserName] = useState("John Cena");
  const [mobileNumber, setMobileNumber] = useState("6291731887");
  const [disability, setDisability] = useState("");
  const [userClass, setUserClass] = useState("");
  const [isDisabilityModalVisible, setDisabilityModalVisible] = useState(false);
  const [isClassModalVisible, setClassModalVisible] = useState(false);

  const disabilities = ["Blind", "Deaf", "Dumb", "Other"]; // Add your disability options here
  const classOptions = ["1", "2", "3", "4", "5"]; // Add your class options here

  const handleLogout = () => {
    // Implement logout logic here
  };

  const handleUpdateDetails = () => {
    // Implement update details logic here
  };

  const toggleDisabilityModal = () => {
    setDisabilityModalVisible(!isDisabilityModalVisible);
  };

  const toggleClassModal = () => {
    setClassModalVisible(!isClassModalVisible);
  };

  const selectDisability = (selectedDisability) => {
    setDisability(selectedDisability);
    toggleDisabilityModal();
  };

  const selectClass = (selectedClass) => {
    setUserClass(selectedClass);
    toggleClassModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5294/5294731.png",
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            onPress={() => console.log("Edit profile image")}
            style={styles.editIconContainer}
          >
            <Ionicons
              name="pencil"
              size={20}
              color="#000"
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userInfo}>
        <TextInput
          style={styles.formInput}
          value={userName}
          onChangeText={(text) => setUserName(text)}
          placeholder="User Name"
        />
        <TextInput
          style={styles.formInput}
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
          placeholder="Mobile Number"
          keyboardType="numeric"
        />

        {/* Custom dropdown for selecting disabilities */}
        <TouchableOpacity
          style={styles.formInput}
          onPress={toggleDisabilityModal}
        >
          <Text style={styles.dropdownText}>
            {disability || "Select Disabilities"}
          </Text>
        </TouchableOpacity>

        {/* Custom dropdown for selecting class */}
        <TouchableOpacity style={styles.formInput} onPress={toggleClassModal}>
          <Text style={styles.dropdownText}>{userClass || "Select Class"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateDetails}
        >
          <Text style={styles.buttonText}>Update Details</Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color="#fff"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for selecting disabilities */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDisabilityModalVisible}
        onRequestClose={toggleDisabilityModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={disabilities}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => selectDisability(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal for selecting class */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isClassModalVisible}
        onRequestClose={toggleClassModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={classOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => selectClass(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles)
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fef2f9", // Light pink background color
  },
  topSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    borderWidth: 4, // Increased border width
    borderRadius: 70,
    overflow: "hidden",
    borderColor: "#4d3095", // White border color
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  editIconContainer: {
    position: "absolute",
    top: 110,
    left: 110,
    backgroundColor: "#E75E9C",
    borderRadius: 15,
    padding: 5,
  },
  editIcon: {
    marginTop: -25,
  },
  userInfo: {
    marginBottom: 20,
  },
  formInput: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderRadius: 15,
  },
  disabilityInput: {
    height: 40,
    borderBottomWidth: 1,
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 15,
  },
  disabilityText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#4d3095",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  updateButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0096C7",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginLeft: 10,
    //   marginRight:10
  },
  disabilityOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  formInput: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 15,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});

export default AboutUserScreen;
