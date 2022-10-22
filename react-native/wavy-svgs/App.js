import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from "react-native-svg";

export default function App() {
  const [dimensions, setDimensions] = useState({ window });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  const originalWidth = 308;
  const originalHeight = 43;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = dimensions.window.width;
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,0,80,1)", "rgba(255,0,80,0.37)"]}
        style={styles.containerTop}
      >
        <Text style={styles.text}>
          This is a longer sentence meant to test the relative sizing of the
          component and see the adjustment thereof. This is a longer sentence
          meant to test the relative sizing of the component and see the
          adjustment thereof.
        </Text>
      </LinearGradient>
      <View style={{ width: windowWidth, aspectRatio }}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 308 43"
          preserveAspectRatio="xMidYMax slice"
        >
          <Path
            d="M190.963 0L308 43V0H0V19L73.0801 43L190.963 0Z"
            fill="#FF0050"
            fillOpacity="0.37"
          />
        </Svg>
      </View>
      <View style={styles.containerBottom}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBottom: {
    alignItems: "flex-end",
    backgroundColor: "#ccc",
    flex: 1,
    justifyContent: "flex-end",
  },
  containerTop: {
    alignItems: "center",
    borderBottomColor: "#888",
    borderStyle: "dotted",
    borderBottomWidth: 1,
    flexShrink: 1,
    justifyContent: "center",
    padding: 20,
  },

  text: { color: "#fff", fontSize: 20 },
});
