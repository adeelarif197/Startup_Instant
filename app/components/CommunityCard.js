import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Text, useTheme, Caption, Divider } from "react-native-paper";
import { navigate } from "../api/helper";
import { useDispatch } from "react-redux";
import {
  requestAdd,
  requestDelete,
} from "../store/slices/communityJoinRequestsSlice";
import CommunityJoinRequest from "./community/CommunityJoinRequest";

const CommunityCard = ({ community }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { height, width } = Dimensions.get("window");
  if (!community) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        alignSelf:'center',
        elevation: 0,
        height: width / 2,
        width: width / 1.1,
        // alignItems: "center",
        marginTop: 10,
        // paddingLeft:''
        marginHorizontal: 10,
        backgroundColor: theme.colors.surface,
        borderRadius: 5,
      }}
      onPress={() => navigate("COMMUNITY", { community })}
    >
      <ImageBackground
        source={{
          uri: community.cover,
        }}
        style={{
          height: 90,
          width: width / 1.1,
          borderColor: 50,
        }}
        imageStyle={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />
      <View style={{flexDirection:'row'}}>
      <Image
        source={{
          uri: community.icon,
        }}
        style={{
          height: 80,
          width: 80,
          borderRadius: 75,
          marginTop: -40,
          left:10,
          borderColor: theme.colors.surface,
          borderWidth: 3
        }}
      />
      <View style={{ width: "84%" ,left:25}}>
        {community.member === null && (
          <CommunityJoinRequest community={community} />
        )}
      </View>
      </View>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 16,
          marginHorizontal: 10,
          // textAlign:'justify'
        }}
      >
        {community.name} . <Text
        numberOfLines={1}
        style={{
          fontSize: 11,
          fontWeight: "bold",
          marginTop: 4,
          // marginHorizontal: 12,
          color: theme.colors.disabled,
        }}
      >
        345k+ Members
      </Text>
      </Text>
      <Text
        numberOfLines={1}
        style={{ fontSize: 12, marginTop: 1, marginHorizontal: 10 }}
      >
        {community.about}
      </Text>
      
      
    </TouchableOpacity>
  );
};
export default CommunityCard;
