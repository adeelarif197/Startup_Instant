import React, {useEffect, useState} from 'react';
import {Platform, View} from "react-native";
import {List, Text} from "react-native-paper";
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {updateUser} from "../../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Picker from "../picker/Picker";
import extraEntities, {getInterests, getRoles} from "../../store/slices/extraEntitiesSlice";
import _ from "lodash";

const SetInterests = ({user, theme, onSave, progress}) => {
    const dispatch = useDispatch()

    const {interests} = useSelector((state) => state.extraEntities)
    const [selectedInterests, setSelectedInterests] = useState(user?.interests ?? []);

    console.log(selectedInterests)

    const handleSave = () => {
        const data = {
            interests: JSON.stringify(_.map(selectedInterests, item => item.id)),
        }
        onSave(data)
    }

    useEffect(() => {
        dispatch(getInterests())
    }, [])

    return (
        <View style={{flex:1}}>
            {/* <Text style={styles.bodyTag}>
                Enter your information below & express yourself around the world.
            </Text> */}
            <View style={{marginVertical:10,alignItems: "center", justifyContent: "center"}}>
                <Text
                    style={{
                        textAlign: "left",
                        marginTop: 8,
                        marginBottom: 12,
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    Please select interests
                </Text>
            </View>

            <ScrollView
                style={{height: 400}}
            >
                {interests.map(interest => (
                    <List.Item
                    titleStyle={{fontSize: 14,fontWeight: "bold"
                    // ,color: selectedInterests === interest ? '#5C5C5C' : theme.colors.primary
                }}
                        right={() => _.includes(selectedInterests, interest) &&
                            <Ionicons name='checkmark-circle-outline' color={theme.colors.primary} size={24}/>}
                        title={interest.name}
                        onPress={() => _.includes(selectedInterests, interest) ? setSelectedInterests(selectedInterests.filter(item=>item!==interest)) :setSelectedInterests(_.union(selectedInterests, [interest]))}/>
                ))}

            </ScrollView>


            {/* {selectedInterests.length > 0 && <View
                style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    marginTop: 10,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handleSave}
                    style={[
                        styles.button,
                        {
                            backgroundColor: theme.colors.surface,
                            borderColor: theme.colors.disabled,
                            marginRight: 2,
                        },
                    ]}
                >
                    <Text
                        style={{
                            color: theme.colors.text,
                            fontSize: 18,
                        }}
                    >
                        Next
                    </Text>
                    <View
                        style={[
                            styles.icon,
                            {
                                backgroundColor: theme.colors.primary,
                                marginLeft: 12,
                            },
                        ]}
                    >
                        <Ionicons
                            color={theme.colors.surface}
                            name="md-chevron-forward"
                            size={22}
                        />
                    </View>
                </TouchableOpacity>
            </View>} */}

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    marginTop: 10,
                }}
            >
                <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "20%",
                backgroundColor: theme.colors.surface,
                paddingVertical: 15,
                borderRadius: 12,
                // borderColor: '#1492E6',
                // borderWidth: 1,
                // elevation:2,
                marginTop:'10%',
                // alignSelf:'flex-end'
            }}
            // onPress={handleSave}
        >
            <Text
                style={{
                    color: '#939393',
                    fontWeight: "bold",
                    fontSize: 12,
                    textAlign: "center",
                }}
            >
                Back
            </Text>
        </TouchableOpacity>
                <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "40%",
                backgroundColor: selectedInterests.length !== 0 ? '#1492E6' : '#B8B8B8',
                paddingVertical: 15,
                borderRadius: 12,
                // borderColor: '#1492E6',
                // borderWidth: 1,
                elevation:2,
                marginTop:'10%',
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
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    marginTop: 10,
                }}
            >
                
                <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "40%",
                // backgroundColor: '#1492E6',
                // paddingVertical: 15,
                // borderRadius: 12,
                // borderColor: '#1492E6',
                // borderWidth: 1,
                // elevation:2,
                marginBottom:'5%',
                // alignSelf:'flex-end'
            }}
            // onPress={handleSave}
        >
            <Text
                style={{
                    color: theme.colors.primary,
                    fontWeight: "bold",
                    fontSize: 11,
                    textAlign: "center",
                }}
            >
                Skip for now
            </Text>
        </TouchableOpacity>
            </View>
        </View>
    )
}

export default SetInterests;


export const styles = StyleSheet.create({
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
