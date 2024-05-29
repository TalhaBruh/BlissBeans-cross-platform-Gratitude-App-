// FirstQuestionScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FirstQuestionScreen = () => {
  const [medicine, setMedicine] = useState('');
  const navigation = useNavigation();

  return (
    <View className= 'flex-1 bg-[#eae8e5] items-center '>
      <Text className="m-5 mb-8 mt-20 text-xl  text-white font-bold ">What medicine do you want to add?</Text>
      <TextInput
        value={medicine}
        onChangeText={setMedicine}
        placeholder='Enter medicine name'
        placeholderTextColor={'#fff'}
        className='p-4 rounded-full bg-gray-800 w-[80vw] text-gray-200'
      />
      <TouchableOpacity
        title="Next"
        onPress={() => navigation.navigate('SecondQuestionScreen', { medicine })}
        className='bg-yellow-300 px-4  py-2 w-24 items-center rounded-full m-2 absolute bottom-10 right-[35vw]'
      >
        <Text className='text-lg '>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FirstQuestionScreen;