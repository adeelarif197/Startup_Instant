import React, {useEffect, useState} from 'react';
import {Platform, View} from "react-native";
import {Text} from "react-native-paper";
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {updateUser} from "../../store/slices/authSlice";
import {useDispatch} from "react-redux";

const BasicInfo = ({user, theme, onSave, progress}) => {
    const dispatch = useDispatch()
    // const theme = useTheme();
    const [fullname, setFullname] = useState(user?.fullname??'');
    const [username, setUsername] = useState(user?.username??'');
    const [title, setTitle] = useState(user?.title??'');
    const [email, setEmail] = useState(user?.email??'');
    const [company, setCompany] = useState(user?.extra?.company??'');
    const [location, setLocation] = useState(user?.extra?.location??'');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        dispatch(updateUser({ pic: result?.uri }));
    };

    const handleSave = () => {
        const data = {
            fullname,
            username,
            title,
            email,
            extra:JSON.stringify({
                company, location
            })
        }

        onSave(data)
    }

    return (
        <ScrollView
            contentContainerStyle={{ justifyContent: "center" }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.bodyTag}>
                Enter your information below & express yourself around the world.
            </Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                    style={{
                        textAlign: "left",
                        marginTop: 8,
                        marginBottom: 12,
                        fontSize: 22,
                        fontWeight: "bold",
                    }}
                >
                    Sign Up
                </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={{
                        uri: user?.pic,
                    }}
                    style={styles.profilePic}
                />
                {/* <TouchableOpacity
                    // onPress={pickImage}
                    style={{
                        // position: "absolute",
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                >
                    <Ionicons
                    // style={{alignSelf:'center'}}
                        color='red'
                        name="md-camera-outline"
                        size={32}
                    />
                    </TouchableOpacity> */}
                

                <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "40%",
                backgroundColor: theme.colors.surface,
                paddingVertical: 15,
                borderRadius: 12,
                borderColor: '#1492E6',
                borderWidth: 1,
                elevation:2,
                marginVertical:'10%'
            }}
            onPress={pickImage}
        >
            <Text
                style={{
                    color: '#1492E6',
                    fontWeight: "bold",
                    fontSize: 12,
                    textAlign: "center",
                }}
            >
                Upload
            </Text>
        </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginVertical: 8,color:theme.colors.backdrop,left:10 }}>
          Username
        </Text>
            <View
                    style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:'#C6C6C6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        // borderBottomWidth: 1,
                        
                    }}
                    
                >
                    
                <Ionicons name="md-at-outline" style={{alignSelf:'center',marginHorizontal:'2%'}} size={26} color='#1492E6'/>
                <TextInput placeholder="Username"
                    onChangeText={setFullname}
                    value={fullname}
                    placeholderStyle={{  }}
                    // onChangeText={setFullname}
                    // value={fullname} 
                    />
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 12, marginVertical: 8,color:theme.colors.backdrop,left:10 }}>
          Name
        </Text>
            <View
                    style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:'#C6C6C6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        // borderBottomWidth: 1,
                        
                    }}
                    
                >
                    
                
                <TextInput placeholder="Enter full name"
                    // onChangeText={setFullname}
                    // value={fullname}
                    placeholderStyle={{  }}
                    // onChangeText={setFullname}
                    // value={fullname} 
                    />
                </View>

            {/* <View style={{ marginBottom: 8 }}>
                <TextInput
                    style={[
                        styles.textInput,
                        {
                            backgroundColor: theme.colors.surface,
                            borderColor: theme.colors.disabled,
                        },
                    ]}
                    placeholder="Full Name"
                    onChangeText={setFullname}
                    value={fullname}
                />
            </View> */}
            <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:'#C6C6C6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:20,
                        
                    }}>
                <TextInput
                    
                    placeholder="User name"
                    onChangeText={setUsername}
                    value={username}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginVertical: 8,color:theme.colors.backdrop,left:10 }}>
            Title
        </Text>
            <View style={{ borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:'#C6C6C6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        // marginVertical:20, 
                    }}>
                <TextInput
                    
                    placeholder="Title : eg. CEO"
                    onChangeText={setTitle}
                    value={title}
                />
            </View>
            <View style={{ borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:'#C6C6C6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:20,
                     }}>
                <TextInput
                    
                    placeholder="Email id"
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginVertical: 8,color:theme.colors.backdrop,left:10 }}>
            Company
        </Text>
            <View style={{ borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:'#C6C6C6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        // marginVertical:20, 
                     }}>
                <TextInput
                    
                    placeholder="Company (optional)"
                    onChangeText={setCompany}
                    value={company}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginVertical: 8,color:theme.colors.backdrop,left:10 }}>
            Location
        </Text>
            <View style={{ borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:'#C6C6C6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        // marginVertical:20, 
                     }}>
                <TextInput
                    
                    placeholder="Enter your Location (Optional)"
                    onChangeText={setLocation}
                    value={location}
                />
            </View>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                    marginTop: 10,
                }}
            >
                {/* <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        props.navigation.navigate('LOGIN');
                    }}
                    style={[
                        styles.button,
                        {
                            backgroundColor: theme.colors.surface,
                            borderColor: theme.colors.disabled,
                            marginLeft: 2
                        },
                    ]}
                >
                    <View style={[{backgroundColor: theme.colors.primary}, styles.icon]}>
                        <Ionicons
                            color={theme.colors.surface}
                            name="md-chevron-back"
                            size={22}
                        />
                    </View>
                    <Text
                        style={{
                            color: theme.colors.text,
                            fontSize: 18,
                            marginLeft: 12,
                        }}
                    >
                        Back
                    </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "40%",
                backgroundColor: '#1492E6',
                paddingVertical: 15,
                borderRadius: 12,
                borderColor: '#1492E6',
                borderWidth: 1,
                elevation:2,
                marginVertical:'10%',
                // alignSelf:'flex-end'
            }}
            onPress={handleSave}
        >
            <Text
                style={{
                    color: '#FFFFFF',
                    fontWeight: "bold",
                    fontSize: 12,
                    textAlign: "center",
                }}
            >
                Next
            </Text>
        </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default BasicInfo;


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
    fontSize:15,
        marginHorizontal: 12,
    },
    profilePic: {
        height: 100,
        width: 100,
        borderRadius: 75,
        marginTop: 12,
        marginBottom: 6,
        backgroundColor:"#ddd"
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
