import {Menu} from "react-native-paper";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import SetRole from "../signup/SetRole";

const Picker = ({theme, items, text, onSelect,}) => {
    const [visible, setVisible] = useState()

    return (
        <View style={{paddingHorizontal:10}}>

        { items . map(item => (
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {onSelect(item)
                    setVisible(item.id)}}
                    style={[
                        styles.dropMenu,
                        {
                            backgroundColor: theme.colors.surface,
                        },
                    ]}
                >
                    <Text
                        style={{
                            marginRight: 8,
                            fontWeight: "bold",
                            fontSize: 14,
                            color: visible !== item.id ? theme.colors.text : theme.colors.primary,
                        }}
                    >
                        {item.name}
                    </Text>
                    <Ionicons
                        name="checkmark-circle-outline"
                        style={{alignSelf:'center'}}
                        color= {visible !== item.id ? theme.colors.surface : theme.colors.primary}
                        size={22}
                    />
                </TouchableOpacity>
            ))}
            </View>
        // <Menu
        // visible={visible}
        // onDismiss={closeMenu}
        // anchor={<Button onPress={openMenu}>Show menu</Button>}>
        //     {items.map(item => (
        //         <Menu.Item
        //             onPress={() => {
        //                 onSelect(item);
        //                 setVisible(false);
        //             }}
        //             title={item.name}
        //         />
        //     ))}
        // </Menu>

    )
}

const styles = StyleSheet.create({
    dropMenu: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row",
        alignSelf: 'flex-start',
        marginVertical: 12,
        justifyContent: "space-between",
        width:'100%'
    }
});

export default Picker;