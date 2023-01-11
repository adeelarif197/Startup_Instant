import React from "react";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme, Appbar, Divider, Caption } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import PostItem from "../../components/PostItem";

const OtherCompany = (props) => {
  const theme = useTheme();
  const { height, width } = Dimensions.get("window");
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.surface, elevation: 2 }}
      >
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="@Lyte_Infotech" />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: "https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg",
          }}
          style={{
            height: width / 3,
            width: width,
            borderColor: 50,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width,
            paddingHorizontal: 12,
            backgroundColor: theme.colors.surface,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: "https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg",
              }}
              style={styles.profilePic}
            />

            <View style={{ marginHorizontal: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Lyte Infotech
              </Text>
              <Text style={{ fontSize: 15 }}>App development</Text>
            </View>
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.followButton,
              {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={() => alert('Kr follow.')}
          >
            <Text
              style={{
                color: theme.colors.surface,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Follow
            </Text>
          </TouchableOpacity> */}
                    <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.followingButton,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.disabled,
              },
            ]}
            onPress={() => alert("Ka re babua, ka haal ba?")}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
              }}
            >
              Following
            </Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={{ marginHorizontal: 12, marginTop: 12, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>About us</Text>
          <Caption style={{ fontSize: 15, letterSpacing: 0.1 }}>
            Lyte Infotech is the best company for advanced application and
            website development. We work for future vision tech products
            according to their requirements and beyond.
          </Caption>
          <View
            style={{
              flexDirection: "row",
              marginTop: 7,
              marginLeft: -3,
              alignItems: "center",
            }}
          >
            <Ionicons name="md-location-outline" size={22} />
            <Text style={{ fontSize: 14, letterSpacing: 0.1, marginLeft: 2 }}>
              Koramangala, Bengaluru, Karnatka 560047, IN
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
          >
            <Ionicons name="md-calendar-outline" size={18} />
            <Text style={{ fontSize: 14, letterSpacing: 0.1, marginLeft: 5 }}>
              Founded : 13 Sep 2021
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
          >
            <Ionicons name="md-call-outline" size={18} />
            <Text style={{ fontSize: 14, marginLeft: 5, letterSpacing: 0.1 }}>
              +91-8115854528
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
          >
            <Ionicons name="md-mail-outline" size={18} />
            <Text style={{ fontSize: 14, marginLeft: 5, letterSpacing: 0.1 }}>
              contact@lyteinfotech.com
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginTop: 7, alignItems: "center" }}
          >
            <Ionicons name="md-earth-outline" size={20} />
            <Text style={{ fontSize: 14, marginLeft: 5, letterSpacing: 0.1 }}>
              www.lyteinfotech.com
            </Text>
          </View>
           <View
            style={{
              marginTop: 10,
              marginLeft: 8,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {[0, 1, 2, 3, 4].map((item) => (
              <View key={item}>
                <Image
                  source={{
                    uri: "https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg",
                  }}
                  style={styles.memberImage}
                />
              </View>
            ))}
            <View
              style={[
                styles.members,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: theme.colors.surface,
                }}
              >
                100k+
              </Text>
            </View>
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Followers</Text>
          </View>
        </View>
        <Divider />
        {[0, 1, 2, 3, 4].map((item) => (
          <View key={item}>
            <PostItem />
            <Divider />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OtherCompany;

const styles = StyleSheet.create({
  memberImage: {
    height: 34,
    width: 34,
    borderRadius: 75,
    marginLeft: -8,
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 75,
    marginTop: -30,
    marginBottom: 12,
  },
  followButton: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  followingButton: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 5,
    borderWidth: 1,
  },
  members: {
    borderRadius: 75,
    marginLeft: -8,
    height: 34,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  newPost: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 72,
    marginLeft: 5,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
});
