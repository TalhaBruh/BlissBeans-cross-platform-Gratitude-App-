import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Welcome,
  OnboardingScreen,
  SignUpScreen,
  SignInScreen,
  ForgotPassScreen,
  Basic,
  LogoutScreen,
} from "../screens";

import { getItem } from "../utils/AsyncStorage";
import Diary from "../screens/Diary";
import Donation from "../screens/Donation";
import { LanguageProvider } from "../context/LanguageContext";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  if (showOnboarding === null) {
    return null;
  }

  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={showOnboarding ? "Onboarding" : "SignIn"}
          initialRouteName={showOnboarding ? "Onboarding" : "Home"}
        >
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Welcome}
          />
          <Stack.Screen
            name="Diary"
            options={{ headerShown: false }}
            component={Diary}
          />
          <Stack.Screen
            name="Donation"
            options={{ headerShown: false }}
            component={Donation}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
