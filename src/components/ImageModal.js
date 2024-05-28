import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerComp(props) { 
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const pickImage = async (source) => {
    // Request permission based on the source (camera or album)
    const { status } = await (source === 'camera'
      ? ImagePicker.requestCameraPermissionsAsync()
      : ImagePicker.requestMediaLibraryPermissionsAsync());

    if (status !== 'granted') {
      alert('Sorry, we need permissions to make this work!');
      return;
    }

    let result = await (source === 'camera'
      ? ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
      : ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }));

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      props.ImageResult(result)
    }

    // Close the modal after selecting an option
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={()=> props.OnRequestClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.CrossButton}>
              <TouchableOpacity onPress={()=> {props.onCloseModal(false)}}>
                <Text style={{color:'#000', fontWeight:'bold',fontSize:18}}> X </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                pickImage('camera');
              }}
            >
              <Text style={styles.textStyle}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {marginBottom: 25}]}
              onPress={() => {
                pickImage('album');
              }}
            >
              <Text style={styles.textStyle}>Open Album</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width:'100%',
    // height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position:'absolute'
  },
  image: {
    width: 200,
    height: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width:'70%',
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width:'80%',
    elevation: 2,
    marginBottom: 15,
    backgroundColor:'orange'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  CrossButton:{
    height:25,width:25,
    backgroundColor:'#FF451D',
    borderRadius:50,marginBottom:20,
    alignItems:'center',marginTop:5,
    alignSelf:'flex-end',marginRight:10,
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
