// AddMedicineNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FirstQuestionScreen from './FirstQuestion';
import SecondQuestionScreen from './SecondQuestion';
import ThirdQuestionScreen from './ThirdQuestion';
import FourthQuestionScreen from './FourthQuestion';
import FifthQuestionScreen from './FifthQuestion';
import SixthQuestionScreen from './SixthQuestion';
import SeventhQuestionScreen from './SeventhQuestion';
// Import the other screen components here

const Stack = createStackNavigator();

const AddMedicineNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FirstQuestionScreen"
      component={FirstQuestionScreen}
    />
    <Stack.Screen
      name="SecondQuestionScreen"
      component={SecondQuestionScreen}
    />
    <Stack.Screen
      name="ThirdQuestionScreen"
      component={ThirdQuestionScreen}
    />
    <Stack.Screen
      name="FourthQuestionScreen"
      component={FourthQuestionScreen}
    />
    <Stack.Screen
      name="FifthQuestionScreen"
      component={FifthQuestionScreen}
    />
    <Stack.Screen
      name="SixthQuestionScreen"
      component={SixthQuestionScreen}
    />
    <Stack.Screen
      name="SeventhQuestionScreen"
      component={SeventhQuestionScreen}
    />
    {/* Add a Stack.Screen for each of the other screens here */}
  </Stack.Navigator>
);

export default AddMedicineNavigator;