import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CalendarScreen from "../screens/CalendarScreen";
import {
  OnboardingScreen,
  SignInScreen,
  Welcome,
  SignUpScreen,
  ForgotPassScreen,
  LogoutScreen,
} from "../screens";
import { useNavigation } from "@react-navigation/native";
import MedicineChartScreen from "../screens/MedicineChartScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Analytics") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{ fontWeight: "bold" }}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "black",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "yellow",
          borderTopWidth: 2,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Tab.Screen
        name="Calendar"
        options={{ headerShown: false }}
        component={CalendarScreen}
      />
      <Tab.Screen
        name="Analytics"
        options={{ headerShown: false }}
        component={MedicineChartScreen}
      />
      <Tab.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={LogoutScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
