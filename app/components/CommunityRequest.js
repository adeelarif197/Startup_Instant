import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import {useTheme, Caption} from "react-native-paper";
import {useDispatch} from "react-redux";
import {requestAccept, requestReject} from "../store/slices/communityJoinRequestsSlice";
import { Divider } from "react-native-paper";
// import { Item } from "react-native-paper/lib/typescript/components/List/List";
const CommunityRequest = ({request}) => {
    const dispatch = useDispatch()
    const theme = useTheme();
    const {width} = Dimensions.get("window");

    const handleAcceptJoinRequest = () => {
        dispatch(requestAccept({userId: request.user?.id, communityId: request.community, id:request.id}))
    }
    const handleRejectJoinRequest = (userId) => {
        dispatch(requestReject({userId: request.user?.id, communityId: request.community, id:request.id}))

    }

    return (
        <View
            style={{
                width: '90%',
                paddingHorizontal: 12,
                backgroundColor: theme.colors.surface,
                marginVertical: '2%',
                
                elevation:5,
                alignSelf:'center',
                marginHorizontal:'2%',
                borderRadius:10,
                flexDirection:'row'
            }}
        >
            <View style={{flexDirection: "row", justifyContent: "space-between",paddingVertical: 12}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image
                        source={{
                            // uri: request?.user?.pic,
                            uri: "https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg",
                        }}
                        style={styles.profilePic}
                    />
                    <View style={{marginHorizontal: 12}}>
                        <Text
                            numberOfLines={1}
                            style={{fontSize: 16, fontWeight: "bold", width: width / 2.3}}
                        >
                            Babu bhaiya
                            {/* Name Of the User */}
                        </Text>
                        <Text numberOfLines={1} style={{color:theme.colors.backdrop,fontSize: 14, width: width / 2.3}}>
                            Khopdi tod
                            {/* Designation */}
                        </Text>
                        <Text numberOfLines={1} style={{fontSize: 16,fontWeight: "bold", width: width / 2.3}}>
                            4.4k <Text numberOfLines={1} style={{fontSize: 14, width: width / 2.3}}>
                            Followers

                            {/* Number Of Followers */}
                        </Text>
                        </Text>
                    </View>
                </View>
                
                
            </View>
            <View style={{flex:1,justifyContent:'space-evenly',left:5, borderLeftWidth:0.5,borderLeftColor:'#D4D4D4'}}> 
            <View style={{ justifyContent:'space-evenly',alignItems:'center',paddingHorizontal:5}}>
                
                <Text
                    onPress={handleAcceptJoinRequest}
                    style={{
                        color: theme.colors.primary,
                        fontWeight: "bold",
                        fontSize: 12,
                        // marginRight: 32,
                        // alignSelf:'center'
                    }}
                >
                    Accept
                </Text>
                

                
            </View>
            <Divider/>
            <View style={{ justifyContent:'space-evenly',alignItems:'center',paddingHorizontal:5}}>
                <Text
                    onPress={handleRejectJoinRequest}
                    style={{
                        color: 'red',
                        fontWeight: "bold",
                        fontSize: 12,
                    }}
                >
                    Decline
                </Text>
            </View>
            </View>
        </View>
    );
};

export default CommunityRequest;

const styles = StyleSheet.create({
    profilePic: {
        height: 70,
        width: 70,
        borderRadius: 75,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        paddingHorizontal: 26,
        borderRadius: 5,
        marginTop: 12,
    },
});
