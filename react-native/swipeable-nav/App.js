import { StyleSheet, SafeAreaView, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Screen1, Screen2, Screen3 } from "./App/screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants from "expo-constants";

const Setup = createStackNavigator();
const SetupNavigator = () => (
  <Setup.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: "#fff" },
      title: "Back",
      headerTintColor: "#ff6600",
    }}
    initialRouteName={Screen1}
  >
    <Setup.Screen
      name="Home"
      component={Screen1}
      options={{
        headerShown: false,
      }}
    />
    {/* you can create a dynamic title by passing a function to the options param */}
    <Setup.Screen name="Screen2" component={Screen2} />
    <Setup.Screen name="Screen3" component={Screen3} />
  </Setup.Navigator>
);
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <SetupNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
