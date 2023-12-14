import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import updatesImage from "./assets/images/updates.png";
import AboutUserScreen from "./pages/aboutuser";


const Stack = createStackNavigator();

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClassIndex: 0,
      selectedSubjectIndex: 0,
      searchTerm: "",
      jsonData: null,
    };
  }

  componentDidMount() {
    // Load JSON data from file when the component mounts
    const jsonData = require("./data.json");
    this.setState({ jsonData });
  }

  onPressClass(classIndex) {
    this.setState({ selectedClassIndex: classIndex, selectedSubjectIndex: 0 });
  }

  onPressSubject(subjectIndex) {
    this.setState({ selectedSubjectIndex: subjectIndex });
  }

  renderChapters() {
    const { selectedClassIndex, selectedSubjectIndex, searchTerm, jsonData } =
      this.state;

    const selectedClass = jsonData.classes[selectedClassIndex];
    const selectedSubject = selectedClass.subjects[selectedSubjectIndex];

    let chapters = selectedSubject.chapters;

    // Filter chapters based on the search term
    if (searchTerm) {
      chapters = chapters.filter(
        (chapter) =>
          chapter.chapter_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          chapter.chapter_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    return chapters;
  }

  clearSearch() {
    this.setState({ searchTerm: "" });
  }

  renderClasses() {
    const { jsonData } = this.state;
    const classData = jsonData.classes;

    return (
      <View>
        <FlatList
          data={classData}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => this.onPressClass(index)}
              style={[
                styles.textContainer,
                {
                  backgroundColor:
                    this.state.selectedClassIndex === index
                      ? "#C66CFF"
                      : "#ecf0f1",
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.state.selectedClassIndex === index ? "#fff" : "#000",
                  },
                ]}
              >
                {item.class_name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  renderSubjects() {
    const { selectedClassIndex, jsonData } = this.state;
    const subjects = jsonData.classes[selectedClassIndex].subjects;

    return (
      <View>
        <FlatList
          data={subjects}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => this.onPressSubject(index)}
              style={[
                styles.textContainer,
                {
                  backgroundColor:
                    this.state.selectedSubjectIndex === index
                      ? "#0096C7"
                      : "#ecf0f1",
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.state.selectedSubjectIndex === index
                        ? "#fff"
                        : "#000",
                  },
                ]}
              >
                {item.subject_name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  renderTexts() {
    const { jsonData } = this.state;

    return (
      <ScrollView>
        <View>
          <ScrollView horizontal>{this.renderClasses()}</ScrollView>
          <ScrollView horizontal>{this.renderSubjects()}</ScrollView>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search chapters..."
              onChangeText={(text) => this.setState({ searchTerm: text })}
              value={this.state.searchTerm}
            />
            {this.state.searchTerm ? (
              <TouchableOpacity
                onPress={() => this.clearSearch()}
                style={styles.clearButton}
              >
                <Ionicons name="close" size={18} color="#555" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <FlatList
          data={this.renderChapters()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.chapterItem}>
              <Image
                source={{ uri: item.image_link }}
                style={styles.chapterImage}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.chapterTitle}>{item.chapter_name}</Text>
                <Text style={styles.chapterSubtitle}>
                  {item.chapter_number}
                </Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    );
  }

  render() {
    const { jsonData } = this.state;

    if (!jsonData) {
      // Render loading state or a placeholder while data is being loaded
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={updatesImage} style={styles.imageStyle} />
          <Text style={styles.selectedSubjectText}>
            Select your class and subject
          </Text>
        </View>

        {this.renderTexts()}
      </View>
    );
  }
}

// Styles
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  imageStyle: {
    marginBottom: 30, // Add margin to create a gap
  },
  selectedSubjectText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    width: 100,
    height: 40,
    padding: 10,
    margin: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    backgroundColor: "#ecf0f1",
  },
  clearButton: {
    marginLeft: 10,
  },
  chapterItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  chapterImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chapterSubtitle: {
    fontSize: 16,
    color: "#555",
  },
  chapterDetails: {
    fontSize: 14,
    color: "#777",
  },

  // Add new styles
  chapterItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  chapterImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chapterSubtitle: {
    fontSize: 16,
    color: "#555",
  },
});


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor:
                Platform.OS === "android" ? "rgba(0,0,0,0)" : "transparent",
            },

            headerTitleStyle: {
              color: "#0096C7", // Change this to your desired text color
            },
            headerTitle: "The Special School",
            headerLeft: () => (
              <Ionicons
                name="ios-menu" // Change this to the left icon you want
                size={32}
                color="#0096C7" // Change this to your desired icon color
                style={{ marginLeft: 15 }}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="person-circle-outline"
                size={32}
                color="#0096C7"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("AboutUser")}
              />
            ),
          })}
        />
        <Stack.Screen name="AboutUser" component={AboutUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


AppRegistry.registerComponent("AwesomeProject", () => App);
