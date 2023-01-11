import {Image, TouchableOpacity} from "react-native";
import {Text, useTheme} from "react-native-paper";
import React, {memo} from "react";
import {navigate} from "../api/helper";

const PostCategoryIcon = ({item}) => {
    const theme = useTheme();

    const handleClick = (category) => {
        if(category.name.toLowerCase() === "news"){
            navigate("NEWS", {type:item})
        } else {
            navigate("POST_TYPE", {type:item})
        }
    }

    const icon_path = item.icon

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleClick(item)}
            key={item}
            style={{
                elevation: 1,
                height: 70,
                width: 70,
                alignItems: "center",
                marginLeft: 12,
                marginTop: 10,
                marginBottom: 30,
                backgroundColor: theme.colors.surface,
                borderRadius: 75,
            }}
        >
            <Image
                source={icon_path}
                style={{
                    height: 70,
                    width: 70,
                    borderRadius: 75,
                    borderColor: theme.colors.surface,
                    borderWidth: 1,
                }}
            />
            <Text numberOfLines={1} style={{fontWeight:'700', fontSize:11,marginTop: 5}}>
                {item.value}
            </Text>
        </TouchableOpacity>

    )
}

export default memo(PostCategoryIcon)