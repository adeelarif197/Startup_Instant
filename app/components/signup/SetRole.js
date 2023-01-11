import React, {useEffect, useState} from 'react';
import {Platform, View} from "react-native";
import {Text} from "react-native-paper";
import {Image, ScrollView, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {updateUser} from "../../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Picker from "../picker/Picker";
import extraEntities, {getRoles} from "../../store/slices/extraEntitiesSlice";

const SetRole = ({user, theme, onSave, progress}) => {
    const dispatch = useDispatch()

    console.log("USER", user)

    const {roles} = useSelector((state)=>state.extraEntities)
    console.log("ROELS",roles)
    const [role, setRole] = useState(user?.role??null);

    const handleSave = () => {
        const data = {
            role:role?.id,
        }

        onSave(data)
    }

    useEffect(()=>{
        dispatch(getRoles())
    }, [])

    return (
        <ScrollView
            contentContainerStyle={{ justifyContent: "center" }}
            showsVerticalScrollIndicator={false}
        >
            
            <View style={{marginVertical: 10,  justifyContent: "center" }}>
                <Text
                    style={{
                        paddingHorizontal: 10,
                        marginTop: 8,
                        marginBottom: 12,
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    What's your role?
                </Text>
            </View>

            <View
                    style={{
                        borderRadius: 8,
                        // height: '50%',
                        borderBottomWidth:1,
                        borderColor:'#C6C6C6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 10,
                        flexDirection:'row',
                        height: 55,
                        // justifyContent:'space-between'
                        // borderBottomWidth: 1,
                        
                    }}
                    
                >
                    
                    <Text style={{fontSize:12,alignSelf:'center',color:'#7C7C7C'}}>
                        Selected:   
                    </Text>
                    <Text style={{fontSize:15,fontWeight:'700',marginHorizontal:10, alignSelf:'center',color:'#1492E6'}}>
                    {role?.name??'Select Role'}
                    </Text>
                    
                    
                {/* <Ionicons name="md-at-outline" style={{alignSelf:'center',marginHorizontal:'2%'}} size={26} color='#1492E6'/> */}
                
                </View>

                






            <Picker theme={theme} text={role?.name??'Select Role'} onSelect={setRole} items={roles}/>

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

export default SetRole;


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
