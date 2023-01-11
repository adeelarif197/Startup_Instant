import React, { useState} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  
} from "react-native";
import { Appbar, useTheme, Caption } from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";

const Chats = (props) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const { width } = Dimensions.get("window");
  return (
    <View style={{ flex: 1}}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.surface, elevation: 2 }}
      >
        <Appbar.Content title="Messages" />
      </Appbar.Header>

        <Text style={{margin:10, alignSelf:'center', color:theme.colors.disabled }}>Coming Soon</Text>


        {/* ///////////////////////////////////////Coming Soon Modal///////////////////////////////////////////////// */}
        {/* <Modal
        animationType="slide"
        transparent={false}
        isVisible={visible || false}
        backdropColor={"white"}
        style={{ flex:1 }}
        // onModalHide={() => {}}
        >
        <View style={{flex:1,justifyContent:'space-between',marginVertical:'5%'}}>
        <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    // paddingHorizontal: 12,
                    // zIndex: 9999,
                    backgroundColor: theme.colors.surface,
                    height: 54,
                    width:'97%',
                    // elevation: 2,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {setComment(false)}}
                >
                    <View style={{flexDirection:'row'}}>
                    <Ionicons
                        color={theme.colors.backdrop}
                        name="chevron-back"
                        size={26}
                    />
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            // marginHorizontal: 12,
                            color:theme.colors.backdrop,
                            alignSelf:'center'
                        }}
                    >
                        Back
                    </Text>
                    </View>
                </TouchableOpacity>
                <View style={{alignSelf:'center', alignItems: "center"}}>
                    
                </View>
                <View/>
            </View>
            <Image  resizeMode='contain' style={{alignSelf:'center',height:'30%',width:'60%',borderRadius:100}} source={require('../../../assets/modal.jpg')}/>
            <Text style={{fontSize:35,color:theme.colors.text,alignSelf:'center',fontWeight:'700',marginHorizontal:'25%',textAlign:'center'}}>
            COMINGSOON!
            </Text>
            <Text style={{fontSize:25,color:theme.colors.text,alignSelf:'center',fontWeight:'700',marginVertical:'10%',textAlign:'center',marginHorizontal:'15%'}}>
            This page is coming soon STAY TUNED!
            </Text>
            <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                            backgroundColor: theme.colors.primary,
                            paddingVertical: 12,
                            paddingHorizontal: width / 3.3,
                            borderRadius: 7,
                            marginHorizontal:'5%',
                            elevation:10
                        }}
                        // onPress={() => props.navigation.push("PROFILE_UPDATE")}
                    >
                        <Text
                            style={{
                                color: theme.colors.surface,
                                // fontWeight: "bold",
                                fontSize: 16,
                                alignSelf:'center'
                            }}
                        >
                            GO HOME
                        </Text>
                    </TouchableOpacity>
        </View>
      </Modal> */}


      {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
      {/*  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (*/}
      {/*    <TouchableOpacity*/}
      {/*      activeOpacity={0.9}*/}
      {/*      key={item}*/}
      {/*      onPress={() => props.navigation.push("CHAT_DETAIL")}*/}
      {/*    >*/}
      {/*      <View*/}
      {/*        style={{*/}
      {/*          flexDirection: "row",*/}
      {/*          justifyContent: "space-between",*/}
      {/*          width: width,*/}
      {/*          paddingHorizontal: 12,*/}
      {/*          backgroundColor: theme.colors.surface,*/}
      {/*          marginVertical: 1,*/}
      {/*          paddingVertical: 8,*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <View style={{ flexDirection: "row", alignItems: "center" }}>*/}
      {/*          <Image*/}
      {/*            source={{*/}
      {/*              uri: "https://media-exp1.licdn.com/dms/image/C5603AQGKmhwJ-dZuXA/profile-displayphoto-shrink_200_200/0/1610045585641?e=1636588800&v=beta&t=ZKKpzL7u7yR5iFfrcuSIrjNYBf4tR2CEX3rTifCESpk",*/}
      {/*            }}*/}
      {/*            style={styles.profilePic}*/}
      {/*          />*/}
      {/*          <View style={{ marginHorizontal: 12 }}>*/}
      {/*            <View*/}
      {/*              style={{*/}
      {/*                flexDirection: "row",*/}
      {/*                justifyContent: 'space-between',*/}
      {/*              }}*/}
      {/*            >*/}
      {/*              <View style={{ alignItems: 'flex-start', paddingRight: 12}}>*/}
      {/*                <Text style={{ fontSize: 16, fontWeight: "bold" }}>*/}
      {/*                  Babu Bhaiya*/}
      {/*                </Text>*/}
      {/*                <Text numberOfLines={1}*/}
      {/*                  style={{*/}
      {/*                    fontSize: 15,*/}
      {/*                    marginTop: 2,*/}
      {/*                    width: width/1.8*/}
      {/*                  }}*/}
      {/*                >*/}
      {/*                  Aye Shyam khopdi tod rhhjhjkjkjhg*/}
      {/*                </Text>*/}
      {/*              </View>*/}
      {/*              <Caption style={{ fontSize: 13, justifyContent: 'flex-end' }}>10:42 PM</Caption>*/}
      {/*            </View>*/}
      {/*          </View>*/}
      {/*        </View>*/}
      {/*      </View>*/}
      {/*    </TouchableOpacity>*/}
      {/*  ))}*/}
      {/*</ScrollView>*/}
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  profilePic: {
    height: 55,
    width: 55,
    borderRadius: 75,
  },
});
