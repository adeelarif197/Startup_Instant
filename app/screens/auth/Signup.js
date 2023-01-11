import React, {useState} from "react";
import {
    View,
    Image,
    StyleSheet,
} from "react-native";
import {ProgressBar, Text, useTheme} from "react-native-paper";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../store/slices/authSlice";
import BasicInfo from "../../components/signup/BasicInfo";
import SetRole from "../../components/signup/SetRole";
import SetInterests from "../../components/signup/SetInterests";
import SetLookingFor from "../../components/signup/SetLookingFor";

const Signup = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch()

    const {user} = useSelector(({auth}) => auth)

    const statusBarHeight = getStatusBarHeight();

    const [progress, setProgress] = React.useState(null);

    const handleSave = (data) => {
        setProgress(true)
        dispatch(updateUser(data))
            .unwrap()
            .then(res => setProgress(false))
            .catch(err => setProgress(false))
    }


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
            <ProgressBar indeterminate visible={progress} style={{margin: -12, marginBottom: 10}}/>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    style={{height: 50, width: 50, marginRight: 12}}
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
            {user.signup_step === 1 && (
                <BasicInfo user={user} theme={theme} onSave={handleSave}/>
            )}
            {user.signup_step === 2 && (
                <SetRole user={user} theme={theme} onSave={handleSave}/>
            )}
            {user.signup_step === 3 && (
                <SetInterests user={user} theme={theme} onSave={handleSave}/>
            )}
            {user.signup_step === 4 && (
                <SetLookingFor user={user} theme={theme} onSave={handleSave}/>
            )}

        </View>
    );
};

export default Signup;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    bodyTag: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 12,
        fontSize: 18,
        marginHorizontal: 12,
    },
    profilePic: {
        height: 100,
        width: 100,
        borderRadius: 75,
        marginTop: 12,
        marginBottom: 6,
    },
    textInput: {
        borderRadius: 5,
        height: 46,
        marginTop: 8,
        fontSize: 16,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
    },
    button: {
        alignItems: "center",
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: "row",
    },
    icon: {
        paddingVertical: 2,
        paddingHorizontal: 3,
        borderRadius: 45,
        alignItems: "center",
        justifyContent: "center",
    },
});


/*
*
* SIGNUP PROCESS
*
* username    ✅
* full name   ✅
* title*      ✅
* email       ✅
* company     ✅
* location    ✅
*
* role
*
* interests
*
* looking_for
*
*
*
*
* */
