import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import MainScreen from "./src/screens/MainScreen";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MainScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
