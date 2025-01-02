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
import Icon from "react-native-vector-icons/Feather";
import { initialFoodLogs } from "../data/mockData";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Progress from "../components/Progress";


function formatDate(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    if (year === today.getFullYear()) {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeek = daysOfWeek[date.getDay()];
      return `${dayOfWeek} ${month}/${day}`;
    } else {
      return `${month}/${day}/${year}`;
    }
  }
}

const MainScreen = () => {
  const [activeTab, setActiveTab] = useState("log");
  const [foodLogs, setFoodLogs] = useState(initialFoodLogs);
  const [newFood, setNewFood] = useState("");
  const [newReaction, setNewReaction] = useState("accepted");
  const [newNotes, setNewNotes] = useState("");
  const [mealType, setMealType] = useState('breakfast');


  const handleAddFoodLog = () => {
    const newLog = {
      id: foodLogs.length + 1,
      food: newFood,
      reaction: newReaction,
      mealType: mealType,
      date: new Date().toString(),
      notes: newNotes
    };
    if (newFood == "") {
      alert("No food added")
      return;
    }
    setFoodLogs([...foodLogs, newLog]);
    setNewFood('');
    setNewNotes('');
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
        <Text style={styles.label}>Food</Text>
        <TextInput
          style={styles.input}
          value={newFood}
          onChangeText={setNewFood}
          placeholder="Enter food name"
        />
        <Text style={styles.label}>Meal</Text>
        <View style={styles.mealTypeSelector}>
          <View style={styles.mealTypeRow}>
            <TouchableOpacity
              style={[
                styles.mealTypeButton,
                mealType === 'breakfast' && styles.mealTypeButtonSelected,
                { backgroundColor: mealType === 'breakfast' ? '#e3f2fd' : '#fff' }
              ]}
              onPress={() => setMealType('breakfast')}
            >
              <Text style={[
                styles.mealTypeButtonText,
                mealType === 'breakfast' && { color: '#1565c0' }
              ]}>
                Breakfast
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.mealTypeButton,
                mealType === 'lunch' && styles.mealTypeButtonSelected,
                { backgroundColor: mealType === 'lunch' ? '#e3f2fd' : '#fff' }
              ]}
              onPress={() => setMealType('lunch')}
            >
              <Text style={[
                styles.mealTypeButtonText,
                mealType === 'lunch' && { color: '#1565c0' }
              ]}>
                Lunch
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mealTypeRow}>
            <TouchableOpacity
              style={[
                styles.mealTypeButton,
                mealType === 'dinner' && styles.mealTypeButtonSelected,
                { backgroundColor: mealType === 'dinner' ? '#e3f2fd' : '#fff' }
              ]}
              onPress={() => setMealType('dinner')}
            >
              <Text style={[
                styles.mealTypeButtonText,
                mealType === 'dinner' && { color: '#1565c0' }
              ]}>
                Dinner
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.mealTypeButton,
                mealType === 'snack' && styles.mealTypeButtonSelected,
                { backgroundColor: mealType === 'snack' ? '#e3f2fd' : '#fff' }
              ]}
              onPress={() => setMealType('snack')}
            >
              <Text style={[
                styles.mealTypeButtonText,
                mealType === 'snack' && { color: '#1565c0' }
              ]}>
                Snack
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.label}>Reaction</Text>
        <View style={styles.reactionSelector}>
          <TouchableOpacity
            style={[
              styles.reactionButton,
              newReaction === 'accepted' && styles.reactionButtonSelected,
              { backgroundColor: newReaction === 'accepted' ? '#e8f5e9' : '#fff' }
            ]}
            onPress={() => setNewReaction('accepted')}
          >
            <Text style={[
              styles.reactionButtonText,
              newReaction === 'accepted' && { color: '#2e7d32' }
            ]}>
              Accepted
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.reactionButton,
              newReaction === 'rejected' && styles.reactionButtonSelected,
              { backgroundColor: newReaction === 'rejected' ? '#ffebee' : '#fff' }
            ]}
            onPress={() => setNewReaction('rejected')}
          >
            <Text style={[
              styles.reactionButtonText,
              newReaction === 'rejected' && { color: '#c62828' }
            ]}>
              Rejected
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.reactionButton,
              newReaction === 'tried' && styles.reactionButtonSelected,
              { backgroundColor: newReaction === 'tried' ? '#fff3e0' : '#fff' }
            ]}
            onPress={() => setNewReaction('tried')}
          >
            <Text style={[
              styles.reactionButtonText,
              newReaction === 'tried' && { color: '#ef6c00' }
            ]}>
              Tried
            </Text>
          </TouchableOpacity>
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

      {foodLogs.map(log => (
        <Swipeable
          key={log.id}
          renderRightActions={() => (
            <TouchableOpacity
              style={styles.deleteSwipe}
              onPress={() => {
                setFoodLogs(foodLogs.filter(item => item.id !== log.id));
              }}
            >
              <Text style={styles.deleteSwipeText}>Delete</Text>
            </TouchableOpacity>
          )}
        >
          <View style={styles.logItem}>
            <View>
              <Text style={styles.logFood}>{log.food}</Text>
              <Text style={styles.logMealType}>{log.mealType}</Text>
              <Text style={styles.logNotes}>{log.notes}</Text>
            </View>
            <View style={{flexDirection: "column", alignItems: "center"}}>
              <Text style={[
                styles.reactionBadge,
                log.reaction === 'accepted' ? styles.acceptedBadge :
                  log.reaction === 'rejected' ? styles.rejectedBadge :
                    styles.triedBadge
              ]}>
                {log.reaction}
              </Text>
              <Text style={styles.logDate}>{formatDate(new Date(log.date))}</Text>
            </View>
          </View>
        </Swipeable>
      ))}
    </ScrollView>
  );

  const renderProgressTab = () => (
    <Progress progress={calculateProgress()}/>
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
  deleteSwipe: {
    backgroundColor: '#ff1744',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 20,
    marginBottom: 8,
  },
  deleteSwipeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  reactionSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  reactionButton: {
    flex: 1,
    padding: 8,  // reduced from 12
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionButtonText: {
    fontSize: 12,  // reduced from 14
    fontWeight: '500',
    color: '#666',
  },
  mealTypeSelector: {
    marginBottom: 16,
  },
  mealTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mealTypeButton: {
    width: '48%', // This gives space between buttons
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealTypeButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
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
    marginBottom: 16
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
  logMealType: {
    color: "#6200ee"
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
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  mealList: {
    gap: 16,
  },
  mealItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 2,
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
  description: {
    marginBottom: 10
  }
});

export default MainScreen;
