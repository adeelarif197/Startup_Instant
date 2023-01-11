import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import FollowUnfollowButton from "./FollowUnfollowButton";

const UserListItem = ({user}) => {
    if(!user) return null;
  const theme = useTheme();
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        width: width,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.surface,
        marginVertical: 1,
        paddingVertical: 8,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Image
          source={{
            uri: user.pic,
          }}
          style={styles.profilePic}
        />

        <View style={{ marginHorizontal: 12 }}>
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", width: width/2.3 }}>{user.fullname}</Text>
          <Text numberOfLines={1} style={{ fontSize: 14, width: width/2.3 }}>{user.bio}</Text>
        </View>
      </View>
        <View style={{flex:1}}>
            <FollowUnfollowButton user={user}/>
        </View>
    </View>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  profilePic: {
    height: 55,
    width: 55,
    borderRadius: 75,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    paddingHorizontal: 26,
    borderRadius: 5,
  },
});
