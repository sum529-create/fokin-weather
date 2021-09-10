import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>날씨 정보를 받아오고 있습니다. :)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // css에 없는 react-native 전용
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#343a40",
  },
  text: {
    fontWeight: "600",
    color: "#FFF",
    fontSize: 30,
  },
});
