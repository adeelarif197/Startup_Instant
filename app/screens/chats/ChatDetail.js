import React from "react";
import {
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Caption, useTheme } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";

const ChatDetail = (props) => {
  const theme = useTheme();
  const { width, height } = Dimensions.get("window");
  const statusBarHeight = getStatusBarHeight();
  const [message, onChangeMassage] = React.useState(null);

  return (
    <View
      style={{
        flex: 1,
        marginTop: statusBarHeight,
        height: height,
        justifyContent: "space-between",
      }}
    >
      <View>
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <Ionicons
            onPress={() => props.navigation.goBack()}
            name="md-arrow-back-sharp"
            size={24}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => props.navigation.push("PROFILE_OTHER")}
          >
            <Image
              source={{
                uri: "https://media-exp1.licdn.com/dms/image/C5603AQGKmhwJ-dZuXA/profile-displayphoto-shrink_200_200/0/1610045585641?e=1636588800&v=beta&t=ZKKpzL7u7yR5iFfrcuSIrjNYBf4tR2CEX3rTifCESpk",
              }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Babu Bhaiya
            </Text>
            <Caption
              style={{
                fontSize: 15,
                marginTop: 2,
              }}
            >
              Online
            </Caption>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: "flex-end", height: "100%" }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.push("PROFILE_OTHER")}
          style={{
            marginVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            width: width / 1.5,
          }}
        >
          <Image
            source={{
              uri: "https://media-exp1.licdn.com/dms/image/C5603AQGKmhwJ-dZuXA/profile-displayphoto-shrink_200_200/0/1610045585641?e=1636588800&v=beta&t=ZKKpzL7u7yR5iFfrcuSIrjNYBf4tR2CEX3rTifCESpk",
            }}
            style={styles.profilePic}
          />
          <View
            style={{
              backgroundColor: theme.colors.surface,
              marginLeft: 12,
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 15 }}>Hello, Raju</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "flex-end",
            marginRight: 12,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 12,
              marginBottom: 12,
              paddingVertical: 5,
              borderRadius: 5,
              marginLeft: 104,
            }}
          >
            <Text style={{ fontSize: 15, color: theme.colors.surface }}>
              Are Babu bhaiya
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: 56,
          width: width,
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: theme.colors.surface,
        }}
      >
        <TextInput
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 5,
            height: 42,
            flex: 1,
            marginHorizontal: 12,
            paddingLeft: 12,
            paddingRight: 44,
          }}
          placeholder="Type a message..."
          onChangeText={onChangeMassage}
          value={message}
        />
        <View
          style={{
            position: "absolute",
            paddingRight: 18,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              paddingVertical: 5,
              paddingHorizontal: 7,
              borderRadius: 45,
            }}
          >
            <Ionicons color={theme.colors.surface} name="md-send" size={22} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 5,
  },
  profilePic: {
    height: 46,
    width: 46,
    borderRadius: 75,
    marginLeft: 12,
  },
});
