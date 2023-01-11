import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import {useTheme} from "react-native-paper";
import FollowUnfollowButton from "./FollowUnfollowButton";
import {navigate} from "../../api/helper";

const CompanyListItem = ({company}) => {
    const theme = useTheme();
    const {width} = Dimensions.get("window");
    return (
        <TouchableOpacity
            onPress={()=>navigate('COMPANY', {company})}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: width,
                paddingHorizontal: 12,
                backgroundColor: theme.colors.surface,
                marginVertical: 1,
                paddingVertical: 8
            }}
        >
            <View style={{flexDirection: "row"}}>
                <Image
                    source={{
                        uri: company.icon,
                    }}
                    style={styles.profilePic}
                />

                <View style={{marginHorizontal: 12}}>
                    <Text numberOfLines={1}
                          style={{fontSize: 16, fontWeight: "bold", width: width / 2.2}}>{company.name}</Text>
                    <Text numberOfLines={1} style={{fontSize: 13, width: width / 2.2}}>{company.about}</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                <FollowUnfollowButton company={company}/>
            </View>
        </TouchableOpacity>
    );
};

export default CompanyListItem;

const styles = StyleSheet.create({
    profilePic: {
        height: 55,
        width: 55,
        borderRadius: 75,
    },
    editButton: {
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        paddingHorizontal: 26,
        borderRadius: 5,
    },
});
