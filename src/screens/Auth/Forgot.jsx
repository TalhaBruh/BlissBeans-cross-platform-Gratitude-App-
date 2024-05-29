import { SafeAreaView, Text, View, TouchableOpacity,Image, TextInput } from "react-native"
import {ForgotPass} from '../../assets/authScreens'
import { useNavigation } from "@react-navigation/native"
const ForgotPassScreen = () => {
    const navigation = useNavigation()
    const handleForgotPass = async ()=>{
     
     navigation.navigate('SignIn')
    }
    return (
    <SafeAreaView className= 'flex-1 items-center justify-center bg-[#eae8e5]'>
        <View>
            <Image source={ForgotPass} className ='h-[150px] w-[150px] mb-10'/>
        </View>
        <View>
            <TextInput placeholder="email" className='bg-gray-100  text-center py-2 rounded-full m-2 ' />            
            <TouchableOpacity onPress={handleForgotPass} className='bg-red-600 px-[30%] py-2 rounded-full m-2'>
                <Text className = 'text-white text-lg uppercase'>Recover</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default ForgotPassScreen