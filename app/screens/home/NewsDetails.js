import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme, Caption, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import moment from "moment";

const NewsDetails = ({navigation, route}) => {
  const theme = useTheme();
  const { width } = Dimensions.get("window");
  const statusBarHeight = getStatusBarHeight();

  const {news:item} = route.params.item;
  const {user} = route.params.item;
  if(!item){
    navigation.goBack()
    return null
  }
  // const

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        marginTop: statusBarHeight/1.5,
        paddingHorizontal:'3%',
        backgroundColor: theme.colors.surface,
      }}
    >
      
      <View
                style={{
                  flex:1,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    // paddingHorizontal: 12,
                    // zIndex: 9999,
                    backgroundColor: theme.colors.surface,
                    height: '10%',
                    width:'100%',
                    paddingVertical:'5%',
                    elevation: 5,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.goBack()}
                >
                    <View style={{flexDirection:'row',width:'100%'}}>
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
                <View style={{alignSelf:'center',width:'30%'}}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            // marginHorizontal: 12,
                            // paddingRight:'10%',
                            color:theme.colors.text,
                            alignSelf:'center',
                            // alignItems:'center'
                        }}
                    >
                        News
                    </Text>
                </View>
                <View style={{alignSelf:'center',width:'15%'}}></View>
            </View>
            <Divider/>
            <View style={{marginHorizontal:'5%',marginVertical:'5%',flex:1}}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // marginVertical: 5,
            width: width/2.3
          }}
        >
          <View style={{ flexDirection: "row", marginRight: 24,width:'100%'}}>
            <Caption style={{ fontSize: 13 }}>Published on {moment(item.created_at).format('MMM Do, yy')}</Caption>
            {/* <Caption style={{ fontSize: 14, }}>,{moment(item.created_at).format('h:mm a')}</Caption> */}
          </View>
          {/* <Caption numberOfLines={1} onPress={() => props.navigation.push("PROFILE_OTHER")} style={{ fontSize: 14 }}>By - {user?.fullname}</Caption> */}
        </View>
            </View>
            {item.image &&
      <Image
          source={{
            uri: item.image,
          }}
          style={{ height: width / 2.2, width: width /1.1, borderColor: 50,alignSelf:'center',marginBottom:'5%' }}
      />
      }
      <Divider/>
      <View style={{flexDirection:'row',marginVertical:'1%',width:'95%',justifyContent:'space-between',alignItems:'center'}} >
                                <View style={{marginHorizontal:'3%',alignSelf:'center',flexDirection:'row'}}>
                                <Image
                    source={{
                        uri: user?.pic,
                    }}
                    style={{
                        height: 60,
                        // alignSelf:'center',
                        width: 60,
                        borderRadius: 75,
                        marginTop: 8,
                        borderColor: theme.colors.disabled,
                        borderWidth: 1,
                    }}
                />
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:14,fontWeight:'700',color:theme.colors.text}}>
                                        {user.fullname}
                                    </Text>
                                    <Text style={{fontSize:12,color:theme.colors.backdrop}}>
                                    {user.title}
                                    </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                            backgroundColor: theme.colors.surface,
                            width:'20%',
                            marginVertical:5,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            borderWidth:1,
                            borderColor: theme.colors.primary,
                            alignSelf:'center'
                        }}
                        // onPress={() => props.navigation.push("PROFILE_UPDATE")}
                    >
                        <Text
                            style={{
                                color: theme.colors.primary,
                                alignSelf:'center',
                                fontSize: 12,
                            }}
                        >
                            Follow
                        </Text>
                    </TouchableOpacity>
                                </View>
      <Divider/>
      {/* <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", padding: 14 }}
      >
        <Ionicons
          color={theme.colors.text}
          name="md-arrow-back-outline"
          size={26}
        />
      </TouchableOpacity> */}
      <View style={{ margin: 12 ,marginTop:'5%', marginBottom:item.image?0:50}}>
        
        <Caption style={{ fontSize: 15, marginTop: 2, letterSpacing: 0.1, color: theme.colors.backdrop }}>
          {item.content}
        </Caption>
      </View>
    </ScrollView>
  );
};

export default NewsDetails;
