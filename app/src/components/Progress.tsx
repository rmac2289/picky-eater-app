import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from "react-native";
import { initialSafeFoods } from "../data/mockData";

const Progress = ({progress}) => {
    const [safeFoods] = useState(initialSafeFoods);
    return (
        <ScrollView style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Progress Overview</Text>
        
              <View style={styles.progressSection}>
                <Text style={styles.subsectionTitle}>Acceptance Rate</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[styles.progressFill, { width: `${progress}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {progress}% of foods accepted
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
    )
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
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
})

export default Progress;