import React, {useEffect, useState} from 'react';
import {Platform, View} from "react-native";
import {List, Text} from "react-native-paper";
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {updateUser} from "../../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Picker from "../picker/Picker";
import extraEntities, {getInterests, getLookingFor, getRoles} from "../../store/slices/extraEntitiesSlice";
import _ from "lodash";

const SetLookingFor = ({user, theme, onSave, progress}) => {
    const dispatch = useDispatch()

    const {lookingFor} = useSelector((state) => state.extraEntities)
    const [selectedLookingFor, setSelectedLookingFor] = useState(user?.looking_for ?? []);


    const handleSave = () => {
        const data = {
            looking_for: JSON.stringify(_.map(selectedLookingFor, item => item.id)),
        }
        onSave(data)
    }

    useEffect(() => {
        dispatch(getLookingFor())
    }, [])

    return (
        <View style={{flex:1}}>
            
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
                    What are you looking for?
                </Text>
            </View>

            <ScrollView
                style={{height: 400}}
            >
                {lookingFor.map(lf => (
                    <List.Item
                    titleStyle={{fontSize: 14,fontWeight: "bold"
                    // ,color: selectedInterests === interest ? '#5C5C5C' : theme.colors.primary
                }}
                        right={() => _.includes(selectedLookingFor, lf) &&
                            <Ionicons name='checkmark-circle-outline' color={theme.colors.primary} size={24}/>}
                        title={lf.name}
                        onPress={() => _.includes(selectedLookingFor, lf) ? setSelectedLookingFor(selectedLookingFor.filter(item=>item!==lf)) :setSelectedLookingFor(_.union(selectedLookingFor, [lf]))}/>
                ))}

            </ScrollView>


            {/* {selectedLookingFor.length > 0 && <View
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
                backgroundColor: selectedLookingFor.length !== 0 ? '#1492E6' : '#B8B8B8',
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

export default SetLookingFor;


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
