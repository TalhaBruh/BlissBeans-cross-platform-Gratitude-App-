// FifthQuestionScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FifthQuestionScreen = ({ route }) => {
  const { medicine, medicineType, purpose, frequency } = route.params;
  const [days, setDays] = useState([]);
  const navigation = useNavigation();

  const options = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handlePress = (day) => {
    setDays((prevDays) => [...prevDays, day]);
    navigation.navigate('SixthQuestionScreen', { medicine, medicineType, purpose, frequency, days: [...days, day] });
  }

  return (
    <View className="flex-1 bg-[#eae8e5] items-center ">
      <Text className="m-5 mb-20 mt-20 text-xl  text-white font-bold ">Choose the days you need to take the med</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handlePress(option)}
          className="bg-yellow-300  px-4 py-2 w-[80vw] items-center rounded-full m-2"
        >
          <Text className="text-lg">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default FifthQuestionScreen;