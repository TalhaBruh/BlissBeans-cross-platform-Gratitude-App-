import React, { useState,useRef, useEffect, useContext } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { getItem, setItem } from "../utils/AsyncStorage";
import boy from "../assets/boy.json";
import beanDancing from "../assets/beanDancing.json";
import granny from "../assets/granny.png";
import beanTitle from "../assets/BlissBeansTitel.png"
import beandancing from "../assets/beandancing.gif";
import trueCheckBox from "../assets/CheckBoxTrue.png";
import falseCheckBox from "../assets/CheckBoxFalse.png";
const { width,height } = Dimensions.get('window');
import { setup } from "../assets/Sounds/AllSounds";
import { Audio } from 'expo-av';
import { LanguageContext } from '../context/LanguageContext';
import * as Font from 'expo-font';
import LottieView from 'lottie-react-native';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  // New Code for onBoarding Swiper_______________
 
  let arr=[1, 2, 3]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSkiped, setIsSkiped] = useState(false);

  const goToNextPage = () => {
    // Calculate the next index
    const nextIndex = currentIndex === arr.length - 1 ? 0 : currentIndex + 1;
    // Update the state to the next index
    setCurrentIndex(nextIndex);
    // Scroll to the next page
    scrollViewRef.current.scrollTo({ x: width * nextIndex });
    playSound(setup)
  };

  const handleDone = () => {
    // alert('All pages have been scrolled.');
    navigation.navigate("Home");
    setItem("onboarded", "1");
    playSound(setup)
  };

  useEffect(() => {
    if(isSkiped){
      navigation.navigate("Home");
    }
  }, [isSkiped])

  //Sound Effect
  const [sound, setSound] = useState();
  async function playSound (audioWillBe) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(audioWillBe);
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }
  

  useEffect(() =>{
    checkWhichLangIsSelected();
  },[])
  const { language ,setLanguage } = useContext(LanguageContext);
  const checkWhichLangIsSelected = async() =>{
    let selectedLang = await getItem("language");
    if(selectedLang == '1'){
      setLanguage('english')
    }else{setLanguage('german')}
  };

  const [fontsLoaded, fontError] = Font.useFonts({
    'PaytoneOne': require('../../assets/fonts/PaytoneOne-Regular.ttf'),
  });

  const scrollViewRef = React.createRef();
  return (
    <View style={{backgroundColor:'#cecac1',height:"100%"}}>
      <View style={{height:'5%',width:'100%',alignItems:'center',justifyContent:'center',}}></View>
      <View style={{height:'20%',flexDirection:'row',width:'100%',}}>
        <View style={{height:'100%',width:'30%',alignItems:'flex-end',justifyContent:'center',}}>
          <Image source={granny} style={{ width: 80, height: 150, }} />
        </View>
        <View style={{height:'100%',width:'70%',}}>
          <View style={{height:'60%',width:'98%',justifyContent:'flex-end',paddingLeft:10,}}>
            <Image source={beanTitle} style={{ width: '80%', height: 50,resizeMode:'contain', }} />
          </View>
          <View style={{height:'40%',width:'98%',justifyContent:'flex-end',paddingHorizontal:10,}}>
            <TouchableOpacity onPress={()=>{
              setIsSkiped(!isSkiped);
              playSound(setup)
            }}
            style={{width:"95%",flexDirection:'row', }}
            >
              <View style={{width:'100%',flexDirection:'row',alignItems:'center',}}>
                <Image source={isSkiped ? trueCheckBox : falseCheckBox} style={{ width: 15, height: 15,resizeMode:'contain',marginRight:10, }} />
                <Text style={{color:'#000', fontSize:13,fontWeight:'700'}}>{language == 'english' ? `Don't show this story next time.` : 'Zeigen Sie diese Geschichte das nächste Mal nicht.'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{height:'10%',alignItems:'center',justifyContent:'center',marginHorizontal:20,}}>
        <Text style={{color:'#9A5F3D', fontSize:20, fontWeight:'bold'}}>
          {language == 'english' ? `The Story behind this magical app:` : 'Die Geschichte hinter dieser magischen App:'}
        </Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        ref={scrollViewRef}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / width);
          setCurrentIndex(index);
        }}
      >
      {arr?.map((item,index)=>{
        return(
          <View key={index} style={[styles.page, { justifyContent:'space-between' }]}>
            
            <View style={{alignItems:'center',marginHorizontal:20,paddingTop:5,height:'80%'}}>
              {index == 0 ? <>
                  <Text style={{color:'#000',fontSize:14,padding:2, fontWeight:'500'}}>
                  {language == 'english' ? 
                  `A Wise old woman lives contentedly in her little hut. One day the children of the village come to her. the stand shyly at the garden fence. The woman, who of course has long since noticed the excited whispering, waits patiently until one of the children dares to speak to her.` 
                  : 
                  `Eine weise alte Frau lebt zufrieden in ihrer kleinen Hütte. Eines Tages kommen die Kinder des Dorfes zu ihr. Sie stehen schüchtern am Gartenzaun. Die Frau, die das natürlich schon längst bemerkt hat, ist aufgeregt flüstert und wartet geduldig, bis eines der Kinder es wagt, sie anzusprechen.`
                  }
                  </Text>
                  <Text style={{color:'#000',fontSize:14,padding:2, fontWeight:'500',marginTop:10}}>
                    {language =='english' ? 
                      `"The people in the village say that you are rich." says the child. "Then why do you live in this little hut and not in a big castle?” The old woman looks thoughtfully at the children. “Do people say that? Well, they don't mean that I have a lot of money. I enjoy life a lot - and that's why I'm rich."` 
                      :
                      `„Die Leute im Dorf sagen, dass du reich bist.“ sagt das Kind. "Dann Warum wohnst du in dieser kleinen Hütte und nicht in einem großen Schloss?“ Das alte Frau blickt nachdenklich auf die Kinder. „Sagen die Leute das? Nun, das bedeutet nicht, dass ich viel Geld habe. Ich genieße das Leben sehr – und deshalb bin ich reich.“`
                    }
                  </Text>
                </>
                : index == 1 ?<> 
                    <Text style={{color:'#000',fontSize:14, fontWeight:'500',}}>
                    {language == 'language' ? `“This is the secret of my happiness and my wealth:` : '„Das ist das Geheimnis meines Glücks und meines Reichtums:'}</Text>
                    <Text style={{color:'#000',fontSize:14, fontWeight:'500',marginTop:10,padding:2}}>
                     {language == 'english' ? 
                     `Every day when I get up, I put a handful of beans in my left pocket. And every time I like something and it Touches my heart. I take a bean and Put it my right pocket. For example. When I am happy about how beautifully the roses are blooming in my garden - a bean in my right pocket.When a bird Sings - a bean. When someone greets me kindly or when the sun warms my Skin - another bean, In the evening. I take all the beans of that day out of my right pocket. I remember how many good and beautiful things I experienced that day and say "Thank You" to God for it. Gratitude make me rich !... Wait a moment! I'll get something for you...` 
                      : 
                      `Jeden Tag, wenn ich aufstehe, lege ich ein Handvoll Bohnen in meiner linken Tasche. Und Jedes Mal gefällt mir etwas und es Berührt mein Herz. Ich nehme eine Bohne und Steck es in meine rechte Tasche. Zum Beispiel. Wenn ich mich darüber freue, wie schön die Rosen in meinem Garten blühen - eine Bohne in meiner rechten Tasche. Wenn ein Vogel Singt - eine Bohne. Wenn jemand grüßt mich freundlich oder wenn die Sonne mich wärmt Haut - noch eine Bohne, Abends. ICH Nimm alle Bohnen dieses Tages aus mir heraus rechte Tasche. Ich erinnere mich, wie viele Gutes und Schönes, was ich erlebt habe an diesem Tag und sage „Danke“ zu Gott dafür Es. Dankbarkeit macht mich reich!... Moment mal! Ich werde etwas für dich besorgen...`
                      }
                    </Text>
                  </>
                :
                <Text style={{color:'#000',fontSize:14,padding:2, fontWeight:'500'}}>
                  {language == 'english' ?
                  `“The children look after the old woman in silence and amazement as She disappears into the house. Gratitude makes her rich?! The woman appears at the front door again with a basket full of beans. She holds out the basket to ‘each child and each puts a handful of Beans in their left trouser pocket. And What does the woman do when the Children march off happily a short time later? She takes not just one bean, but two, from the left pocket and puts them in the right one.`
                  :
                  `„Die Kinder kümmern sich um die alte Frau in Stille und Staunen wie Sie verschwindet im Haus. Dankbarkeit macht sie reich?! Die Frau erscheint wieder mit vollem Korb vor der Haustür Bohnen. Sie hält ihm den Korb hin „Jedes Kind und jeder legt eine Handvoll davon Bohnen in der linken Hosentasche. Und Was macht die Frau, wenn die Kinder marschieren kurz fröhlich davon später? Sie nimmt nicht nur eine Bohne, sondern zwei, aus der linken Tasche und steckt sie hinein im rechten.`
                }
                </Text>
              }
            </View>
            <View style={{width:'100%',alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginBottom:10,height:'20%',}}>
              <Text style={{color:'#9A5F3D',fontSize:15,padding:20,fontWeight:'700'}}>{language == 'english' ? 'Page' : 'Seite'} {index+1}/{arr.length}</Text>
              <TouchableOpacity onPress={index == arr.length - 1 ? handleDone : goToNextPage}>
                  <Text style={{color:'#9A5F3D',fontSize:15,padding:20,fontWeight:'700'}}>
                  {
                    index == arr.length - 1 ? 
                    (language === 'english' ? 'Done' : 'Erledigt')
                    :
                    (language === 'english' ? 'Next' : 'Nächste') 
                  }
                  </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      })}
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height:'65%',width:'100%',
    // backgroundColor:'pink'
  },
  page: {
    width: width,height:'100%',
    // backgroundColor:'green'
  },
  text: {
    fontSize: 22,
    color: 'white',
  },
});

export default OnboardingScreen;


