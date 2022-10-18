import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const flingGesture = (nav) => {
  return Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart((e) => {
      console.log("starting");
    })
    .onEnd((e) => {
      console.log("ending");
      nav.navigate("Home");
    });
};
const Screen3 = ({ navigation }) => {
  return (
    <GestureDetector gesture={flingGesture(navigation)}>
      <Animated.View style={styles.container}>
        <Text style={styles.text}>Screen3</Text>
        <Text>
          {">"}
          {">"} Swipe Left to Right {">"}
          {">"}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff66aa",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 40,
    fontFamily: "Roboto",
  },
});
