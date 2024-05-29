// FourthQuestionScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FourthQuestionScreen = ({ route }) => {
  const { medicine, medicineType, purpose } = route.params;
  const [frequency, setFrequency] = useState('');
  const navigation = useNavigation();

  const options = ['Daily', 'Once a week', '2 days a week', '3 days a week', '4 days a week', '5 days a week', '6 days a week', 'Once a month', 'Alternate days'];

  return (
    <View className="flex-1 bg-[#eae8e5] items-center ">
      <Text className="m-5 mb-2 mt-20 text-xl  text-white font-bold ">How often do you take this medicine?</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => {
            setFrequency(option);
            navigation.navigate('FifthQuestionScreen', { medicine, medicineType, purpose, frequency: option });
          }}
          className="bg-yellow-300  px-4 py-2 w-[80vw] items-center rounded-full m-2"
        >
          <Text className="text-lg">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default FourthQuestionScreen;