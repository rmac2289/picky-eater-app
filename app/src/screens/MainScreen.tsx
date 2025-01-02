import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Feather";
import { initialFoodLogs, initialSafeFoods } from "../data/mockData";

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState("log");
  const [foodLogs, setFoodLogs] = useState(initialFoodLogs);
  const [newFood, setNewFood] = useState("");
  const [newReaction, setNewReaction] = useState("accepted");
  const [newNotes, setNewNotes] = useState("");
  const [safeFoods] = useState(initialSafeFoods);

  const handleAddFoodLog = () => {
    const newLog = {
      id: foodLogs.length + 1,
      food: newFood,
      reaction: newReaction,
      date: new Date().toISOString().split("T")[0],
      notes: newNotes,
    };
    setFoodLogs([...foodLogs, newLog]);
    setNewFood("");
    setNewNotes("");
  };

  const calculateProgress = () => {
    const accepted = foodLogs.filter(
      (log) => log.reaction === "accepted"
    ).length;
    return Math.round((accepted / foodLogs.length) * 100) || 0;
  };

  const renderFoodLoggingTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Food Item</Text>
        <TextInput
          style={styles.input}
          value={newFood}
          onChangeText={setNewFood}
          placeholder="Enter food name"
        />

        <Text style={styles.label}>Reaction</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={newReaction}
            onValueChange={(itemValue) => setNewReaction(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Accepted" value="accepted" />
            <Picker.Item label="Rejected" value="rejected" />
            <Picker.Item label="Tried" value="tried" />
          </Picker>
        </View>

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={newNotes}
          onChangeText={setNewNotes}
          placeholder="Add any notes about the meal"
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cameraButton}>
            <Icon name="camera" size={20} color="#000" />
            <Text style={styles.buttonText}>Add Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddFoodLog}
          >
            <Text style={styles.submitButtonText}>Add Food Log</Text>
          </TouchableOpacity>
        </View>
      </View>

      {foodLogs.map((log) => (
        <View key={log.id} style={styles.logItem}>
          <View>
            <Text style={styles.logFood}>{log.food}</Text>
            <Text style={styles.logNotes}>{log.notes}</Text>
          </View>
          <View>
            <Text
              style={[
                styles.reactionBadge,
                log.reaction === "accepted"
                  ? styles.acceptedBadge
                  : log.reaction === "rejected"
                  ? styles.rejectedBadge
                  : styles.triedBadge,
              ]}
            >
              {log.reaction}
            </Text>
            <Text style={styles.logDate}>{log.date}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderProgressTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Progress Overview</Text>

      <View style={styles.progressSection}>
        <Text style={styles.subsectionTitle}>Acceptance Rate</Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${calculateProgress()}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          {calculateProgress()}% of foods accepted
        </Text>
      </View>

      <View style={styles.safeFoodsSection}>
        <Text style={styles.subsectionTitle}>Safe Foods List</Text>
        <View style={styles.safeFoodTags}>
          {safeFoods.map((food, index) => (
            <Text key={index} style={styles.safeFoodTag}>
              {food}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderMealIdeasTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Meal Ideas</Text>
      <Text style={styles.description}>
        Based on your safe foods, here are some meal suggestions:
      </Text>

      <View style={styles.mealList}>
        <View style={styles.mealItem}>
          <Text style={styles.mealTitle}>Pasta with Hidden Veggies</Text>
          <Text style={styles.mealDescription}>
            Uses safe food: Pasta{"\n"}
            Suggestion: Try mixing in pureed carrots or squash
          </Text>
        </View>

        <View style={styles.mealItem}>
          <Text style={styles.mealTitle}>Fruit & Yogurt Parfait</Text>
          <Text style={styles.mealDescription}>
            Uses safe foods: Apple, Yogurt{"\n"}
            Suggestion: Layer with granola for added texture
          </Text>
        </View>

        <View style={styles.mealItem}>
          <Text style={styles.mealTitle}>Fun Toast Shapes</Text>
          <Text style={styles.mealDescription}>
            Uses safe food: Bread{"\n"}
            Suggestion: Cut into fun shapes and add different toppings
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Picky Eater Helper</Text>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "log" && styles.activeTab]}
          onPress={() => setActiveTab("log")}
        >
          <Text style={styles.tabText}>Food Log</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "progress" && styles.activeTab]}
          onPress={() => setActiveTab("progress")}
        >
          <Text style={styles.tabText}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "meals" && styles.activeTab]}
          onPress={() => setActiveTab("meals")}
        >
          <Text style={styles.tabText}>Meal Ideas</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "log" && renderFoodLoggingTab()}
      {activeTab === "progress" && renderProgressTab()}
      {activeTab === "meals" && renderMealIdeasTab()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6200ee",
    marginVertical: 16,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabContent: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    marginTop: Platform.OS === "ios" ? 0 : -8,
    marginBottom: Platform.OS === "ios" ? 0 : -8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 4,
    gap: 4,
  },
  buttonText: {
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: "#6200ee",
    padding: 8,
    borderRadius: 4,
    flex: 1,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  logItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  logFood: {
    fontSize: 16,
    fontWeight: "500",
  },
  logNotes: {
    color: "#666",
    marginTop: 4,
  },
  reactionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
  acceptedBadge: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  },
  rejectedBadge: {
    backgroundColor: "#ffebee",
    color: "#c62828",
  },
  triedBadge: {
    backgroundColor: "#fff3e0",
    color: "#ef6c00",
  },
  logDate: {
    color: "#666",
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  progressText: {
    color: "#666",
    marginTop: 4,
  },
  safeFoodTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  safeFoodTag: {
    backgroundColor: "#e8f0fe",
    color: "#1a73e8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: "hidden",
  },
  mealList: {
    gap: 16,
  },
  mealItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  mealDescription: {
    color: "#666",
  },
});

export default MainScreen;
