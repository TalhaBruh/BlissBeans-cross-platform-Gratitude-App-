import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  BackHandler,
} from "react-native";
import diary from "../assets/diary-icon.png";
import Document from "../assets/setup-icon.png";
import beansPlate from "../assets/beansPlate.png";
import { getAllBeans } from "../utils/db";
import { groupBy } from "lodash"; // Import this
import diaryHeader from "../assets/diaryHead.png";
import { format } from "date-fns"; // Import this
import Modal from "react-native-modal";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { setup } from "../assets/Sounds/AllSounds";
import { getItem } from "../utils/AsyncStorage";
import { LanguageContext } from "../context/LanguageContext";
const Diary = ({ props }) => {
  const [beans, setBeans] = useState([]);
  const [selectedBean, setSelectedBean] = useState(null);
  const navigation = useNavigation();
  let route = useRoute();
  // alert(JSON.stringify(route.name))
  console.log("Beans  = ", beans);
  useEffect(() => {
    const fetchBeans = async () => {
      try {
        const beans = await getAllBeans();
        const beansByDay = Object.entries(
          groupBy(beans, (bean) => new Date(bean.time_created).toDateString())
        ).map(([date, beans]) => ({ date, beans }));
        setBeans(beansByDay);
      } catch (error) {
        console.error(`Error fetching beans: ${error}`);
      }
    };

    fetchBeans();
  }, []);

  // Sound Effect
  const [sound, setSound] = useState();
  async function playSound(audioWillBe) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(audioWillBe);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  const handleCenterPress = () => {
    // console.log('press')
    playSound(setup);
    navigation.navigate("Home");
  };
  const handleBeanPress = (bean) => {
    setSelectedBean(bean);
    console.log(`Bean pressed: ${bean.description}`);
  };

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  let dateFormate = (_date) => {
    // let date = new Date();
    let arr = [
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
      "Sonntag",
    ];
    let getDay = _date.getDay() - 1;
    let germanDateWithDay = arr[getDay] + " " + _date.getDate();
    console.log("Date = ", germanDateWithDay);
    return germanDateWithDay;
  };

  const { language, setLanguage } = useContext(LanguageContext);
  // let selectedLang = await getItem("language");
  // if(selectedLang == '1'){
  //   setLanguage('english')
  // }else{setLanguage('german')}

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topHeader}>
          <Image
            source={diaryHeader}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <FlatList
          data={beans}
          keyExtractor={(item) => item.date}
          renderItem={({ item: group }) => (
            <View key={group.date} style={{ marginHorizontal: 10 }}>
              <View
                style={{
                  width: "100%",
                  height: 50,
                  flexDirection: "row",
                  marginLeft: -5,
                }}
              >
                <Text style={styles.dateHeading}>
                  {" "}
                  {language == "english"
                    ? format(new Date(group.date), "EEE d")
                    : dateFormate(new Date(group.date))}{" "}
                </Text>
                <View style={styles.countContainer}>
                  <Text style={styles.count}>{group.beans.length}</Text>
                </View>
              </View>
              {group.beans.map((bean, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleBeanPress(group.beans[0])}
                >
                  <View key={bean.id} style={styles.beanRow}>
                    <View style={styles.beanTextContainer}>
                      <Text style={styles.beanDescription}>
                        {bean.description}
                      </Text>
                    </View>
                    {bean.picture_uri && (
                      <Image
                        source={{ uri: bean.picture_uri }}
                        style={styles.beanImage}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              {/* <View style={styles.separator} /> */}
            </View>
          )}
        />
      </View>

      <Modal isVisible={selectedBean !== null}>
        <View style={styles.modal}>
          <View style={styles.triangle} />
          <Text style={styles.modalHeading}>
            {selectedBean?.time_created &&
            !isNaN(new Date(selectedBean?.time_created))
              ? format(new Date(selectedBean?.time_created), "EEE d")
              : "Invalid date"}
          </Text>
          <Text style={styles.modalDescription}>
            {selectedBean?.description}
          </Text>
          {selectedBean?.picture_uri && (
            <Image
              source={{ uri: selectedBean.picture_uri }}
              style={styles.modalImage}
            />
          )}
          <TouchableOpacity onPress={() => setSelectedBean(null)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Donation");
          }}
        >
          <Image source={Document} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCenterPress}>
          <Image source={beansPlate} style={styles.largeIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={diary}
            style={[styles.icon, { width: 50, height: 40 }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#cecac1'
    backgroundColor: "red",
  },
  topSection: {
    flex: 0.8,
    backgroundColor: "#eae8e5",
    // alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bottomSection: {
    flex: 0.2,
    backgroundColor: "#9a6041",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  countContainer: {
    backgroundColor: "#9a6041",
    width: 30,
    height: 30,
    marginLeft: 10,
    borderRadius: 20,
    // marginBottom : -40,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    color: "white",
  },
  icon: {
    width: 40,
    height: 40,
  },
  largeIcon: {
    width: 200,
    height: 200,
  },
  dateHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#9a6041",
    textAlign: "left",
    // margin: 10,
  },
  beanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    // borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 15,
    marginTop: 10,
    paddingBottom: 10,
    width: "100%",
    // backgroundColor:"yellow",
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
  },
  beanTextContainer: {
    // marginLeft: 10,
    // backgroundColor:'pink',
    width: "65%",
  },
  beanTime: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#9a6041",
  },
  beanDescription: {
    fontSize: 15,
    fontWeight: "400",
    color: "#9a6041",
    // marginLeft: 40,
    // backgroundColor:'green'
  },
  beanImage: {
    width: 100,
    height: 100,
    borderColor: "#9a6041",
    borderWidth: 1,
  },
  headerImage: {
    width: "100%",
    height: 150,
    zIndex: 1,
  },
  topHeader: {
    width: "100%",
    height: 100,
  },
  separator: {
    borderBottomColor: "#9a6041",
    borderBottomWidth: 2,
    width: "80%",
    // marginLeft: 30,
    marginBottom: 5,
    alignSelf: "center",
  },
  modal: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 22,
    color: "orange",
    minHeight: "30%",
    justifyContent: "space-between",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "90%",
    alignSelf: "center",

    alignItems: "center",
  },
  triangle: {
    position: "absolute",
    left: 20,
    bottom: -70,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 30,
    borderTopWidth: 70,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "rgba(255, 255, 255, 0.85)",
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#9a6041",
    textAlign: "left",
  },
  modalImage: {
    width: "80%",
    height: 150,
    marginBottom: 10,
  },
  closeButton: {
    textAlign: "center",
    color: "#9a6041",
    fontSize: 16,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: "#9a6041",
  },
});

export default Diary;
