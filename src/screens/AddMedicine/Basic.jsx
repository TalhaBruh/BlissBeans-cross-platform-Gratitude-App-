import React, { useContext, useState  } from 'react';
import { Button, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { MedicineContext } from '../../context/ContextProvider';
import { useNavigation } from '@react-navigation/native';
const Basic = () => {
  const { setMedicines } = useContext(MedicineContext);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [quantity, setQuantity] = useState('');
  const [food, setFood] = useState('');
const navigation = useNavigation();
  const addMedicine = () => {
    setMedicines(prev => [...prev, { name, time, quantity, food }]);
  navigation.navigate('Home');
  };

  return (
<View className='flex-1 bg-blue-900 justify-center p-5'>
      <TextInput className='bg-gray-100 text-center py-2 rounded-full m-2' placeholder="Name" value={name}  onChangeText={setName} />
      <TextInput className='bg-gray-100 text-center py-2 rounded-full m-2' placeholder="Time" value={time} onChangeText={setTime} />
      <TextInput className='bg-gray-100 text-center py-2 rounded-full m-2' placeholder="Quantity" value={quantity} onChangeText={setQuantity} />
      <TextInput className='bg-gray-100 text-center py-2 rounded-full m-2' placeholder="Food" value={food} onChangeText={setFood} />
      <View className='bg-red-600 px-16 py-2 rounded-full m-2'>
        <TouchableOpacity  onPress={addMedicine} >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Basic;