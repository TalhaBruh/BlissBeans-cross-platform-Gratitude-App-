// SeventhQuestionScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MedicineContext } from '../../context/ContextProvider';
import { useNavigation } from '@react-navigation/native';
import { TimePicker } from '../../components';
import * as Notifications from 'expo-notifications';




const SeventhQuestionScreen = ({ route }) => {
  const { medicine, medicineType, purpose, frequency, days, dosage } = route.params;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { medicines, setMedicines , user} = useContext(MedicineContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const navigation = useNavigation();


  const saveMedicine = async () => {
    const newMedicine = { medicine, medicineType, purpose, frequency, days, dosage, time: date , createdBy: user?.uid};
    setMedicines([...medicines, newMedicine]);
    console.log("saved", newMedicine);
  
    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine Reminder",
        body: "It's time to take your medicine",
      },
      trigger: date,
    });
    console.log("scheduled",date);
    navigation.navigate('Home')
  };

  Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received: ', notification);
  });
  const setTime = (time) => {
    setDate(time);
  };
  return (
    <View className='flex-1 bg-[#eae8e5] items-center  '>
      <Text className=" text-xl  text-white font-bold mt-20">Set Time</Text>
        <TouchableOpacity
        title="Select Time"
        onPress={() => setShow(true)}
        className='bg-yellow-300 px-4  py-2 w-[50vw] items-center rounded-full m-2 absolute bottom-20 right-[20vw]'
      >
        <Text className='text-lg '>Select Time</Text>
      </TouchableOpacity>
<View className='w-[80vw] mt-28 ml-20'>
<TimePicker onTimeChange={setTime} />

</View>
      {show && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        title="Save Medicine"
        onPress={saveMedicine}
        className='bg-yellow-300 px-4  py-2 w-[50vw] items-center rounded-full m-2 absolute bottom-5 right-[20vw]'
      >
        <Text className='text-lg '>Save Medicine</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SeventhQuestionScreen;