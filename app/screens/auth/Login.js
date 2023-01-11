import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Keyboard,
} from "react-native";
import { Text, useTheme, Divider, ProgressBar } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp } from "../../store/slices/authSlice";
import { navigate } from "../../api/helper";

const Login = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");
  const statusBarHeight = getStatusBarHeight();
  const [modalVisible, setModalVisible] = useState(false);
  const [number, onChangeNumber] = React.useState(null);
  const [otp, onChangeOtp] = React.useState(null);

  const [loading, setLoading] = React.useState(false);

  const handleSendOTP = () => {
    if (number && number.length === 10) {
      setLoading(true);
      dispatch(sendOtp({ mobile: number }))
        .unwrap()
        .then((res) => {
          setLoading(false);
          setModalVisible(true);
          Keyboard.dismiss;
        })
        .catch((err) => setLoading(false));
    }
  };
  const handleVerifyOTP = () => {
    if (otp && otp.length === 6) {
      setLoading(true);
      dispatch(verifyOtp({ mobile: number, otp }))
        .unwrap()
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          marginTop: statusBarHeight,
        },
      ]}
    >
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            height: height,
            justifyContent: "flex-end",
            backgroundColor: "#00000080",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{ height: height }}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          >
            <TouchableOpacity
              style={styles.otpCross}
              activeOpacity={1}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons color={theme.colors.text} name="md-close" size={24} />
            </TouchableOpacity>

            <Divider />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 16,
              }}
            >
              <View style={{ flexDirection: "row", marginBottom: 16 }}>
                <Text style={{ fontSize: 16,fontWeight:'700' }}>Enter your OTP</Text>
                <Text style={{ fontSize: 16, color: theme.colors.disabled }}>
                  {" "}
                  • 0:30s
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: theme.colors.surface,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <TextInput
                  style={{
                    borderColor: theme.colors.disabled,
                    borderRadius: 5,
                    flex: 1,
                    textAlign: "center",
                    width: width / 1.5,
                    paddingVertical:'5%',
                    fontSize: 16,
                    borderWidth: 0.5,
                    color:'black'
                    // alignItems:'center'
                  }}
                  keyboardType="numeric"
                  placeholder="Enter  OTP"
                  maxLength={6}
                  onChangeText={onChangeOtp}
                  value={otp}
                />

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => alert("Resend!")}
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    marginTop: 12,
                    width: width / 1.55,
                  }}
                >
                  <Text style={{alignSelf:'center',color: theme.colors.primary,fontSize:13,fontWeight:'700' }}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleVerifyOTP}
                style={[
                  styles.confirmView,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                    borderWidth:0,
                    elevation:2
                  },
                ]}
              >
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: 18,
                  }}
                >
                  Confirm
                </Text>
                <View
                  style={[
                    styles.confirmIcon,
                    {
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                >
                  <Ionicons
                    color={theme.colors.surface}
                    // style={{elevation:2}}
                    name="md-chevron-forward"
                    size={22}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ height: 50, width: 50, marginRight: 12 }}
            source={require("../../../assets/logo.png")}
          />
          <Image
            style={{
              resizeMode: "stretch",
              height: 40,
              width: 220,
            }}
            source={require("../../../assets/name.png")}
          />
        </View>
        <Text style={styles.bodyTag}>
          Connect with alike minded people & build your own commuinity.
        </Text>
        <Image
          style={{ height: 300, width: 300 }}
          source={require("../../../assets/login.png")}
        />
        <View style={{ marginLeft: 3 }}>
          <Text
            style={{
              marginVertical: 14,
              marginLeft: 12,
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Sign In
          </Text>
          <View
            style={[
              styles.inputField,
              {
                width: width - 30,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <TextInput
              style={[
                styles.phoneInput,
                {
                  borderColor: theme.colors.disabled,
                },
              ]}
              keyboardType="numeric"
              placeholder="Enter phone number"
              maxLength={10}
              autoFocus
              onChangeText={onChangeNumber}
              value={number}
            />
            <View
              style={[
                styles.countryCode,
                {
                  width: width - 30,
                },
              ]}
            >
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 1,
                  fontSize: 16,
                }}
              >
                +91{" "}
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSendOTP}
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  borderRadius: 45,
                }}
              >
                <Ionicons
                  color={theme.colors.surface}
                  name="md-chevron-forward"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ProgressBar
            visible={loading}
            style={{ width: 200, alignSelf: "center" }}
            indeterminate
          />
          <Text style={styles.policies}>
            By signing in, you agree to our{" "}
            <Text onPress={() => alert("TOS!")} style={{ fontWeight: "bold" }}>
              Terms of services
            </Text>
            ,{" "}
            <Text
              onPress={() => alert("Copyright!")}
              style={{ fontWeight: "bold" }}
            >
              Copyright policy
            </Text>{" "}
            and{" "}
            <Text
              onPress={() => alert("Deva! deva! deva!")}
              style={{ fontWeight: "bold" }}
            >
              Privacy policy
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  bodyTag: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 12,
    fontWeight:'bold',
    fontSize:16,
    marginHorizontal: 12,
  },
  inputField: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  phoneInput: {
    borderRadius: 5,
    height: 44,
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    paddingLeft: 40,
    paddingRight: 52,
    borderWidth: 1
  },
  countryCode: {
    position: "absolute",
    paddingRight: 18,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  policies: {
    textAlign: "center",
    lineHeight: 20,
    marginHorizontal: 24,
    marginTop: 12,
  },
  otpCross: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  confirmView: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginBottom: 5,
    paddingHorizontal: 24,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
  },
  confirmIcon: {
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: 45,
    marginLeft: 18,
  },
});
