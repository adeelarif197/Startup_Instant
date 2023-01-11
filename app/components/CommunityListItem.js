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

const CommunityListItem = ({community}) => {
  const theme = useTheme();
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.surface,
        marginVertical: 1,
        paddingVertical: 8
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: community.icon,
          }}
          style={styles.profilePic}
        />

        <View style={{ marginHorizontal: 12 }}>
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", width: width/2.2 }}>{community.name}</Text>
          <Text numberOfLines={1} style={{ fontSize: 13, width: width/2.2 }}>{community.about}</Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "bold",
              color: theme.colors.disabled,
            }}
          >
            345k Members
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.editButton,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}
        onPress={() => alert("Joined!")}
      >
        <Text
          style={{
            color: theme.colors.surface,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Join
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommunityListItem;

const styles = StyleSheet.create({
  profilePic: {
    height: 55,
    width: 55,
    borderRadius: 75,
  },
  editButton: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    paddingHorizontal: 26,
    borderRadius: 5,
  },
});
