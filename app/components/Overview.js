import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { Caption, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const Overview = (props) => {
  const user= props.user;
  const theme = useTheme();
  const { width } = Dimensions.get("window");
    return (
        <ScrollView
        showsVerticalScrollIndicator = {false}
        style={{ flex: 1, width: width, paddingHorizontal: 12, }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 8,color:theme.colors.backdrop,left:10 }}>
          Website
        </Text>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    // zIndex: 9999,
                    backgroundColor: '#F8F8F8',
                    height: 54,
                    width:'90%',
                    marginVertical:16,
                    borderRadius:10
                    // elevation: 2,
                }}>
          <Text style={{color:theme.colors.primary,fontSize:14,fontWeight:'700'}}>
            {user.extra.website}
            {/* {props.user?.website} */}
          </Text>
          <Text style={{color:theme.colors.primary,fontSize:14}}>
            visit
          </Text>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 8,color:theme.colors.backdrop,left:10 }}>
          Bio
        </Text>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    // zIndex: 9999,
                    backgroundColor: '#F8F8F8',
                    // height: 54,
                    // marg
                    width:'90%',
                    marginVertical:16,
                    borderRadius:10
                    // elevation: 2,
                }}>
          <Text style={{color:theme.colors.text,fontSize:14,fontWeight:'700'}}>
          {props.user?.bio}
          
          {/* Are you looking to grow your business online? We believe that's where Nuwork come in. */}
          </Text>
          
          
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 6,color:theme.colors.backdrop,left:10 }}>
          Roles
        </Text>
        <View style={{flexDirection:'row'}}>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Entrepreneur
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Student
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Designer
          </Text>
          
          
        </View>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 6,color:theme.colors.backdrop,left:10 }}>
          Intrerests
        </Text>
        <View style={{flexDirection:'row'}}>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Writing
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Coding
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Design
          </Text>
          
          
        </View>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 6,color:theme.colors.backdrop,left:10 }}>
          Looking For
        </Text>
        <View style={{flexDirection:'row'}}>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Writing
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Coding
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:20,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Design
          </Text>
          
          
        </View>
        </View>
        
        {/* <View
          style={{
            flexDirection: "row",
            marginTop: 7,
            marginLeft: -3,
            alignItems: "center",
          }}
        >
          <Ionicons name="md-location-outline" size={22} />
          <Text style={{ fontSize: 14, letterSpacing: 0.1, marginLeft: 2 }}>
              {props.user?.extra?.address}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
        >
          <Ionicons name="md-calendar-outline" size={18} />
          <Text style={{ fontSize: 14, letterSpacing: 0.1, marginLeft: 5 }}>
              {props.user?.date_joined}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
        >
          <Ionicons name="md-call-outline" size={18} />
          <Text style={{ fontSize: 14, marginLeft: 5, letterSpacing: 0.1 }}>
            +91-{props.user?.extra?.company_number}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
        >
          <Ionicons name="md-mail-outline" size={18} />
          <Text style={{ fontSize: 14, marginLeft: 5, letterSpacing: 0.1 }}>
              {props.user?.email}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
        >
          <Ionicons name="md-earth-outline" size={20} />
          <Text style={{ fontSize: 14, marginLeft: 5, letterSpacing: 0.1 }}>
              {props.user?.extra?.website}
          </Text>
        </View>
        <Text style={{ fontWeight: "bold", marginTop: 18, fontSize: 16 }}>
          Interests
        </Text>
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 5,
            paddingVertical: 7,
            paddingLeft: 10,
            justifyContent: "center",
            marginTop: 7,
            paddingRight: 44,
          }}
        >
          <Text style={{ fontSize: 16 }}>{props.user?.extra?.interests}</Text>
        </View>
        <Text style={{ fontWeight: "bold", marginTop: 18, fontSize: 16 }}>
          Education
        </Text>
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 5,
            paddingVertical: 7,
            paddingLeft: 10,
            justifyContent: "center",
            marginTop: 7,
            paddingRight: 44,
          }}
        >
          <Text style={{ fontSize: 16 }}>{props.user?.extra?.education}</Text>
        </View>
        <Text style={{ fontWeight: "bold", marginTop: 18, fontSize: 16 }}>
          Company
        </Text>
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 5,
            paddingVertical: 7,
            paddingLeft: 10,
            justifyContent: "center",
            marginVertical: 7,
            paddingRight: 44,
          }}
        >
          <Text
            onPress={() => props.navigation.push("COMPANY")}
            style={{ fontSize: 16 }}
          >
              {props.user?.extra?.company}
          </Text>
        </View>
        <Text style={{ fontWeight: "bold", marginTop: 18, fontSize: 16 }}>
          Work
        </Text>
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 5,
            paddingVertical: 7,
            paddingLeft: 10,
            justifyContent: "center",
            marginVertical: 7,
            paddingRight: 44,
          }}
        >
          <Text style={{ fontSize: 16 }}>{props.user?.extra?.work}</Text>
        </View> */}
      </ScrollView>
    )
}

export default Overview;