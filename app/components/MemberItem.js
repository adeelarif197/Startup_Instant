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
import FollowUnfollowButton from "./users/FollowUnfollowButton";
import {useDispatch, useSelector} from "react-redux";
import {makeAdmin, removeAdmin, removeMember} from "../store/slices/communityMembersSlice";

const MemberItem = ({member, is_admin}) => {
    const theme = useTheme();
    const {width} = Dimensions.get("window");
    const dispatch = useDispatch()

    const {user} = useSelector(({auth}) => auth)


    const handleRemoveMember = () => {
        dispatch(removeMember({communityId: member.community, memberId: member.id, userId: member.user.id}))
    }

    const handleMakeAdmin = () => {
        dispatch(makeAdmin({communityId: member.community, memberId: member.id, userId: member.user.id}))
    }

    const handleRemoveFromAdmin = () => {
        dispatch(removeAdmin({communityId: member.community, memberId: member.id, userId: member.user.id}))
    }

    return (
        <View
            style={{
                width: width,
                paddingHorizontal: 12,
                backgroundColor: theme.colors.surface,
                marginVertical: 1,
                paddingVertical: 12,
            }}
        >
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image
                        source={{
                            uri: member.user.pic,
                        }}
                        style={styles.profilePic}
                    />

                    <View style={{marginHorizontal: 12}}>
                        <Text
                            numberOfLines={1}
                            style={{fontSize: 16, fontWeight: "bold", width: width / 2.3}}
                        >
                            {member.user.fullname}
                        </Text>
                        {member.is_admin === true &&
                        <Caption style={{letterSpacing: '0'}}>
                            Admin
                        </Caption>

                        }
                    </View>
                </View>
                {user.id !== member.user.id &&
                (is_admin ?
                    <View
                        style={{
                            flexDirection: "col",
                            marginTop: 6,
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            onPress={member.is_admin ? handleRemoveFromAdmin : handleMakeAdmin}
                            style={{
                                color: theme.colors.primary,
                                fontWeight: "bold",
                                fontSize: 17,
                            }}>
                            {member.is_admin ? "Remove Admin" : "Make Admin"}
                        </Text>
                        <Text
                            onPress={handleRemoveMember}
                            style={{
                                color: theme.colors.text,
                                fontWeight: "bold",
                                fontSize: 16,
                                marginRight: 32,
                            }}
                        >
                            Remove
                        </Text>
                    </View> :
                    <View style={{flex: 1, alignSelf: 'center'}}>
                        <FollowUnfollowButton user={member.user}/>
                    </View>)
                }
            </View>
        </View>
    );
};

export default MemberItem;

const styles = StyleSheet.create({
    profilePic: {
        height: 55,
        width: 55,
        borderRadius: 75,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        paddingHorizontal: 26,
        marginTop: 14,
        borderRadius: 5,
    },
});
